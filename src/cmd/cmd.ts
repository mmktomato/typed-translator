#!/usr/bin/env node

import { exit, argv } from "process";

import { createDeclaration } from "./api";
import { toError } from "./util";

const printError = (err: unknown) => {
  if (typeof(err) === "string" ) {
    console.error(err);
  } else {
    const _err = toError(err);
    console.error(_err.name, _err.message);
  }
};

const printVersion = () => {
  const version = require("../../package.json").version;
  console.log(version);
};

if (argv.includes("-v") || argv.includes("--version")) {
  printVersion();
  exit(0);
}

if (argv.length !== 4) {
  // TODO: Print usage.
  printError("Resource directory and output file must be specified.");
  exit(1);
}

const resourceDir = argv[2];
const outputPath = argv[3];

(async () => {
  try {
    await createDeclaration(resourceDir, outputPath);
  } catch (e) {
    printError(e);
    exit(1);
  }
})();
