export interface FlatStringObject {
  [key: string]: string;
}

const isObject = (obj: unknown): obj is {} => Object.prototype.toString.call(obj) === "[object Object]";

export const isFlatStringObject = (obj: unknown): obj is FlatStringObject => {
  if (!isObject(obj)) {
    return false;
  }

  const entries = Object.entries(obj);
  return entries.every(([_, value]) => typeof(value) === "string");
};

export const toError = (err: unknown): Error => {
  return err instanceof Error
    ? err
    : new Error((err as any).toString());
};
