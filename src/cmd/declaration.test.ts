import { joinAndBreak } from "./declaration";

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
