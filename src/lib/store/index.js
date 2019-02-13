import d_createAction from "./methods/createAction";
import d_applyDispatchMiddleware from "./methods/applyDispatchMiddleware";
import d_subscribe from "./methods/subscribe";
import d_unsubscribe from "./methods/unsubscribe";
import d_dispatch from "./methods/dispatch";

export const MGS = [];

export default (initialState = {}, methods = {}) => {
  const _createAction = methods.createAction || d_createAction;
  const _subscribe = methods.subscribe || d_subscribe;
  const _unsubscribe = methods.unsubscribe || d_unsubscribe;
  const _applyDispatchMiddleware =
    methods.applyDispatchMiddleware || d_applyDispatchMiddleware;
  const _dispatch = methods.dispatch || d_dispatch;

  const store = {};
  const z = {
    state: { ...initialState },
    subscriptions: [],
    middleware: (k, v) => _dispatch(k, v, store),
    dispatch: (k, v) => _dispatch(k, v, store)
  };

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
    z.middleware(k, v);
  };
  store.applyDispatchMiddleware = function(m) {
    z.middleware = _applyDispatchMiddleware(
      m,
      { ...store, dispatch: z.dispatch },
      z.middleware
    );
  };
  store.createAction = function(key, mutation) {
    return _createAction(key, mutation, store);
  };
  store.subscribe = function(cb, storeprops = []) {
    z.subscriptions = _subscribe(cb, storeprops, store);
    return cb; // return subscr id
  };
  store.unsubscribe = function(cb, storeprops = []) {
    z.subscriptions = _unsubscribe(cb, store.getSubscriptions);
  };

  MGS.push(store);
  return store;
};
