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
import { isFlatStringObject, printError } from "./util";

if (argv.length !== 3) {
  // TODO: Print usage.
  console.log("Directory must be specified.");
  exit(1);
}

const dir = argv[2];
readdir(dir, { encoding: "utf8" }, (err, files) => {
  // TODO: Process only json file.
  //       Do not process sub directory's file.
  //         -> Consider to use `node-glob` package.

  if (err) {
    printError(err);
    exit(1);
  }

  files.forEach(file => {
    const absPath = resolve(join(dir, file));

    import(absPath)
      .then(({ default: obj }) => {
        if (!isFlatStringObject(obj)) {
          throw new TypeError(`"${absPath}" must be flat and string-valued JSON.`);
        }

        const interfaceNames = Object.keys(obj);
        // TODO: Validate interfaceNames.

        const interfaces = interfaceNames.map(interfaceName => {
          const ast = parse(obj[interfaceName]);
          const vars = ast
            .filter(node => node.type !== TYPE.literal)
            .map(node => node.value);

          return createInterface(interfaceName, vars);
        });

        const messageTokenUnion = createMessageTokenUnion(interfaceNames);
        const translateFunction = createExportedTranslateFunction();

        console.log(wrapWithDeclare(interfaces, messageTokenUnion, translateFunction));
      })
      .catch(err => {
        if (err instanceof Error) {
          printError(err);
        }
        exit(1);
      });
  });
});
