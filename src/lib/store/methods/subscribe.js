const subscribe = (cb, storeprops, getSubscriptions, getState) => {
  const subscriptions = getSubscriptions();
  if (!subscriptions.find(([scb, keys]) => scb === cb)) {
    subscriptions.push([cb, storeprops]);
    //init values
    storeprops.forEach(key => {
      const prev = getState(key);
      const next = prev;
      cb({ key, next, prev });
    });
  } else {
    console.error("handler can't subscribe twice");
  }
  return subscriptions;
};
export default subscribe;
