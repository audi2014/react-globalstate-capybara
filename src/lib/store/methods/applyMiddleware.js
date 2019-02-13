export const applyDispatchMiddleware = function(m, getState, next) {
  return (k, v, dispatch) => m(k, v, getState, dispatch, next);
};
