export const push = ({ value }, nextValue) => [...value, nextValue];
export const set = ({ value }, nextValue) => [...nextValue];
export const clear = ({ value }, nextValue) => [];
export const filter = ({ value }, nextValue, predicate) =>
  value.filter(v => predicate(v, nextValue));
export const sort = ({ value }, predicate) => {
  let ch = false;
  value.sort((a, b) => {
    const v = predicate(a, b);
    if (v < 0) ch = true;
    return v;
  });
  return ch ? [...value] : value;
};
