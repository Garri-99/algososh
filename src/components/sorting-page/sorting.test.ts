import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { SortingMethod } from "../../types/sorting-method";
import { getSteps } from "./utils";

describe("sorting algorithm works correctly", () => {
  it("with bubble method", () => {
    const arr = getSteps([], SortingMethod.Bubble, Direction.Ascending);
    expect(arr).toEqual([]);
    const arr1 = getSteps(
      [{ value: 23, state: ElementStates.Default }],
      SortingMethod.Bubble,
      Direction.Descending
    );
    expect(arr1[arr1.length - 1]).toEqual([
      { value: 23, state: ElementStates.Modified },
    ]);
    const arr2 = getSteps(
      [
        { value: 23, state: ElementStates.Default },
        { value: 42, state: ElementStates.Default },
        { value: 7, state: ElementStates.Default },
      ],
      SortingMethod.Bubble,
      Direction.Ascending
    );
    expect(arr2[arr2.length - 1]).toEqual([
      { value: 7, state: ElementStates.Modified },
      { value: 23, state: ElementStates.Modified },
      { value: 42, state: ElementStates.Modified },
    ]);
  });
  it("with selection method", () => {
    const arr = getSteps([], SortingMethod.Selection, Direction.Ascending);
    expect(arr).toEqual([]);
    const arr1 = getSteps(
      [{ value: 23, state: ElementStates.Default }],
      SortingMethod.Selection,
      Direction.Descending
    );
    expect(arr1[arr1.length - 1]).toEqual([
      { value: 23, state: ElementStates.Modified },
    ]);
    const arr2 = getSteps(
      [
        { value: 23, state: ElementStates.Default },
        { value: 42, state: ElementStates.Default },
        { value: 7, state: ElementStates.Default },
      ],
      SortingMethod.Selection,
      Direction.Descending
    );
    expect(arr2[arr2.length - 1]).toEqual([
      { value: 42, state: ElementStates.Modified },
      { value: 23, state: ElementStates.Modified },
      { value: 7, state: ElementStates.Modified },
    ]);
  });
});
