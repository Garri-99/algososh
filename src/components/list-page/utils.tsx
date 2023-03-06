import { ReactElement } from "react";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";

export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  addByIndex: (element: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  getHead: () => Node<T> | null;
  getTail: () => Node<T> | null;
  getSize: () => number;
  toArray: () => T[];
}

export interface IElements {
  value: string;
  head: string | ReactElement | null;
  tail: string | ReactElement | null;
  state: ElementStates;
}

export class LinkedList<T = any> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  constructor(arr?: T[]) {
    this.size = 0;
    this.tail = null;
    this.head = arr && arr.length ? this.toLinkedList(arr) : null;
  }

  private toLinkedList = (arr: T[]): Node<T> => {
    const head = new Node(arr[0]);
    this.tail = head;
    let curr: Node<T> = head;
    const { length } = arr;
    this.size = length;
    for (let i = 1; i < length; i++) {
      curr.next = new Node(arr[i]);
      curr = curr.next;
      if (i === length - 1) {
        this.tail = curr;
      }
    }
    return head;
  };

  prepend = (element: T): void => {
    const node = new Node(element);
    node.next = this.head;
    this.head = node;
    if (this.size === 0) {
      this.tail = node;
    }
    this.size++;
  };

  append = (element: T): void => {
    const node = new Node(element);
    if (this.tail) {
      this.tail.next = node;
      this.tail = this.tail.next;
    } else {
      this.head = node;
      this.tail = node;
    }
    this.size++;
  };

  addByIndex = (element: T, index: number): void => {
    if (index < 0 || index > this.size) {
      throw new Error("Enter a valid index");
    }
    if (index === 0) {
      this.prepend(element);
    } else if (index === this.size) {
      this.append(element);
    } else if (this.head) {
      let curr = this.head;
      let currIndex = 0;
      const node = new Node(element);
      while (curr.next && currIndex < index - 1) {
        curr = curr.next;
        currIndex++;
      }
      node.next = curr.next;
      curr.next = node;
      this.size++;
    }
  };

  deleteHead = (): void => {
    if (this.size === 1) {
      this.head = this.tail = null;
      this.size--;
    }
    if (this.head) {
      this.head = this.head.next;
      this.size--;
    }
  };

  deleteTail = (): void => {
    if (this.size === 1) {
      this.head = this.tail = null;
      this.size--;
    } else if (this.size > 1) {
      this.size--;
      let curr = this.head;
      let currIndex = 0;
      while (currIndex < this.size - 1 && curr) {
        curr = curr.next;
        currIndex++;
      }
      if (curr) {
        curr.next = null;
        this.tail = curr;
      }
    }
  };

  deleteByIndex = (index: number): void => {
    if (index < 0 || index >= this.size) {
      throw new Error("Enter a valid index");
    }
    if (index === this.size - 1) {
      this.deleteTail();
    } else if (index === 0) {
      this.deleteHead();
    } else {
      let curr = this.head;
      let currIndex = 0;
      while (currIndex < index - 1 && curr) {
        curr = curr.next;
        currIndex++;
      }
      if (curr && curr.next) {
        curr.next = curr.next.next;
      }
      this.size--;
    }
  };

  toArray = (): T[] => {
    const res: T[] = [];
    let curr = this.head;
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return res;
  };

  getHead = (): Node<T> | null => this.head;

  getTail = (): Node<T> | null => this.tail;

  getSize = (): number => this.size;
}

export const prepend = (
  element: string,
  arr: IElements[],
  list: LinkedList
) => {
  const steps: IElements[][] = [];
  if (arr.length === 0) {
    arr[0] = {
      ...arr[0],
      head: <Circle state={ElementStates.Changing} letter={element} isSmall />,
      value: "",
      tail: "tail",
    };
    steps.push([...arr]);
    arr[0] = {
      ...arr[0],
      head: "head",
      value: element,
      state: ElementStates.Modified,
    };
    steps.push([...arr]);
    arr[0] = {
      ...arr[0],
      state: ElementStates.Default,
    };
    steps.push([...arr]);
  } else {
    arr[0] = {
      ...arr[0],
      head: <Circle state={ElementStates.Changing} letter={element} isSmall />,
    };
    steps.push([...arr]);
    arr[0] = {
      ...arr[0],
      head: null,
    };
    arr.unshift({
      value: element,
      state: ElementStates.Modified,
      head: "head",
      tail: null,
    });
    steps.push([...arr]);
    arr[0] = { ...arr[0], state: ElementStates.Default };
    steps.push([...arr]);
  }
  list.prepend(element);
  return steps;
};

