import { ElementStates } from "./element-states";

export interface ILetter <T = string>{
  value: T;
  state: ElementStates;
}
