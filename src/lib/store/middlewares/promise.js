export default (k, v, { getState, dispatch }, next) => {
  if (typeof v === "object" && typeof v.then === "function") {
    v.then(r => dispatch(k, r));
  } else {
    next(k, v);
  }
};
