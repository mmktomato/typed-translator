export const createInterface = (id: string, values: Set<string>) => {
  if (values.size < 1) {
    return `interface ${id} {\n` +
           `  id: "${id}";\n` +
           `}`;
  }

  return `interface ${id} {\n` +
         `  id: "${id}";\n` +
         `  values: {\n` +
         `    ${Array.from(values).map(value => `${value}: string;`).join("\n    ")}\n` +
         `  };\n` +
         `}`;
};

export const createMessageTokenUnion = (interfaceNames: string[]) => {
  // TODO: Add new line because this will be a very long line.
  return `type MessageTokenType = ${interfaceNames.join(" | ")};`;
};

export const createDictyonaryKeysUnion = (interfaceNames: string[]) => {
  const quotedInterfaceNames = interfaceNames.map(interfaceName => `"${interfaceName}"`);

  // TODO: Add new line because this will be a very long line.
  return `type DictionaryKeys = ${quotedInterfaceNames.join(" | ")};`;
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
         `declare module 'wores' {\n` +
         `  export const initTranslation: (dictonary: Dictionaries) => void;\n` +
         `  export const setLocale: (locale: string) => void;\n` +
         `  export ${translateFunction}\n` +
         `}`;
};
