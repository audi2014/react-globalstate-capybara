// import { DispatchEvent } from "./events";
const createAction = (key, mutation, getState, setState) => {
  return (...actionArgs) => {
    const prev = getState(key);
    const next = mutation({ key, value: prev }, ...actionArgs);
    return setState(key, next);
  };
};
export default createAction;
