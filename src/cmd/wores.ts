#!/usr/bin/env node

import { parse, TYPE } from "intl-messageformat-parser";
import { resolve, join } from "path";
import { exit, argv } from "process";
import { readdir } from "fs";

import {
  createInterface,
  createMessageTokenUnion,
  createExportedTranslateFunction,
  wrapWithDeclare,
} from "./declaration";
import { compareMessageResourceContainers } from "./compare";
import {
  FlatStringObject,
  MessageResource,
  MessageResourceContainer,
  isFlatStringObject,
  printError,
} from "./util";

if (argv.length !== 3) {
  // TODO: Print usage.
  printError("Directory must be specified.");
  exit(1);
}

const dir = argv[2];
readdir(dir, { encoding: "utf8" }, async (err, files) => {
  // TODO: Process only json file.
  //       Do not process sub directory's file.
  //         -> Consider to use `node-glob` package.

  if (err) {
    printError(err);
    exit(1);
  }

  const promises = files.map(async (file) => {
    const absPath = resolve(join(dir, file));  // TODO: I don't need `join`....
    const { default: jsonObj } = await import(absPath);

    if (!isFlatStringObject(jsonObj)) {
      throw new TypeError(`"${absPath}" must be flat and string-valued JSON.`);
    }

    const ret: MessageResourceContainer = {
      filename: absPath,
      messageResource: analyzeFlatStringObject(jsonObj),
    };
    return ret;
  });

  const messageResourceContainers = await Promise.all(promises).catch(err => {
    if (typeof(err) === "string" || err instanceof Error) {
      printError(err);
    }
    exit(1);
  });

  if (messageResourceContainers) {
    try {
      compareMessageResourceContainers(messageResourceContainers);
    } catch (e) {
      printError(e);
      exit(0);
    }

    messageResourceContainers.forEach(messageResourceContainer => {
      const messageResource = messageResourceContainer.messageResource;
      const interfaceNames = Object.keys(messageResource);
      const interfaces = interfaceNames.map(interfaceName => createInterface(interfaceName, messageResource[interfaceName]));

      const messageTokenUnion = createMessageTokenUnion(interfaceNames);
      const translateFunction = createExportedTranslateFunction();

      console.log(wrapWithDeclare(interfaces, messageTokenUnion, translateFunction));
    });
  }
});

// TODO: separate to another file and write unit test.
const analyzeFlatStringObject = (jsonObj: FlatStringObject) => {
  const interfaceNames = Object.keys(jsonObj);
  // TODO: Validate interfaceNames.

  const ret: MessageResource = {};

  interfaceNames.forEach(interfaceName => {
    const ast = parse(jsonObj[interfaceName]);
    const vars = ast
      .filter(node => node.type !== TYPE.literal)
      .map(node => node.value);

    ret[interfaceName] = new Set(vars);
  });

  return ret;
};

