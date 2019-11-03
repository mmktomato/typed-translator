#!/usr/bin/env node

import { parse, TYPE } from "intl-messageformat-parser";
import { resolve } from "path";
import { exit, argv } from "process";

import {
  createInterface,
  createMessageTokenUnion,
  createExportedTranslateFunction,
  wrapWithDeclare,
} from "./declaration";
import { isFlatStringObject } from "./util";

// TODO: Fix this.
const path = argv.length < 3 ? "example/en.json" : argv[2];
const absPath = resolve(path);

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
      console.error(err.name, err.message);
    }
    exit(1);
  });
