import { compareMessageResourceContainers } from "./compare";
import { MessageResourceContainer } from "./messageResource";


describe("compareMessageResourceContainers", () => {
  it("returns if only one message.", () => {
    const messageResourceContainers: MessageResourceContainer[] = [
      {
        filename: "en.json",
        messageResource: { "key1": new Set() }
      }
    ];

    expect(
      () => compareMessageResourceContainers(messageResourceContainers),
    ).not.toThrow();
  });

  it("throws an error if interface names are different. (en.json has key1)", () => {
    const messageResourceContainers: MessageResourceContainer[] = [
      {
        filename: "en.json",
        messageResource: { "key1": new Set() }
      },
      {
        filename: "ja.json",
        messageResource: { "key2": new Set() }
      },
    ];

    expect(
      () => compareMessageResourceContainers(messageResourceContainers),
    ).toThrow(new Error('"en.json" has the key "key1" but "ja.json" does not.'));
  });

  it("throws an error if interface names are different. (ja.json has key2)", () => {
    const messageResourceContainers: MessageResourceContainer[] = [
      {
        filename: "en.json",
        messageResource: { "key1": new Set() }
      },
      {
        filename: "ja.json",
        messageResource: { "key1": new Set(), "key2": new Set() }
      },
    ];

    expect(
      () => compareMessageResourceContainers(messageResourceContainers),
    ).toThrow(new Error('"ja.json" has the key "key2" but "en.json" does not.'));
  });

  it("throws an error if variable names are different. (en.json has var1)", () => {
    const messageResourceContainers: MessageResourceContainer[] = [
      {
        filename: "en.json",
        messageResource: { "key1": new Set(["var1"]) }
      },
      {
        filename: "ja.json",
        messageResource: { "key1": new Set(["var2"]) }
      },
    ];

    expect(
      () => compareMessageResourceContainers(messageResourceContainers),
    ).toThrow(new Error('"en.json" has the value "var1" in "key1" but "ja.json" does not.'));
  });

  it("throws an error if variable names are different. (ja.json has var2)", () => {
    const messageResourceContainers: MessageResourceContainer[] = [
      {
        filename: "en.json",
        messageResource: { "key1": new Set(["var1"]) }
      },
      {
        filename: "ja.json",
        messageResource: { "key1": new Set(["var1", "var2"]) }
      },
    ];

    expect(
      () => compareMessageResourceContainers(messageResourceContainers),
    ).toThrow(new Error('"ja.json" has the value "var2" in "key1" but "en.json" does not.'));
  });

  it("returns if interface names are the same and variable names are the same.", () => {
    const messageResourceContainers: MessageResourceContainer[] = [
      {
        filename: "en.json",
        messageResource: {
          "key1": new Set(["var1", "var2"]),
          "key2": new Set(["var3", "var4"]),
        }
      },
      {
        filename: "ja.json",
        messageResource: {
          "key1": new Set(["var1", "var2"]),
          "key2": new Set(["var3", "var4"]),
        }
      },
    ];

    expect(
      () => compareMessageResourceContainers(messageResourceContainers),
    ).not.toThrow();
  });
});
