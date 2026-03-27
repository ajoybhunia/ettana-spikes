const move = (pattern, dx, dy) => {
  return structuredClone(pattern).map((point) => {
    point.coord.x += dx;
    point.coord.y += dy;

    return point;
  });
};

const translatePattern = (pattern, maxDown, maxRight) => {
  const variations = [];

  for (let dx = 0; dx <= maxDown; dx++) {
    for (let dy = 0; dy <= maxRight; dy++) {
      variations.push(move(pattern, dx, dy));
    }
  }

  return variations;
};

const translate = (pattern) => {
  const rows = pattern.map((p) => p.coord.x);
  const cols = pattern.map((p) => p.coord.y);

  const maxX = Math.max(...rows);
  const maxY = Math.max(...cols);

  const maxDown = 5 - (maxX + 1);
  const maxRight = 5 - (maxY + 1);

  return translatePattern(pattern, maxDown, maxRight);
};

const generateVariations = (pattern) => {
  return translate(pattern);
};

export const matchPattern = ({ yarns }, pattern) => {
  const patternVariations = generateVariations(pattern);

  return patternVariations.some((variation) => {
    const colorHash = {};

    return variation.every(({ coord, color }) => {
      const yarn = yarns[coord.x][coord.y];

      if (color in colorHash) return colorHash[color] === yarn;

      colorHash[color] = yarn;
      return true;
    });
  });
};
