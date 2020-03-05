#!/usr/bin/env node

import { exit, argv } from "process";
import program from "commander";

import { createDeclaration } from "./api";
import { toErrorString } from "./util";


const printError = (err: unknown) => {
  console.error(toErrorString(err));
};

program
  .version(require("../../package.json").version, "-v, --version")
  .arguments("<resourceDir> <outputPath>")
  .parse(argv);

const resourceDir = program.args[0];
const outputPath = program.args[1];

if (!resourceDir || !outputPath) {
  program.outputHelp();
  exit(1);
}

(async () => {
  try {
    await createDeclaration(resourceDir, outputPath);
  } catch (e) {
    printError(e);
    exit(1);
  }
})();
