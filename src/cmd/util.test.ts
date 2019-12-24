import { isFlatStringObject } from "./util";

describe("isFlatStringObject", () => {


  it.each`
    description       | arg                           | expected
    ${"string"}       | ${"str"}                      | ${false}
    ${"number"}       | ${1}                          | ${false}
    ${"number value"} | ${{ key: 1 }}                 | ${false}
    ${"nested"}       | ${{ key: { subKey: "str" } }} | ${false}
    ${"string value"} | ${{ key: "str" }}             | ${true}
    ${"empty"}        | ${{}}                         | ${true}
  `("returns $expected. ($description)", ({ arg, expected }) => {
    const res = isFlatStringObject(arg);
    expect(res).toEqual(expected);
  });
});
