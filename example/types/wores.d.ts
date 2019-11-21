declare module 'wores' {
  interface key1 {
  id: "key1";
}
interface key2 {
  id: "key2";
  values: {
    name: string;
  };
}
interface key3 {
  id: "key3";
  values: {
    name: string;
    age: string;
  };
}
interface key4 {
  id: "key4";
  values: {
    age: string;
  };
}

  type MessageTokenType = key1 | key2 | key3 | key4;
  type DictionaryKeys = "key1" | "key2" | "key3" | "key4";
  type Dictionary = { [key in DictionaryKeys]: string };
  type Dictionaries = { [locale: string]: Dictionary };

  export const initTranslation: (dictonary: Dictionaries) => void;
  export const setLocale: (locale: string) => void;
  export const translate: (token: MessageTokenType) => string;
}