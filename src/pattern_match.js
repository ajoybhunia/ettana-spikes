const move = (pattern, dx, dy) => {
  return structuredClone(pattern).map((point) => {
    point.coord.x += dx;
    point.coord.y += dy;

    return point;
  });
};

const normalize = (pattern) => {
  const minX = Math.min(...pattern.map((p) => p.coord.x));
  const minY = Math.min(...pattern.map((p) => p.coord.y));

  return pattern.map((p) => ({
    coord: {
      x: p.coord.x - minX,
      y: p.coord.y - minY,
    },
    color: p.color,
  }));
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
  const normalized = normalize(pattern);

  const rows = normalized.map((p) => p.coord.x);
  const cols = normalized.map((p) => p.coord.y);

  const height = Math.max(...rows) + 1;
  const width = Math.max(...cols) + 1;

  const maxDown = 5 - height;
  const maxRight = 5 - width;

  return translatePattern(normalized, maxDown, maxRight);
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
