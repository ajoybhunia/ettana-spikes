export const shuffle = (elements, randomFn = Math.random) =>
  elements.toSorted((a, b) => randomFn() <= 0.5 ? a - b : b - a);
