# wores
Strictly typed i18n library for TypeScript.

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

NOTE: You have to save the json files at the same directory.
NOTE: All values of a dictionary has to be `string`. Not `object`, `number`, etc.
NOTE: Each keys and values of dictionaries have to be exactly same. For example, you can't add `key3` to only "en.json". And you can't use `screenName`in only "en.json".

Next, run `wores` command. The first augument is the directory you saved json files. The second augument is a filepath where the command saves `.d.ts` file.

```bash
$ npx wores './path/to/messages', './path/to/declaration.d.ts'
```

Then, load the json files and initialize `wores` in your TypeScript code.

```typescript
import { initTranslation } from "wores";

import en from "path/to/en.json";  // English message dictionary.
import ja from "path/to/ja.json";  // Japanese message dictionary.

initTranslation({ en, ja });  // Set messages.
```

Finally, set language and translate.

```typescript
import { setLocale, translate } from "wores";

// Set locale to English.
setLocale("en");

translate({ id: "key1" });  // should be "value without any variable.".
translate({ id: "key2", values: { accountName: "mmktomato" } });  // should be "My account is mmktomato.".

// Set locale to Japanese.
setLocale("ja");

translate({ id: "key1" });  // should be "変数なしの値".
translate({ id: "key2", values: { accountName: "mmktomato" } });  // should be "私のアカウントは {accountName} です。".
```

See [example](https://github.com/mmktomato/wores/tree/master/example) for more details.

### What does "Strictly typed" mean?

For above example, you can't pass `{ id: "key3" }` to `translate`. And You can't pass `{ id: "key2", values: { screenName: "mmktomato" } }` to `translate. TypeScript compiler should not allow them.

Try to modify [example](https://github.com/mmktomato/wores/tree/master/example) and see how it goes.

## License

MIT. See [LICENSE](https://github.com/mmktomato/wores/blob/master/LICENSE).
