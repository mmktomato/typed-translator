import { Compiler, Plugin } from "webpack";
import { resolve } from "path";

import { createDeclaration } from "../cmd/api";
import { toErrorString } from "../cmd/util";
import { FileType } from "../cmd/fileStrategy";


export interface Options {
  resourceDir: string;
  outputPath: string;
  type?: FileType;
}

class TypedTranslatorWebpackPlugin implements Plugin {
  constructor(private options: Options) { }

  apply(compiler: Compiler) {
    compiler.hooks.make.tapPromise("TypedTranslatorWebpackPlugin", (compilation) => {
      const { resourceDir, outputPath, type } = this.options;

      return createDeclaration(resourceDir, outputPath, type)
        .catch((err) => {
          compilation.errors.push(toErrorString(err));
        });
    });

    compiler.hooks.emit.tapAsync("TypedTranslatorWebpackPlugin", (compilation, callback) => {
      const outputAbsPath = resolve(this.options.outputPath);
      compilation.fileDependencies.delete(outputAbsPath);

      callback();
    });
  }
}

module.exports = TypedTranslatorWebpackPlugin;
