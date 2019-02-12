const unsubscribe = function(cb, getSubscriptions) {
  return getSubscriptions().filter(([scb, keys]) => scb !== cb);
};
export default unsubscribe;
