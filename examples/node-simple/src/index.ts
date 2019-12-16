import { initTranslation, setLocale, translate } from "typed-translator";

import en from "../resources/en.json";
import ja from "../resources/ja.json";

// Set messages.
const dictonaries = { en, ja };
initTranslation(dictonaries);

// Set locale to en.
setLocale("en");

// Translate (en).
console.log(translate({ id: "key1" }));
console.log(translate({ id: "key2", values: { name: "Alice" } }));
console.log(translate({ id: "key3", values: { name: "Bob", age: "20" } }));
console.log(translate({ id: "key4", values: { age: "25" } }));
console.log(translate({ id: "key5" }));
console.log(translate({ id: "key6" }));

// Set locale to ja.
setLocale("ja");

// Translate (ja).
console.log(translate({ id: "key1" }));
console.log(translate({ id: "key2", values: { name: "Alice" } }));
console.log(translate({ id: "key3", values: { name: "Bob", age: "20" } }));
console.log(translate({ id: "key4", values: { age: "25" } }));
console.log(translate({ id: "key5" }));
console.log(translate({ id: "key6" }));

// The following line isn't allowed by TypeScript compiler.
// Because "key0" doesn't exist.
// console.log(translate({ id: "key0" }));

// The following line isn't allowed by TypeScript compiler.
// Because "key1" doesn't have any variables.
// console.log(translate({ id: "key1", values: { test: "test" } }));

// The following line isn't allowed by TypeScript compiler.
// Because "key2" doesn't have the variable named "myName".
// console.log(translate({ id: "key2", values: { myName: "Alice" } }));
