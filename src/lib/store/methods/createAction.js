export default (key, mutation, { getState, dispatch }) => (...actionArgs) =>
  dispatch(key, mutation({ key, value: getState(key) }, ...actionArgs));
