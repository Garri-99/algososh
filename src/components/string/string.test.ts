import { getSteps } from "./utils";

describe("reverses the string correctly", () => {
  it("with an even number of symbols", () => {
    const arr = getSteps("1234");
    expect(arr[arr.length - 1].map((i) => i.value).join("")).toBe("4321");
  });
  it("with an odd number of symbols", () => {
    const arr = getSteps("123");
    expect(arr[arr.length - 1].map((i) => i.value).join("")).toBe("321");
  });
  it("with one symbol", () => {
    const arr = getSteps("1");
    expect(arr[arr.length - 1].map((i) => i.value).join("")).toBe("1");
  });
  it("with empty string", () => {
    const arr = getSteps("");
    expect(arr[arr.length - 1].map((i) => i.value).join("")).toBe("");
  });
});
