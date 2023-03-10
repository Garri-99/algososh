import { ElementStates } from "../../types/element-states";
import { swap } from "../../utils";
import { ILetter } from "../../types/letter";

export function getSteps(str: string): ILetter[][] {
  const arr: ILetter[] = str.split("").map((i) => ({
    value: i,
    state: ElementStates.Default,
  }));
  const all: ILetter[][] = [[...arr]];
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    if (start === end) {
      arr[start] = { ...arr[start], state: ElementStates.Changing };
    } else {
      arr[start] = { ...arr[start], state: ElementStates.Changing };
      arr[end] = { ...arr[end], state: ElementStates.Changing };
    }
    all.push([...arr]);
    swap(arr, start, end);
    if (start === end) {
      arr[start] = { ...arr[start], state: ElementStates.Modified };
    } else {
      arr[start] = { ...arr[start], state: ElementStates.Modified };
      arr[end] = { ...arr[end], state: ElementStates.Modified };
    }
    all.push([...arr]);
    start++;
    end--;
  }
  return all
}
