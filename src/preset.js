const getDiceColor = (colorId, randomFn) => {
  if (colorId === undefined) return Math.floor(randomFn() * 6) + 1;
  return colorId;
};

const getDiceValue = (randomFn) => Math.floor(randomFn() * 6) + 1;

export const getDice = (colorId, randomFn = Math.random) => {
  const diceColor = getDiceColor(colorId, randomFn);
  const diceValue = getDiceValue(randomFn);

  return { diceValue, diceColor };
};
