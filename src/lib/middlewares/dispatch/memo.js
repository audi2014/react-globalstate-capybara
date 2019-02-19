export default ({ key, value, info }, { getState }, next) => {
  try {
    if (JSON.stringify(value) === JSON.stringify(getState(key))) {
      return;
    }
  } catch (e) {}
  next({ key, value, info });
};
