import { parse, TYPE } from "intl-messageformat-parser";
import { FlatStringObject } from "./util";


interface MessageResource {
  [interfaceName: string]: Set<string>
};

export interface MessageResourceContainer {
  filename: string;
  messageResource: MessageResource;
};

export const createMessageResource = (jsonObj: FlatStringObject) => {
  const interfaceNames = Object.keys(jsonObj);

  const ret: MessageResource = {};

  interfaceNames.forEach(interfaceName => {
    if (!validateIdentifier(interfaceName)) {
      throw new Error(`"${interfaceName}" is not valid as identifier.`);
    }

    const ast = parse(jsonObj[interfaceName]);
    const vars = ast
      .filter(node => node.type !== TYPE.literal)
      .map(node => node.value);

    ret[interfaceName] = new Set(vars);
  });

  return ret;
};

export const validateIdentifier = (name: string) =>
  /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name);