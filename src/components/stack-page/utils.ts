import { ElementStates } from "../../types/element-states";
import { ILetter } from "../../types/letter";

interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  getElements: () => T[];
  getSize: () => number;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): T | undefined => {
    if (this.container.length) {
      return this.container.pop();
    }
  };

  clear = (): void => {
    this.container.length = 0;
  };

  getElements = (): T[] => {
    return this.container;
  };

  getSize = () => this.container.length;
}

export function getSteps(
  stack: Stack<ILetter>,
  str: string,
  action: "push" | "pop"
): ILetter[][] {
  const steps: ILetter[][] = [];
  if (action === "push") {
    const letter: ILetter = { value: str, state: ElementStates.Default };
    steps.push([
      ...stack.getElements(),
      { ...letter, state: ElementStates.Changing },
    ]);
    steps.push([...stack.getElements(), letter]);
    stack.push(letter);
  } else {
    const letter = stack.pop();
    if (letter) {
      steps.push([
        ...stack.getElements(),
        { ...letter, state: ElementStates.Changing },
      ]);
      steps.push([...stack.getElements()]);
    }
  }
  return steps;
}
