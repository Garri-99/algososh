import { swap } from "../../utils";
import { ILetter } from "../../types/letter";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { SortingMethod } from "../../types/sorting-method";

const getRndInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const randomArr = (): ILetter<number>[] => {
  const res: ILetter<number>[] = [];
  let length = getRndInteger(3, 17);
  while (length) {
    res.push({ value: getRndInteger(0, 100), state: ElementStates.Default });
    length--;
  }
  return res;
};

export const getSteps = (
  arr: ILetter<number>[],
  method: SortingMethod,
  direction: Direction
) => {
  const copy = [...arr];
  const steps: ILetter<number>[][] = [];
  if (copy.length === 0) {
    return steps
  }
  if (copy.length === 1) {
    steps.push([...copy]);
    copy[0] = { ...copy[0], state: ElementStates.Changing }
    steps.push([...copy]);
    copy[0] = { ...copy[0], state: ElementStates.Modified }
    steps.push([...copy]);
    return steps
  }
  const { length } = copy;
  if (method === SortingMethod.Selection) {
    for (let i = 0; i < length - 1; i++) {
      copy[i] = { ...copy[i], state: ElementStates.Changing };
      let extInd = i;
      for (let j = i + 1; j < length; j++) {
        copy[j] = { ...copy[j], state: ElementStates.Changing };
        steps.push([...copy]);
        if (
          direction === Direction.Ascending
            ? copy[j].value < copy[extInd].value
            : copy[j].value > copy[extInd].value
        ) {
          copy[extInd] = { ...copy[extInd], state: ElementStates.Default };
          extInd = j;
        } else {
          copy[j] = { ...copy[j], state: ElementStates.Default };
        }
      }
      if (i !== extInd) {
        swap(copy, i, extInd);
        swap(arr, i, extInd);
        copy[extInd] = { ...copy[extInd], state: ElementStates.Default };
      }
      copy[i] = { ...copy[i], state: ElementStates.Modified };
      if (i === length - 2) {
        copy[length - 1] = {
          ...copy[length - 1],
          state: ElementStates.Modified,
        };
      }
      steps.push([...copy]);
    }
  } else {
    for (let j = length - 1; j > 0; j--) {
      for (let i = 0; i < j; i++) {
        copy[i] = { ...copy[i], state: ElementStates.Changing };
        copy[i + 1] = { ...copy[i + 1], state: ElementStates.Changing };
        if (
          direction === Direction.Ascending
            ? copy[i].value > copy[i + 1].value
            : copy[i].value < copy[i + 1].value
        ) {
          swap(copy, i, i + 1);
          swap(arr, i, i + 1);
        }
        steps.push([...copy]);
        if (i === 0 && j === 1) {
          copy[i] = { ...copy[i], state: ElementStates.Modified };
        } else {
          copy[i] = { ...copy[i], state: ElementStates.Default };
        }
        if (i + 1 === j) {
          copy[i + 1] = { ...copy[i + 1], state: ElementStates.Modified };
        } else {
          copy[i + 1] = { ...copy[i + 1], state: ElementStates.Default };
        }
      }
    }
    steps.push([...copy]);
  }
  return steps;
};
