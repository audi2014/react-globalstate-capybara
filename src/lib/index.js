import Store from "./store";
import promiseMiddleware from "./store/middlewares/promise";
import * as arrayMutations from "./store/mutations/array";
import hoc from "./withGlobalState";

export default Store;
export const withGlobalState = hoc;
export const middlewares = {
  promise: promiseMiddleware
};
export const mutations = {
  array: arrayMutations
};
