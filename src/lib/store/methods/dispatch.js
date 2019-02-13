export default (key, value, { getState, getSubscriptions, setState }) => {
  const prev = getState(key);
  if (prev !== value) {
    getSubscriptions().forEach(([scb, keys]) => {
      keys.includes(key) ? scb({ key, next: value, prev }) : null;
    });
    setState({ [key]: value });
  }
};
