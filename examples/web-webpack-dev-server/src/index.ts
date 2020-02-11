import { initTranslation, setLocale, translate } from "typed-translator";

// NOTE: If you import json files directly like this, you need to set `resolveJsonModule: true` in tsconfig.json.
import en from "../resources/en.json";
import ja from "../resources/ja.json";

// Set messages.
const dictonaries = { en, ja };
initTranslation(dictonaries);

document.addEventListener("DOMContentLoaded", () => {
  const radios: NodeListOf<HTMLInputElement> = document.querySelectorAll("input[name='lang']");

  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      onLocaleChange(radio.value);
    });
  });
});

const onLocaleChange = (locale: string) => {
  // Set locale
  setLocale(locale);
  document.querySelector("#key1")!.innerHTML = translate({ id: "key1" });
  document.querySelector("#key2")!.innerHTML = translate({ id: "key2", values: { name: "Alice" } });
  document.querySelector("#key3")!.innerHTML = translate({ id: "key3", values: { name: "Bob", age: "20" } });
  document.querySelector("#key4")!.innerHTML = translate({ id: "key4", values: { age: "25" } });
  document.querySelector("#key5")!.innerHTML = translate({ id: "key5" });
  document.querySelector("#key6")!.innerHTML = translate({ id: "key6" });

  // The following line isn't allowed by TypeScript compiler.
  // Because "key0" doesn't exist.
  // translate({ id: "key0" });

  // The following line isn't allowed by TypeScript compiler.
  // Because "key1" doesn't have any variables.
  // translate({ id: "key1", values: { test: "test" } });

  // The following line isn't allowed by TypeScript compiler.
  // Because "key2" doesn't have the variable named "myName".
  // translate({ id: "key2", values: { myName: "Alice" } });
};
