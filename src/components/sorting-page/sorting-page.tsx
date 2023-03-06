import React, { useState, useEffect } from "react";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting.module.css";
import { getSteps, randomArr } from "./utils";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { SortingMethod } from "../../types/sorting-method";
import { ILetter } from "../../types/letter";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<ILetter<number>[]>(randomArr());
  const [selectedMethod, setSortingMethod] = useState(SortingMethod.Selection);
  const [steps, setSteps] = useState<ILetter<number>[][]>([]);
  const [currStep, setCurrStep] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState<Direction | null>(null);

  useEffect(() => {
    if (currStep === null || currStep === steps.length - 1) {
      setIsLoading(false);
      setDirection(null);
      return;
    }
    const timerId = setTimeout(() => {
      setCurrStep(currStep + 1);
    }, SHORT_DELAY_IN_MS);
    return () => clearTimeout(timerId);
  }, [currStep, steps]);

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <RadioInput
          label="Выбор"
          name="sortingMethod"
          checked={SortingMethod.Selection === selectedMethod}
          onChange={() => setSortingMethod(SortingMethod.Selection)}
          disabled={isLoading}
        />
        <RadioInput
          label="Пузырёк"
          name="sortingMethod"
          extraClass="mr-25 ml-20"
          checked={SortingMethod.Bubble === selectedMethod}
          onChange={() => setSortingMethod(SortingMethod.Bubble)}
          disabled={isLoading}
        />
        <Button
          text="По возрастанию"
          sorting={Direction.Ascending}
          isLoader={direction === Direction.Ascending}
          disabled={isLoading}
          extraClass={styles.asc}
          onClick={() => {
            setDirection(Direction.Ascending);
            setIsLoading(true);
            setSteps(getSteps(arr, selectedMethod, Direction.Ascending));
            setCurrStep(0);
          }}
        />
        <Button
          text="По убыванию"
          sorting={Direction.Descending}
          extraClass={`${styles.btn} ml-6 mr-35`}
          isLoader={direction === Direction.Descending}
          disabled={isLoading}
          onClick={() => {
            setDirection(Direction.Descending);
            setIsLoading(true);
            setSteps(getSteps(arr, selectedMethod, Direction.Descending));
            setCurrStep(0);
          }}
        />
        <Button
          onClick={() => {
            setCurrStep(null);
            setArr(randomArr());
          }}
          text="Новый массив"
          extraClass={styles.btn}
          disabled={isLoading}
        />
      </form>
      <ul className={styles.ul}>
        {(currStep !== null ? steps[currStep] : arr).map((item, index) => (
          <li key={index}>
            <Column index={item.value} state={item.state} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
