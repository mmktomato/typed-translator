const indent = "  ";

export const joinAndBreak = (arr: string[], separater: string, breakNum: number, indentLevel: number): string => {
  return arr.reduce((acc, cur, idx) => {
    if (idx % breakNum === 0) {
      acc += indent.repeat(indentLevel);
    }

    acc += cur;

    if (idx === arr.length - 1) {
      return acc;
    } else {
      acc += separater;
    }

    if (idx % breakNum === breakNum - 1) {
      acc += "\n";
    }

    return acc;
  }, "");
};

export const createInterface = (id: string, values: Set<string>) => {
  if (values.size < 1) {
    return `interface ${id} {\n` +
           `  id: "${id}";\n` +
           `}`;
  }

  return `interface ${id} {\n` +
         `  id: "${id}";\n` +
         `  values: {\n` +
         `    ${Array.from(values).map(value => `${value}: string;`).join(`\n${indent.repeat(2)}`)}\n` +
         `  };\n` +
         `}`;
};

export const createMessageTokenUnion = (interfaceNames: string[]) => {
  return `type MessageTokenType =\n${joinAndBreak(interfaceNames, " | ", 5, 1)};`;
};

export const createDictyonaryKeysUnion = (interfaceNames: string[]) => {
  const quotedInterfaceNames = interfaceNames.map(interfaceName => `"${interfaceName}"`);

  return `type DictionaryKeys =\n${joinAndBreak(quotedInterfaceNames, " | ", 5, 1)};`;
};

export const createTranslateFunction = () => {
  return "const translate: (token: MessageTokenType) => string;";
};

export const wrapup = (
  interfaces: string[],
  messageTokenUnion: string,
  dictionaryKeysUnion: string,
  translateFunction: string,
) => {
  return `${interfaces.join("\n")}\n` +
         `\n` +
         `${messageTokenUnion}\n` +
         `${dictionaryKeysUnion}\n` +
         `type Dictionary = { [key in DictionaryKeys]: string };\n` +
         `type Dictionaries = { [locale: string]: Dictionary };\n` +
         `\n`+
         `declare module 'typed-translator' {\n` +
         `  export const initTranslation: (dictonary: Dictionaries) => void;\n` +
         `  export const setLocale: (locale: string) => void;\n` +
         `  export ${translateFunction}\n` +
         `}`;
};
