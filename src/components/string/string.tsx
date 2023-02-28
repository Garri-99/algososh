import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { getSteps } from "./utils";
import { ILetter } from "../../types/letter";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const [str, setStr] = useState("");
  const [steps, setSteps] = useState<ILetter[][]>([]);
  const [currStep, setCurrStep] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currStep === null || currStep === steps.length - 1) {
      setIsLoading(false);
      return;
    }
    setTimeout(() => {
      setCurrStep(currStep + 1);
    }, DELAY_IN_MS);
  }, [currStep, steps]);

  return (
    <SolutionLayout title="Строка">
      <form
        className={styles.form}
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setIsLoading(true);
          setSteps(getSteps(str));
          setCurrStep(0);
        }}
      >
        <Input
          maxLength={11}
          isLimitText
          extraClass={styles.input}
          name="string"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setStr(e.target.value);
          }}
        />
        <Button
          text="Развернуть"
          type="submit"
          isLoader={isLoading}
          disabled={str ? false : true}
        />
      </form>
      <ul className={styles.ul}>
        {currStep !== null &&
          steps[currStep].map((item, index) => (
            <li key={index}>
              <Circle letter={item.value} state={item.state} />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
