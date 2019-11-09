
const isObject = (obj: unknown): obj is {} => Object.prototype.toString.call(obj) === "[object Object]";

export const isFlatStringObject = (obj: unknown): obj is { [key: string]: string } => {
  if (!isObject(obj)) {
    return false;
  }

  const entries = Object.entries(obj);
  return entries.every(([_, value]) => typeof(value) === "string");
};

export const printError = (err: Error) => {
  console.error(err.name, err.message);
};
