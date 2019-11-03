export const createInterface = (id: string, values: string[]) => {
  // TODO: Looks too ugly!. Separate formatting logic.

  if (values.length < 1) {
    return `interface ${id} {
  id: "${id}";
}`;
  }

  return `interface ${id} {
  id: "${id}";
  values: {
    ${values.map(value => `${value}: string;`).join("\n    ")}
  };
}`;
};

export const createMessageTokenUnion = (interfaceNames: string[]) => {
  // TODO: Add new line because this will be a very long line.
  return `type MessageTokenType = ${interfaceNames.join(" | ")};`;
};

export const createExportedTranslateFunction = () => {
  return "export const translate: (token: MessageTokenType) => string;";
};

export const wrapWithDeclare = (interfaces: string[], messageTokenUnion: string, translateFunction: string) => {
  // TODO: Format
  return `declare module 'wores' {
  ${interfaces.join("\n")}
  ${messageTokenUnion}
  ${translateFunction}
}`;
};
