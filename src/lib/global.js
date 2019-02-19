import { createMiddleware } from "./common";
const z = {
  array: []
};
z.mid = (...args) => z.array.push(args);
export const applyGlobalMiddleware = mid =>
  (z.mid = createMiddleware(mid, z.array, z.mid));
export const wrapStoreCreator = cr => (...args) => {
  const s = cr(...args);
  z.mid(s, ...args);
  return s;
};
