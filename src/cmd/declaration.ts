export const createInterface = (id: string, values: Set<string>) => {
  // TODO: Looks too ugly!. Separate formatting logic.

  if (values.size < 1) {
    return `interface ${id} {
  id: "${id}";
}`;
  }

  return `interface ${id} {
  id: "${id}";
  values: {
    ${Array.from(values).map(value => `${value}: string;`).join("\n    ")}
  };
}`;
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

export const wrapWithDeclare = (
  interfaces: string[],
  messageTokenUnion: string,
  dictionaryKeysUnion: string,
  translateFunction: string,
) => {
  // TODO: Format
  return `declare module 'wores' {
  ${interfaces.join("\n")}

  ${messageTokenUnion}
  ${dictionaryKeysUnion}
  type Dictionary = { [key in DictionaryKeys]: string };
  type Dictionaries = { [locale: string]: Dictionary };

  export const initTranslation: (dictonary: Dictionaries) => void;
  export const setLocale: (locale: string) => void;
  export ${translateFunction}
}`;
};
