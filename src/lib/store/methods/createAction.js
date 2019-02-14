export const createAction = (key, mutation, { getState, dispatch }) => (
  ...actionArgs
) => dispatch(key, mutation({ key, value: getState(key) }, ...actionArgs));

export const createActionArray = (key, mutation_array, store) => {
  console.log(key, mutation_array);
};

export default (prop_key, mutation, store) => {
  if (Array.isArray(mutation)) {
    return mutation.map(mutation => createAction(prop_key, mutation, store));
  } else if (typeof mutation === "object") {
    return Object.keys(mutation).reduce((result, key) => {
      result[key] = createAction(prop_key, mutation[key], store);
      return result;
    }, {});
  } else {
    return createAction(prop_key, mutation, store);
  }
};

// //builder = (key, v) => res
// export const mapBySelectorType = (selector, arg, builder) => {
//   if (Array.isArray(selector)) {
//     return selector.reduce((result, item_selector) => {
//       result.push(builder(item_selector, arg));
//       return result;
//     }, []);
//   } else if (typeof selector === "object") {
//     return Object.keys(selector).reduce((result, item_selector) => {
//       result[item_selector] = builder(item_selector, arg);
//       return result;
//     }, {});
//   } else {
//     return builder(selector, arg);
//   }
// };

// export default (key, mutation, store) => {
//   const builder = (k, v) => createAction(k, v, store);
//   const key_builder = (k, v) => mapBySelectorType(key, mutation, builder);
//   const mutation_bulder = (k, v) =>
//     mapBySelectorType(mutation, mutation, key_builder);

//   return mutation_bulder(key, mutation);
// };
