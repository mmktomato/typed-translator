import { parse, TYPE } from "intl-messageformat-parser";
import { readFile } from "fs";
import { exit } from "process";

readFile("example/en.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    exit(1);
  }

  const json = JSON.parse(data);
  const keys = Object.keys(json);

  keys.forEach(key => {
    const ast = parse(json[key]);
    const vars = ast
      .filter(node => node.type !== TYPE.literal)
      .map(node => node.value);
    console.log(`${key}: ${vars.join(",")}`);
  });
});

