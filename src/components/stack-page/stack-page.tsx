import React, { useState, ChangeEvent, useEffect, useMemo } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack.module.css";
import { ILetter } from "../../types/letter";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { getSteps, Stack } from "./utils";

export const StackPage: React.FC = () => {
  const [str, setStr] = useState("");
  const [steps, setSteps] = useState<ILetter[][]>([]);
  const [currStep, setCurrStep] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [looaderPos, setLoaderPos] = useState<"push" | "pop" | null>(null);
  const stack = useMemo(() => new Stack<ILetter>(), []);

  useEffect(() => {
    if (currStep === null || currStep === steps.length - 1) {
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
    <SolutionLayout title="Стек">
      <form
        className={styles.form}
        onReset={() => {
          setCurrStep(null);
          setSteps([]);
          stack.clear();
        }}
      >
        <Input
          maxLength={4}
          isLimitText
          extraClass={styles.input}
          name="string"
          value={str}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setStr(e.target.value);
          }}
        />
        <Button
          text="Добавить"
          isLoader={looaderPos === "push"}
          disabled={!str || isLoading}
          extraClass="mr-6 ml-6"
          onClick={() => {
            setLoaderPos("push");
            setIsLoading(true);
            setSteps(getSteps(stack, str, "push"));
            setCurrStep(0);
            setStr("");
          }}
        />
        <Button
          text="Удалить"
          onClick={() => {
            setLoaderPos("pop");
            setIsLoading(true);
            setSteps(getSteps(stack, str, "pop"));
            setCurrStep(0);
            setStr("");
          }}
          isLoader={looaderPos === "pop"}
          disabled={isLoading || stack.getSize() === 0}
        />
        <Button
          text="Очистить"
          type="reset"
          disabled={stack.getSize() === 0 || isLoading}
          extraClass="ml-40"
        />
      </form>
      <ul className={styles.ul}>
        {currStep !== null &&
          steps[currStep].map((item, index, arr) => (
            <li key={index}>
              <Circle
                letter={item.value}
                state={item.state}
                index={index}
                head={index === arr.length - 1 ? "top" : null}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
