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
interface key5 {
  id: "key5";
}
interface key6 {
  id: "key6";
}

type MessageTokenType = 
  key1 | key2 | key3 | key4 | key5 | 
  key6;
type DictionaryKeys = 
  "key1" | "key2" | "key3" | "key4" | "key5" | 
  "key6";
type Dictionary = { [key in DictionaryKeys]: string };
type Dictionaries = { [locale: string]: Dictionary };

declare module 'wores' {
  export const initTranslation: (dictonary: Dictionaries) => void;
  export const setLocale: (locale: string) => void;
  export const translate: (token: MessageTokenType) => string;
}