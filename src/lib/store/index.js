import m from "./methods/index";
import { createMiddleware } from "../common";
export default (initialState = {}, info) => {
  const store = {};
  const z = {
    state: { ...initialState },
    subscriptions: [],
    dispatch: v => m.dispatch(v, store),
    createAction: (key, mutation, info = "") => {
      return m.createAction({ key, mutation, info }, store);
    },
    subscribe: (cb, storeprops = [], info = "") => {
      z.subscriptions = m.subscribe(cb, storeprops, info, store);
      return cb; // return subscr id
    },
    unsubscribe: (cb, storeprops = []) => {
      z.subscriptions = m.unsubscribe(cb, store.getSubscriptions);
    },
    setState: nextState => {
      z.state = m.setState(z.state, nextState);
      return z.state;
    }
  };
  [...Object.keys(m)].forEach(k => {
    store[k] = z[k];
  });

  store.getState = key => {
    return z.state[key];
  };
  store.getSubscriptions = () => {
    return [...z.subscriptions];
  };
  store.applyMiddleware = (mid, method) =>
    (store[method] = m[method]
      ? createMiddleware(mid, { ...store, ...z }, store[method])
      : console.error("use", Object.keys(m)));
  return store;
};
