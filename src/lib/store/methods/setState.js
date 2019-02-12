const setState = function(key, next, getState, getSubscriptions) {
  const prev = getState(key);
  const result = { [key]: next };

  getSubscriptions().forEach(([scb, keys]) => {
    debugger;
    keys.includes(key) ? scb({ key, next, prev }) : null;
  });
  return result;
};
export default setState;
