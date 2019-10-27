#!/usr/bin/env node

import { parse, TYPE } from "intl-messageformat-parser";
import { resolve } from "path";
import { exit, argv } from "process";

import { createInterface } from "./declaration";
import { isFlatStringObject } from "./util";

const path = argv.length < 3 ? "example/en.json" : argv[2];
const absPath = resolve(path);

import(absPath)
  .then(({ default: obj }) => {
    if (!isFlatStringObject(obj)) {
      throw new TypeError(`"${absPath}" must be flat and string-valued JSON.`);
    }

    const entries = Object.entries(obj);

    entries.forEach(([key, value]) => {
      const ast = parse(value);
      const vars = ast
        .filter(node => node.type !== TYPE.literal)
        .map(node => node.value);

      const interfaceText = createInterface(key, vars);
      console.log(interfaceText);
    });
  })
  .catch(err => {
    if (err instanceof Error) {
      console.error(err.name, err.message);
    }
    exit(1);
  });
