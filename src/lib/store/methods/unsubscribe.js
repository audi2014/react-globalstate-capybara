export default (cb, getSubscriptions) =>
  getSubscriptions().filter(([scb, keys]) => scb !== cb);
