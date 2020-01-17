import { readdirSync, readFile, writeFileSync, statSync } from "fs";
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

export const createDeclaration = async (resourceDir: string, outputPath: string) => {
  const files = readdirSync(resourceDir, { encoding: "utf8" });

  const jsonFiles = files
    .map(file => resolve(resourceDir, file))
    .filter(absPath => {
      return statSync(absPath).isFile && extname(absPath) === ".json";
    });

  const promises = jsonFiles.map((absPath) => {
    return new Promise<MessageResourceContainer>((resolve, reject) => {
      readFile(absPath, { encoding: "utf8" }, (err, data) => {
        if (err) {
          reject(err);
          return;
        };

        try {
          const jsonObj = JSON.parse(data);

          if (!isFlatStringObject(jsonObj)) {
            reject(new TypeError(`"${absPath}" must be flat and string-valued JSON.`));
            return;
          }

          const ret: MessageResourceContainer = {
            filename: absPath,
            messageResource: createMessageResource(jsonObj),
          };
          resolve(ret);
        } catch (e) {
          reject(e)
          return;
        };
      });
    });
  });

  const messageResourceContainers = await Promise.all(promises).catch(err => {
    throw err;
  });

  compareMessageResourceContainers(messageResourceContainers);

  const messageResource = messageResourceContainers[0].messageResource;
  const interfaceNames = Object.keys(messageResource);
  const interfaces = interfaceNames.map(interfaceName => createInterface(interfaceName, messageResource[interfaceName]));

  const messageTokenUnion = createMessageTokenUnion(interfaceNames);
  const dictionaryKeysUnion = createDictyonaryKeysUnion(interfaceNames);
  const translateFunction = createTranslateFunction();

  const declaration = wrapup(interfaces, messageTokenUnion, dictionaryKeysUnion, translateFunction);

  writeFileSync(outputPath, declaration, { encoding: "utf8" });
};
