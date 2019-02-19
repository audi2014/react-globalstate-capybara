export default (
  { key, value, info },
  { getState, getSubscriptions, setState }
) => {
  const prev = getState(key);
  if (prev !== value) {
    getSubscriptions().forEach(([scb, keys]) => {
      keys.includes(key) ? scb({ key, next: value, prev, info }) : null;
    });
    setState({ [key]: value });
  }
};
