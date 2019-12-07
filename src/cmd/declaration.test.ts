import { joinAndBreak, createInterface } from "./declaration";

describe("joinAndBreak", () => {
  it("joins elements using separater.", () => {
    const res = joinAndBreak(["a", "b"], "-", 5, 0);
    expect(res).toEqual("a-b");
  });

  it.each`
    description              | arrayLen | breakNum | expected
    ${"length < breakNum"}   | ${3}     | ${4}     | ${"a-a-a"}
    ${"length === breakNum"} | ${4}     | ${4}     | ${"a-a-a-a"}
    ${"length > breakNum"}   | ${5}     | ${4}     | ${"a-a-a-a-\na"}
  `("breaks by breakNum. ($description)", ({ arrayLen, breakNum, expected }) => {
    const arr = Array.from("a".repeat(arrayLen));
    const res = joinAndBreak(arr, "-", breakNum, 0);

    expect(res).toEqual(expected);
  });

  it("indents by indentLevel.", () => {
    const res = joinAndBreak(["a", "b", "c", "d"], "-", 2, 2);

    expect(res).toEqual("    a-b-\n    c-d");
  });
});

describe("createInterface", () => {
  it("returns without values.", () => {
    const expected = "interface key1 {\n" +
                     "  id: \"key1\";\n" +
                     "}";

    const res = createInterface("key1", new Set());

    expect(res).toEqual(expected);
  });

  it("returns with values.", () => {
    const expected = "interface key1 {\n" +
                     "  id: \"key1\";\n" +
                     "  values: {\n" +
                     "    value1: string;\n" +
                     "    value2: string;\n" +
                     "  };\n" +
                     "}";

    const res = createInterface("key1", new Set(["value1", "value2"]));

    expect(res).toEqual(expected);
  });
});
