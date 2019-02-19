export const createMiddleware = (mid, params, next) => (...args) =>
  mid(...args, params, next);
