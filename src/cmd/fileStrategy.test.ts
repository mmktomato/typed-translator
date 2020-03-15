import * as path from "path";
import { promises as fsPromises } from "fs";
import * as os from "os";
jest.mock("os");

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
  it("returns a json object.", async () => {
    const jsonContent = await readTestFile("en1.json");

    const res = await jsonContentToObject(jsonContent);

    expect(res).toEqual({ key1: "value1" });
  });

  it("throws an error if the file is incorrect.", async () => {
    const jsonContent = await readTestFile("en1.error.json");

    expect(() => jsonContentToObject(jsonContent)).toThrowError();
  });
});

describe("createTempFilePath", () => {
  let mathRandomSpy: jest.SpyInstance | null = null;

  beforeAll(() => {
    (os.tmpdir as jest.Mock).mockImplementation(() => "./mocktmp");
    mathRandomSpy = jest.spyOn(Math, "random").mockImplementation(() => 0.1);
  });

  afterAll(() => {
    (os.tmpdir as jest.Mock).mockRestore();
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
