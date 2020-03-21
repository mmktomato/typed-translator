import { statSync, promises } from "fs";
const { readdir, readFile, writeFile } = promises;
import { resolve, extname } from "path";

import { compareMessageResourceContainers } from "./compare";
import { isFlatStringObject } from "./util";
import { MessageResourceContainer, createMessageResource } from "./messageResource";
import {
  createInterface,
  createMessageTokenUnion,
  createDictyonaryKeysUnion,
  createTranslateFunction,
  wrapup,
} from "./declaration";
import { createFileStrategy, FileType } from "./fileStrategy";


export const createDeclaration = async (resourceDir: string, outputPath: string, type: FileType = "json") => {
  const fileStrategy = createFileStrategy(type);
  const files = await readdir(resourceDir, { encoding: "utf8" });

  const jsonFiles = files
    .map(file => resolve(resourceDir, file))
    .filter(absPath => {
      return statSync(absPath).isFile && extname(absPath) === fileStrategy.extension;
    });

  const promises = jsonFiles.map(async (absPath) => {
    const data = await readFile(absPath, { encoding: "utf8" });
    const obj = await fileStrategy.contentToObject(data);

    if (!isFlatStringObject(obj)) {
      throw new TypeError(`"${absPath}" must be flat and string-valued JSON.`);
    }

    const ret: MessageResourceContainer = {
      filename: absPath,
      messageResource: createMessageResource(obj),
    };
    return ret;
  });

  const messageResourceContainers = await Promise.all(promises);

  compareMessageResourceContainers(messageResourceContainers);

  const messageResource = messageResourceContainers[0].messageResource;
  const interfaceNames = Object.keys(messageResource);
  const interfaces = interfaceNames.map(interfaceName => createInterface(interfaceName, messageResource[interfaceName]));

  const messageTokenUnion = createMessageTokenUnion(interfaceNames);
  const dictionaryKeysUnion = createDictyonaryKeysUnion(interfaceNames);
  const translateFunction = createTranslateFunction();

  const declaration = wrapup(interfaces, messageTokenUnion, dictionaryKeysUnion, translateFunction);

  await writeFile(outputPath, declaration, { encoding: "utf8" });
};
