import * as path from "path";
import { promises as fsPromises } from "fs";

jest.mock("os");
import * as os from "os";
(os.tmpdir as jest.Mock).mockImplementation(() => "./mocktmp");

import {
  createFileStrategy,
  jsonContentToObject,
  tsContentToObject,
  createTempFilePath,
} from "./fileStrategy";


const readTestFile = async (filename: string) => {
  const absPath = path.resolve(__dirname, "../../testdata", filename);
  const content = await fsPromises.readFile(absPath, { encoding: "utf-8" });

  return content;
};

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

describe("jsonContentToObject", () => {
  it("returns an object.", async () => {
    const jsonContent = await readTestFile("en1.json");

    const res = await jsonContentToObject(jsonContent);

    expect(res).toEqual({ key1: "value1" });
  });

  it("throws an error if the file is incorrect.", async () => {
    const jsonContent = await readTestFile("en1.error.json");

    await expect(jsonContentToObject(jsonContent)).rejects.toThrowError();
  });
});

describe("tsContentToObject", () => {
  it("returns an object.", async () => {
    const tsContent = await readTestFile("en1.ts");

    const res = await tsContentToObject(tsContent);

    expect(res).toEqual({ key1: "value1" });
  });

  it("returns undefined if named export.", async () => {
    const tsContent = await readTestFile("en1.named-export.ts");

    const res = await tsContentToObject(tsContent);

    expect(res).toBeUndefined();
  });

  it("throws an error if the file is incorrect.", async () => {
    const tsContent = await readTestFile("en1.error.ts");

    await expect(tsContentToObject(tsContent)).rejects.toThrowError();
  });
});

describe("createTempFilePath", () => {
  let mathRandomSpy: jest.SpyInstance | null = null;

  beforeAll(() => {
    mathRandomSpy = jest.spyOn(Math, "random").mockImplementation(() => 0.1);
  });

  afterAll(() => {
    (Math.random as jest.Mock).mockRestore();
  });

  afterEach(() => {
    // mathRandomSpy!.mockReset();
    mathRandomSpy!.mockClear();
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
    expect(mathRandomSpy!.mock.results.length).toEqual(2);
    expect(mathRandomSpy!.mock.results[0].value).toEqual(0.5);
    expect(mathRandomSpy!.mock.results[1].value).toEqual(0.1);
  });
});
