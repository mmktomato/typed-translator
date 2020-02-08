import { initTranslation, setLocale, translate } from "typed-translator";

// NOTE: If you import json files directly like this, you need to set `resolveJsonModule: true` in tsconfig.json.
import en from "../resources/en.json";
import ja from "../resources/ja.json";

// Set messages.
const dictonaries = { en, ja };
initTranslation(dictonaries);

// Set locale to en.
setLocale("en");
const key1en = translate({ id: "key1" });
const key2en = translate({ id: "key2", values: { name: "Alice" } });
const key3en = translate({ id: "key3", values: { name: "Bob", age: "20" } });
const key4en = translate({ id: "key4", values: { age: "25" } });
const key5en = translate({ id: "key5" });
const key6en = translate({ id: "key6" });

// Set locale to ja.
setLocale("ja");
const key1ja = translate({ id: "key1" });
const key2ja = translate({ id: "key2", values: { name: "Alice" } });
const key3ja = translate({ id: "key3", values: { name: "Bob", age: "20" } });
const key4ja = translate({ id: "key4", values: { age: "25" } });
const key5ja = translate({ id: "key5" });
const key6ja = translate({ id: "key6" });

console.log(key1en, "/", key1ja);
console.log(key2en, "/", key2ja);
console.log(key3en, "/", key3ja);
console.log(key4en, "/", key4ja);
console.log(key5en, "/", key5ja);
console.log(key6en, "/", key6ja);

// The following line isn't allowed by TypeScript compiler.
// Because "key0" doesn't exist.
// translate({ id: "key0" });

// The following line isn't allowed by TypeScript compiler.
// Because "key1" doesn't have any variables.
// translate({ id: "key1", values: { test: "test" } });

// The following line isn't allowed by TypeScript compiler.
// Because "key2" doesn't have the variable named "myName".
// translate({ id: "key2", values: { myName: "Alice" } });
