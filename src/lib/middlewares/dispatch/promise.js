export default (e, { getState }, next) => {
  if (typeof e.value === "object" && typeof e.value.then === "function") {
    e.value.then(r => next({ ...e, value: r }));
  } else {
    next(e);
  }
};
