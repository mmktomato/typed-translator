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

export const toErrorString = (err: unknown): string => {
  if (typeof(err) === "string" ) {
    return err;
  } else if (err instanceof Error) {
    return `${err.name} ${err.message}`;
  } else {
    const _err = new Error((err as any).toString());
    return `${_err.name} ${_err.message}`;
  }
};
