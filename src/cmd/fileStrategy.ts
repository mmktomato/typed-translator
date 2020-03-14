import * as TS from "typescript";
import { tmpdir } from "os";
import { resolve } from "path";
import { promises } from "fs";
const { writeFile, unlink, stat } = promises;


export type FileType = "json" | "ts";

interface FileStrategy {
  extension: string;
  contentToObject: (content: string) => Promise<unknown>;
};

export const createFileStrategy = (type: FileType): FileStrategy => {
  switch (type) {
    case "ts":
      return {
        extension: ".ts",
        contentToObject: tsContentToObject,
      };

    default:
      return {
        extension: ".json",
        contentToObject: jsonContentToObject,
      }
  }
};

// TODO: unit test
export const jsonContentToObject = (content: string) => Promise.resolve(JSON.parse(content));

// TODO: unit test
export const tsContentToObject = async (content: string) => {
  const tsOutput = TS.transpileModule(content, {
    compilerOptions: {
      module: TS.ModuleKind.CommonJS,
    }
  });

  const tempFilePath = await createTempFilePath();
  await writeFile(tempFilePath, tsOutput.outputText, { encoding: "utf-8" });

  const tsObj = require(tempFilePath);
  delete require.cache[tempFilePath];
  await unlink(tempFilePath);

  return tsObj.default;
};

export const createTempFilePath = async (): Promise<string> => {
  const ret = resolve(tmpdir(), `${Math.floor(Math.random()*1000000)}`);

  try {
    await stat(ret);
  } catch (e) {
    if (e.code === "ENOENT") {
      return ret;
    }
    throw new Error(`Failed to create temp file path: ${e.message}`);
  }

  return await createTempFilePath();
};
