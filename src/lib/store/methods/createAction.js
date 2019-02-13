// import { DispatchEvent } from "./events";
const createAction = (key, mutation, getState, dispatch) => {
  return (...actionArgs) => {
    const prev = getState(key);
    const next = mutation({ key, value: prev }, ...actionArgs);
    dispatch(key, next);
  };
};
export default createAction;
