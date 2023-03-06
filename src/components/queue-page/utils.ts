import { ElementStates } from "../../types/element-states";

export interface IElements {
  value: string;
  state: ElementStates;
  isHead: boolean;
  isTail: boolean;
}

interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  getElements: () => (T | null)[];
  getHeadIndex: () => number;
  getTailIndex: () => number;
  getSize: () => number;
  getLength: () => number;
  clear: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head: number | null = null;
  private tail: number | null = null;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  getElements = (): (T | null)[] => this.container;

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    if (this.head === null) {
      this.head = 0;
    }
    this.tail = this.tail === null ? 0 : ++this.tail;
    this.container[this.tail % this.size] = item;
    this.length++;
  };

  dequeue = () => {
    if (this.head === null) {
      throw new Error("No elements in the queue");
    }
    delete this.container[this.head];
    this.length--;
    if (this.length) {
      this.head = ++this.head;
    } else {
      this.tail = this.head - 1;
    }
  };

  getSize = (): number => this.size;

  getLength = (): number => this.length;

  getHeadIndex = (): number => {
    if (this.head === null) {
      throw new Error("No elements in the queue");
    }
    return this.head ? this.head : 0;
  };

  getTailIndex = (): number => {
    if (this.tail === null) {
      throw new Error("No elements in the queue");
    }
    return this.tail ? this.tail : 0;
  };

  clear = (): void => {
    this.container = Array(this.getSize());
    this.length = 0;
    this.head = null;
    this.tail = null;
  };
}

export const getSteps = (
  queue: Queue<string>,
  elements: IElements[],
  str: string,
  action: "enqueue" | "dequeue"
): IElements[][] => {
  const steps: IElements[][] = [];
  const { getTailIndex, getLength, getHeadIndex, getSize } = queue;
  if (action === "enqueue") {
    queue.enqueue(str);
    elements[getTailIndex() % getSize()] = {
      ...elements[getTailIndex() % getSize()],
      state: ElementStates.Changing,
    };
    steps.push([...elements]);
    elements[getTailIndex() % getSize()] = {
      ...elements[getTailIndex() % getSize()],
      value: str,
      isTail: true,
      isHead: getLength() === 1,
    };
    if (getLength() > 1) {
      elements[(getTailIndex() - 1) % getSize()] = {
        ...elements[(getTailIndex() - 1) % getSize()],
        isTail: false,
      };
    }
    steps.push([...elements]);
    elements[getTailIndex() % getSize()] = {
      ...elements[getTailIndex() % getSize()],
      state: ElementStates.Default,
    };
    steps.push([...elements]);
  } else {
    elements[getHeadIndex() % getSize()] = {
      ...elements[getHeadIndex() % getSize()],
      state: ElementStates.Changing,
    };
    steps.push([...elements]);
    elements[getHeadIndex() % getSize()] = {
      ...elements[getHeadIndex() % getSize()],
      state: ElementStates.Default,
      isHead: getLength() === 1,
      value: "",
    };
    if (getLength() > 1) {
      elements[(getHeadIndex() + 1) % getSize()] = {
        ...elements[(getHeadIndex() + 1) % getSize()],
        isHead: true,
      };
    }
    if (getLength() === 1) {
      elements[getHeadIndex() % getSize()] = {
        ...elements[getHeadIndex() % getSize()],
        isTail: false,
      };
    }
    steps.push([...elements]);
    queue.dequeue();
  }
  return steps;
};