export const append = (element: string, arr: IElements[], list: LinkedList) => {
  const steps: IElements[][] = [];
  if (arr.length === 0) {
    arr[0] = {
      ...arr[0],
      head: <Circle state={ElementStates.Changing} letter={element} isSmall />,
      value: "",
      tail: "tail",
    };
    steps.push([...arr]);
    arr[0] = {
      ...arr[0],
      head: "head",
      value: element,
      state: ElementStates.Modified,
    };
    steps.push([...arr]);
    arr[0] = {
      ...arr[0],
      state: ElementStates.Default,
    };
    steps.push([...arr]);
  } else {
    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      head: <Circle state={ElementStates.Changing} letter={element} isSmall />,
    };
    steps.push([...arr]);
    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      head: arr.length === 1 ? "head" : null,
      tail: null,
    };
    arr.push({
      value: element,
      state: ElementStates.Modified,
      head: null,
      tail: "tail",
    });
    steps.push([...arr]);
    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      state: ElementStates.Default,
    };
    steps.push([...arr]);
  }
  list.append(element);
  return steps;
};

export const deleteHead = (arr: IElements[], list: LinkedList) => {
  const steps: IElements[][] = [];
  arr[0] = {
    ...arr[0],
    tail: (
      <Circle state={ElementStates.Changing} letter={arr[0].value} isSmall />
    ),
    value: "",
  };
  steps.push([...arr]);
  arr.shift();
  if (arr.length) {
    arr[0] = {
      ...arr[0],
      head: "head",
    };
  }
  steps.push([...arr]);
  list.deleteHead();
  return steps;
};

export const deleteTail = (arr: IElements[], list: LinkedList) => {
  const steps: IElements[][] = [];
  arr[arr.length - 1] = {
    ...arr[arr.length - 1],
    tail: (
      <Circle
        state={ElementStates.Changing}
        letter={arr[arr.length - 1].value}
        isSmall
      />
    ),
    value: "",
  };
  steps.push([...arr]);
  arr.pop();
  arr[arr.length - 1] = {
    ...arr[arr.length - 1],
    tail: "tail",
  };
  steps.push([...arr]);
  list.deleteTail();
  return steps;
};

export const addByIndex = (
  element: string,
  index: number,
  arr: IElements[],
  list: LinkedList
) => {
  const steps: IElements[][] = [];
  const copyArr = [...arr];
  for (let i = 0; i <= index; i++) {
    if (i > 0) {
      arr[i - 1] = {
        ...arr[i - 1],
        head: i === 1 ? "head" : null,
        state: ElementStates.Changing,
      };
    }
    arr[i] = {
      ...arr[i],
      head: <Circle state={ElementStates.Changing} letter={element} isSmall />,
    };
    steps.push([...arr]);
  }
  copyArr.splice(index, 0, {
    value: element,
    head: index === 0 ? "head" : null,
    tail: null,
    state: ElementStates.Modified,
  });
  if (index === 0) {
    copyArr[1] = {
      ...copyArr[1],
      head: null,
    };
  }
  steps.push([...copyArr]);
  copyArr[index] = {
    ...copyArr[index],
    state: ElementStates.Default,
  };
  steps.push([...copyArr]);
  list.addByIndex(element, index);
  return steps;
};

export const deleteByIndex = (
  index: number,
  arr: IElements[],
  list: LinkedList
) => {
  const steps: IElements[][] = [];
  const copyArr = [...arr];
  for (let i = 0; i <= index; i++) {
    arr[i] = {
      ...arr[i],
      state: ElementStates.Changing,
    };
    steps.push([...arr]);
  }
  arr[index] = {
    ...arr[index],
    tail: (
      <Circle
        letter={arr[index].value}
        isSmall
        state={ElementStates.Changing}
      />
    ),
    value: "",
  };
  steps.push([...arr]);
  copyArr.splice(index, 1);
  if (index === 0 && copyArr.length) {
    copyArr[0] = {
      ...copyArr[0],
      head: "head",
    };
  }
  if (index === copyArr.length && copyArr.length) {
    copyArr[copyArr.length - 1] = {
      ...copyArr[copyArr.length - 1],
      tail: "tail",
    };
  }
  steps.push([...copyArr]);
  list.deleteByIndex(index);
  return steps;
};
