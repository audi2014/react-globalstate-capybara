import d_createAction from "./methods/createAction";
import { applyDispatchMiddleware as d_applyDispatchMiddleware } from "./methods/applyMiddleware";
// import dispatch from "./methods/dispatch";
// import events from "./methods/events";
import d_subscribe from "./methods/subscribe";
import d_unsubscribe from "./methods/unsubscribe";
import d_dispatch from "./methods/dispatch";

export const globalStore = [];

export default (initialState = {}, methods = {}) => {
  const _createAction = methods.createAction || d_createAction;
  // const applyMiddleware = methods.applyMiddleware || applyMiddleware;
  // const dispatch = methods.dispatch || dispatch;
  const _subscribe = methods.subscribe || d_subscribe;
  const _unsubscribe = methods.unsubscribe || d_unsubscribe;
  const _applyDispatchMiddleware =
    methods.applyDispatchMiddleware || d_applyDispatchMiddleware;

  const z = {
    state: { ...initialState },
    subscriptions: [],
    dispatch: methods.dispatch || d_dispatch,
    middleware: (k, v, getState, dispatch, next) => dispatch(k, v)
  };
  const store = {};

  store.getState = function(key) {
    return z.state[key];
  };
  store.setState = function(nextState) {
    z.state = { ...z.state, ...nextState };
    return z.state;
  };
  store.getSubscriptions = function() {
    return [...z.subscriptions];
  };
  store.dispatch = function(k, v) {
    z.middleware(k, v, (k, v) =>
      z.dispatch(k, v, store.getState, store.getSubscriptions, store.setState)
    );
  };
  store.applyDispatchMiddleware = function(m) {
    z.middleware = _applyDispatchMiddleware(
      m,
      store.getState,
      z.dispatch,
      z.middleware
    );
  };
  store.createAction = function(key, mutation) {
    return _createAction(key, mutation, store.getState, store.dispatch);
  };
  store.subscribe = function(cb, storeprops = []) {
    z.subscriptions = _subscribe(
      cb,
      storeprops,
      store.getSubscriptions,
      store.getState
    );
    return cb; // return subscr id
  };
  store.unsubscribe = function(cb, storeprops = []) {
    z.subscriptions = _unsubscribe(cb, store.getSubscriptions);
  };

  globalStore.push(store);
  return store;
};
