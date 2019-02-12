import d_createAction from "./methods/createAction";
// import applyMiddleware from "./methods/applyMiddleware";
// import dispatch from "./methods/dispatch";
// import events from "./methods/events";
import d_subscribe from "./methods/subscribe";
import d_unsubscribe from "./methods/unsubscribe";
import d_setState from "./methods/setState";

export const globalStore = [];

export default (initialState = {}, methods = {}) => {
  const _createAction = methods.createAction || d_createAction;
  // const applyMiddleware = methods.applyMiddleware || applyMiddleware;
  // const dispatch = methods.dispatch || dispatch;
  const _subscribe = methods.subscribe || d_subscribe;
  const _unsubscribe = methods.unsubscribe || d_unsubscribe;
  const _setState = methods.setState || d_setState;

  const z = {
    state: { ...initialState },
    subscriptions: []
  };

  const getState = function(key) {
    return z.state[key];
  };
  const getSubscriptions = function() {
    return [...z.subscriptions];
  };
  const setState = function(k, v) {
    z.state = { ...z.state, ..._setState(k, v, getState, getSubscriptions) };
  };
  const createAction = function(key, mutation) {
    return _createAction(key, mutation, getState, setState);
  };
  const subscribe = function(cb, storeprops = []) {
    z.subscriptions = _subscribe(cb, storeprops, getSubscriptions, getState);
    return cb; // return subscr id
  };
  const unsubscribe = function(cb, storeprops = []) {
    z.subscriptions = _unsubscribe(cb, getSubscriptions);
  };

  const store = {
    createAction,
    getState,
    subscribe,
    unsubscribe
  };
  globalStore.push(store);
  return store;
};
