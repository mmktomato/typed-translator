import { initTranslation, setLocale, translate } from "wores";

import en from "../resources/en.json";
import ja from "../resources/ja.json";

// Set messages.
const dictonaries = { en, ja };
initTranslation(dictonaries);

// Set locale to en.
setLocale("en");

// Translate (en).
const val1en = translate({ id: "key1" });
const val2en = translate({ id: "key2", values: { name: "Alice" } });
const val3en = translate({ id: "key3", values: { name: "Bob", age: "20" } });
const val4en = translate({ id: "key4", values: { age: "25" } });

// Set locale to ja.
setLocale("ja");

// Translate (ja).
const val1ja = translate({ id: "key1" });
const val2ja = translate({ id: "key2", values: { name: "Alice" } });
const val3ja = translate({ id: "key3", values: { name: "Bob", age: "20" } });
const val4ja = translate({ id: "key4", values: { age: "25" } });

console.log(val1en);
console.log(val2en);
console.log(val3en);
console.log(val4en);
console.log();
console.log(val1ja);
console.log(val2ja);
console.log(val3ja);
console.log(val4ja);
