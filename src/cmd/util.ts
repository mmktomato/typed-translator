export interface FlatStringObject {
  [key: string]: string;
}

const isObject = (obj: unknown): obj is {} => Object.prototype.toString.call(obj) === "[object Object]";

// TODO: unit test
export const isFlatStringObject = (obj: unknown): obj is FlatStringObject => {
  if (!isObject(obj)) {
    return false;
  }

  const entries = Object.entries(obj);
  return entries.every(([_, value]) => typeof(value) === "string");
};

export const printError = (err: Error | string) => {
  if (typeof(err) === "string" ) {
    console.error(err);
  } else {
    console.error(err.name, err.message);
  }
};

export interface MessageResource {
  [interfaceName: string]: Set<string>
};

export interface MessageResourceContainer {
  filename: string;
  messageResource: MessageResource;
};
