import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import styles from "./fibonacci.module.css";
import { getSteps } from "./utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [str, setStr] = useState("");
  const [steps, setSteps] = useState<number[][]>([]);
  const [currStep, setCurrStep] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  let justifyContent =
    currStep && steps[currStep].length > 10 ? "flex-start" : "center";

  useEffect(() => {
    if (currStep === null || currStep === steps.length - 1) {
      setIsLoading(false);
      return;
    }
    setTimeout(() => {
      setCurrStep(currStep + 1);
    }, SHORT_DELAY_IN_MS);
  }, [currStep, steps]);
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form
        className={styles.form}
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setIsLoading(true);
          setSteps(getSteps(+str));
          setCurrStep(0);
        }}
      >
        <Input
          max={19}
          min={0}
          isLimitText
          type="number"
          extraClass={styles.input}
          name="fibo"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setStr(e.target.value);
          }}
        />
        <Button
          text="Рассчитать"
          type="submit"
          isLoader={isLoading}
          disabled={!str || +str > 19 || +str < 0 ? true : false}
        />
      </form>
      <ul className={styles.ul} style={{ justifyContent }}>
        {currStep !== null &&
          steps[currStep].map((item, index) => (
            <li key={index}>
              <Circle letter={item.toString()} index={index} />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
