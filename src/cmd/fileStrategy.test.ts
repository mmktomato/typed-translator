import * as path from "path";
import * as os from "os";
jest.mock("os");

import {
  createFileStrategy,
  jsonContentToObject,
  tsContentToObject,
  createTempFilePath,
} from "./fileStrategy";


describe("createFileStrategy", () => {
  it.each`
    description  | fileType     | extension  | contentToObject
    ${"json"}    | ${"json"}    | ${".json"} | ${jsonContentToObject}
    ${"ts"}      | ${"ts"}      | ${".ts"}   | ${tsContentToObject}
    ${"unknown"} | ${"unknown"} | ${".json"} | ${jsonContentToObject}
  `("returns a FileStrategy. ($description)", ({ fileType, extension, contentToObject }) => {
    const res = createFileStrategy(fileType);

    expect(res).toEqual({
      extension, contentToObject
    });
  });
});

describe("createTempFilePath", () => {
  beforeAll(() => {
    (os.tmpdir as jest.Mock).mockImplementation(() => "./mocktmp");
    jest.spyOn(Math, "random").mockImplementation(() => 0.1);
  });

  afterAll(() => {
    (os.tmpdir as jest.Mock).mockRestore();
    (Math.random as jest.Mock).mockRestore();
  });

  it("returns a none-existing file path.", async () => {
    const res = await createTempFilePath();
    const expected = path.resolve("./mocktmp/100000");

    expect(res).toEqual(expected);
  });

  it("returns a none-existing file path if another file exists.", async () => {
    (Math.random as jest.Mock).mockReturnValueOnce(0.5);

    const res = await createTempFilePath();
    const expected = path.resolve("./mocktmp/100000");

    expect(res).toEqual(expected);
  });
});
