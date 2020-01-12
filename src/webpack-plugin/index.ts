import { Compiler, Plugin } from "webpack";

import { createDeclaration } from "../cmd/api";
import { toErrorString } from "../cmd/util";


export interface Options {
  resourceDir: string;
  outputPath: string;
}

class TypedTranslatorWebpackPlugin implements Plugin {
  constructor(private options: Options) { }

  apply(compiler: Compiler) {
    compiler.hooks.make.tapPromise("TypedTranslatorWebpackPlugin", (compilation) => {
      const { resourceDir, outputPath } = this.options;

      return createDeclaration(resourceDir, outputPath)
        .catch((err) => {
          compilation.errors.push(toErrorString(err));
        });
    });
  }
}

module.exports = TypedTranslatorWebpackPlugin;
