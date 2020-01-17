import { createMessageResource, validateIdentifier } from "./messageResource";


describe("createMessageResource", () => {
  it.each`
    description          | arg                                | expected
    ${"no vars"}         | ${{ one: "test1", two: "test2" }}  | ${{ one: new Set(), two: new Set() }}
    ${"2 vars"}          | ${{ one: "test{var1}test{var2}" }} | ${{ one: new Set(["var1", "var2"]) }}
    ${"duplicated vars"} | ${{ one: "{var1}test{var1}" }}     | ${{ one: new Set(["var1"]) }}
    ${"empty obejct"}    | ${{}}                              | ${{}}
  `("returns a message resource. ($description)", ({ arg, expected }) => {
    const res = createMessageResource(arg);
    expect(res).toEqual(expected);
  });
});

describe("validateIdentifier", () => {
  it.each`
    name         | expected
    ${"test1_$"} | ${true}
    ${"t"}       | ${true}
    ${"_"}       | ${true}
    ${"1"}       | ${false}
    ${"1test"}   | ${false}
    ${"test!"}   | ${false}
    ${"!"}       | ${false}
    ${""}        | ${false}
  `("returns $expected if \"$name\".", ({ name, expected }) => {
    const res = validateIdentifier(name);

    expect(res).toEqual(expected);
  });
});
