export const createInterface = (id: string, values: string[]) => {
  if (values.length < 1) {
    return `interface ${id} {
  id: ${id};
}`;
  }

  return `interface ${id} {
  id: ${id};
  values: {
    ${values.map(value => `${value}: string;`).join("\n    ")}
  };
}`;
};
