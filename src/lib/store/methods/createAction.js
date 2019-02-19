export const createAction = (
  { key, mutation, info },
  { getState, dispatch }
) => (...actionArgs) =>
  dispatch({
    key,
    value: mutation({ key, value: getState(key), info }, ...actionArgs),
    info
  });

export default ({ key, mutation, info }, store) => {
  if (Array.isArray(mutation)) {
    return mutation.map((mutation, idx) =>
      createAction(
        {
          key,
          mutation,
          info: `${info}[${idx}]`
        },
        store
      )
    );
  } else if (typeof mutation === "object") {
    return Object.keys(mutation).reduce((result, k) => {
      result[k] = createAction(
        {
          key,
          mutation: mutation[k],
          info: `${info}.${k}`
        },
        store
      );
      return result;
    }, {});
  } else {
    return createAction({ key, mutation, info }, store);
  }
};
