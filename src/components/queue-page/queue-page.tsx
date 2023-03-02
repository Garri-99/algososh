import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
} from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue.module.css";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Queue, IElements, getSteps } from "./utils";
import { ElementStates } from "../../types/element-states";

export const QueuePage: React.FC = () => {
  const [str, setStr] = useState("");
  const [steps, setSteps] = useState<IElements[][]>([]);
  const [currStep, setCurrStep] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [looaderPos, setLoaderPos] = useState<"enqueue" | "dequeue" | null>(
    null
  );
  const [toggle, clearElemets] = useState(false);
  const queue = useMemo(() => new Queue<string>(7), []);
  const visibleElements = useMemo(() => {
    const arr: IElements[] = [];
    for (let i = 0; i < queue.getSize(); i++) {
      arr[i] = {
        value: "",
        state: ElementStates.Default,
        isHead: false,
        isTail: false,
      };
    }
    return arr;
  }, [toggle]);

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
    <SolutionLayout title="Очередь">
      <form
        className={styles.form}
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setIsLoading(true);
          setSteps(getSteps(queue, visibleElements, str, looaderPos));
          setCurrStep(0);
        }}
        onReset={() => {
          clearElemets(!toggle);
          setCurrStep(null);
          setSteps([]);
          queue.clear();
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
          type="submit"
          isLoader={looaderPos === "enqueue"}
          disabled={!str || isLoading || queue.getLength() === queue.getSize()}
          extraClass="mr-6 ml-6"
          onClick={() => {
            setLoaderPos("enqueue");
          }}
        />
        <Button
          text="Удалить"
          type="submit"
          onClick={() => {
            setLoaderPos("dequeue");
          }}
          isLoader={looaderPos === "dequeue"}
          disabled={isLoading || queue.getLength() === 0}
        />
        <Button
          text="Очистить"
          type="reset"
          disabled={queue.getLength() === 0 || isLoading}
          extraClass="ml-40"
        />
      </form>
      <ul className={styles.ul}>
        {(currStep === null ? visibleElements : steps[currStep]).map(
          (item, index) => (
            <li key={index}>
              <Circle
                letter={item.value}
                index={index}
                state={item.state}
                head={item.isHead ? "head" : null}
                tail={item.isTail ? "tail" : null}
              />
            </li>
          )
        )}
      </ul>
    </SolutionLayout>
  );
};
