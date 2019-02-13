export default function(key, next, getState, getSubscriptions, setState) {
  const prev = getState(key);

  if (prev !== next) {
    getSubscriptions().forEach(([scb, keys]) => {
      keys.includes(key) ? scb({ key, next, prev }) : null;
    });
    setState({ [key]: next });
  }
}
