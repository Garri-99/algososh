import React, { useEffect, useMemo, useState, ChangeEvent } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list.module.css";
import {
  prepend,
  IElements,
  LinkedList,
  append,
  deleteHead,
  deleteTail,
  addByIndex,
  deleteByIndex,
} from "./utils";

export const ListPage: React.FC = () => {
  const [str, setStr] = useState("");
  const [index, setIndex] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [looaderPos, setLoaderPos] = useState<
    | "addHead"
    | "addTail"
    | "delHead"
    | "delTail"
    | "addIndex"
    | "delIndex"
    | null
  >(null);
  const [steps, setSteps] = useState<IElements[][]>([]);
  const [currStep, setCurrStep] = useState<number | null>(null);
  const list = useMemo(() => new LinkedList(["b", "a", "r", "e", "v"]), []);
  const visibleArr: IElements[] = list.toArray().map((i, index, arr) => ({
    value: i.toString(),
    state: ElementStates.Default,
    head: index === 0 ? "head" : null,
    tail: index === arr.length - 1 ? "tail" : null,
  }));

  useEffect(() => {
    if (currStep === null || currStep === steps.length - 1) {
      setStr("");
      setIsLoading(false);
      setLoaderPos(null);
      return;
    }
    const timerId = setTimeout(() => {
      setCurrStep(currStep + 1);
    }, SHORT_DELAY_IN_MS);
    return () => clearTimeout(timerId);
  }, [currStep, steps]);

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <form className={styles.form}>
          <Input
            extraClass={styles.input}
            maxLength={4}
            isLimitText
            value={str}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setStr(e.target.value);
            }}
          />
          <Button
            text="Добавить в head"
            extraClass={styles.btn}
            isLoader={looaderPos === "addHead"}
            disabled={!str || isLoading}
            onClick={() => {
              setIsLoading(true);
              setLoaderPos("addHead");
              setSteps(prepend(str, visibleArr, list));
              setCurrStep(0);
            }}
          />
          <Button
            text="Добавить в tail"
            extraClass={styles.btn}
            disabled={!str || isLoading}
            isLoader={looaderPos === "addTail"}
            onClick={() => {
              setIsLoading(true);
              setLoaderPos("addTail");
              setSteps(append(str, visibleArr, list));
              setCurrStep(0);
            }}
          />
          <Button
            text="Удалить из head"
            extraClass={styles.btn}
            disabled={!list.getSize() || isLoading}
            isLoader={looaderPos === "delHead"}
            onClick={() => {
              setIsLoading(true);
              setLoaderPos("delHead");
              setSteps(deleteHead(visibleArr, list));
              setCurrStep(0);
            }}
          />
          <Button
            text="Удалить из tail"
            extraClass={styles.btn}
            isLoader={looaderPos === "delTail"}
            disabled={!list.getSize() || isLoading}
            onClick={() => {
              setIsLoading(true);
              setLoaderPos("delTail");
              setSteps(deleteTail(visibleArr, list));
              setCurrStep(0);
            }}
          />
          <Input
            placeholder="Введите индекс"
            extraClass={styles.input}
            max={list.getSize() ? list.getSize() - 1 : 0}
            min={0}
            isLimitText
            type="number"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setIndex(e.target.value);
            }}
          />
          <Button
            text="Добавить по индексу"
            extraClass={styles["large-btn"]}
            isLoader={looaderPos === "addIndex"}
            disabled={
              !index ||
              !str ||
              +index > list.getSize() - 1 ||
              (+index < 0 ? true : false) ||
              isLoading
            }
            onClick={() => {
              setIsLoading(true);
              setLoaderPos("addIndex");
              setSteps(addByIndex(str, +index, visibleArr, list));
              setCurrStep(0);
            }}
          />
          <Button
            text="Удалить по индексу"
            extraClass={styles["large-btn"]}
            isLoader={looaderPos === "delIndex"}
            disabled={
              !index ||
              +index > list.getSize() - 1 ||
              (+index < 0 ? true : false) ||
              isLoading
            }
            onClick={() => {
              setIsLoading(true);
              setLoaderPos("delIndex");
              setSteps(deleteByIndex(+index, visibleArr, list));
              setCurrStep(0);
            }}
          />
        </form>
        <ul className={styles.ul}>
          {(currStep === null ? visibleArr : steps[currStep]).map(
            (item, index, arr) => (
              <li className={styles.li} key={index}>
                <Circle
                  letter={item.value}
                  index={index}
                  state={item.state}
                  head={item.head}
                  tail={item.tail}
                />
                {index < arr.length - 1 && <ArrowIcon />}
              </li>
            )
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};
