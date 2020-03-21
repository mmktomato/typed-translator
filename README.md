# typed-translator

Strictly typed i18n library for TypeScript.

## What does "Strictly typed" mean?

You can detect inconsistencies of translation keys and variables at compile time.

And you can complete them when you are writing code.
![completion](https://raw.githubusercontent.com/mmktomato/typed-translator/master/images/completion.gif)

## Install

```bash
$ npm install --save typed-translator
```

## Usage

First, Prepare message dictionaries. (e.g. English and Japanese).

```json
// en.json
{
  "key1": "value without any variable.",
  "key2": "My account is {accountName}."
}
```
```json
// ja.json
{
  "key1": "変数なしの値",
  "key2": "私のアカウントは {accountName} です。"
}
```

NOTE:

* You have to save the json files at the same directory.
* All values of a dictionary has to be `string`. Not `object`, `number`, etc.
* Each keys and values of dictionaries have to be exactly same.
    * For example, you can't add `key3` to **only** "en.json". And you can't use `screenName`in **only** "en.json".

Next, run `typed-translator` command. The first augument is the directory you saved json files. The second augument is a filepath where the command saves `.d.ts` file.

```bash
$ npx typed-translator './path/to/messages', './path/to/declaration.d.ts'
```

Then, load the json files and initialize `typed-translator` in your TypeScript code.

```typescript
import { initTranslation } from "typed-translator";

// NOTE: If you import json files directly like this, you need to set `resolveJsonModule: true` in tsconfig.json.
import en from "path/to/en.json";  // English message dictionary.
import ja from "path/to/ja.json";  // Japanese message dictionary.

initTranslation({ en, ja });  // Set messages.
```

Finally, set language and translate.

```typescript
import { setLocale, translate } from "typed-translator";

// Set locale to English.
setLocale("en");

translate({ id: "key1" });  // should be "value without any variable.".
translate({ id: "key2", values: { accountName: "mmktomato" } });  // should be "My account is mmktomato.".

// Set locale to Japanese.
setLocale("ja");

translate({ id: "key1" });  // should be "変数なしの値".
translate({ id: "key2", values: { accountName: "mmktomato" } });  // should be "私のアカウントは {accountName} です。".
```

See [examples](https://github.com/mmktomato/typed-translator/tree/master/examples) for more details.

### Compile-time type checking

For above example, you can't pass the following augments to `translate`. TypeScript compiler should not allow them.

* `{ id: "key3" }`
    * `key3` doesn't exist in message dictionaries.
* `{ id: "key2", values: { screenName: "mmktomato" } }`
    * `key2` doesn't have `screenName` variable.

Try to modify [examples](https://github.com/mmktomato/typed-translator/tree/master/examples) and see how it goes.

## webpack

You don't have to run `typed-translator` command manually if you use webpack.

```javascript
// webpack.config.js

// NOTE: The module path will be changed in future release.
const TypedTranslatorWebpackPlugin = require("typed-translator/dist/webpack-plugin");

module.exports = {
  // ...
  plugins: [
    new TypedTranslatorWebpackPlugin({
      // directory path you saved json files.
      resourceDir: "./resources",

      // filepath where the command saves `.d.ts` file.
      outputPath: "./types/typed-translator.d.ts",
    })
  ],
  // ...
};
```

If you use watch mode (`webpack --watch`), the plugin tries to create new `.d.ts` file every time you change a file. If you don't use watch mode (`webpack`), the plugin runs once.

## Object instead of JSON (Experimental)

You can use TypeScript object instead of JSON for message dictionary.
**Note this feature is experimental.**

```typescript
// en.ts
const en = {
  key1: "value without any variable.",
  key2: "My account is {accountName}."
};
export default en;
```
```typescript
// ja.ts
const ja = {
  key1: "変数なしの値",
  key2: "私のアカウントは {accountName} です。"
};
export default ja;
```

Next, run `typed-translator` command with `-t ts`.

```bash
$ npx typed-translator './path/to/messages', './path/to/declaration.d.ts' -t ts
```

Or pass `type: "ts"` property if you use the webpack plugin.

```javascript
  plugins: [
    new TypedTranslatorWebpackPlugin({
      // directory path you saved json files.
      resourceDir: "./resources",

      // filepath where the command saves `.d.ts` file.
      outputPath: "./types/typed-translator.d.ts",

      // type (json|ts)
      type: "ts",
    })
  ],
```

Then, load the module in your code.

```typescript
import { initTranslation } from "typed-translator";

// NOTE: You don't need `resolveJsonModule: true` in tsconfig.json.
import en from "path/to/en";
import ja from "path/to/ja";

initTranslation({ en, ja });
```

The rest is same as for JSON.

## License

MIT. See [LICENSE](https://github.com/mmktomato/typed-translator/blob/master/LICENSE).
