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

const generatePatternGrid = (pattern) => {
  const normalized = normalize(pattern);

  const maxX = Math.max(...normalized.map((p) => p.coord.x));
  const maxY = Math.max(...normalized.map((p) => p.coord.y));

  const grid = Array.from(
    { length: maxX + 1 },
    () => Array.from({ length: maxY + 1 }).fill(null),
  );

  normalized.forEach(({ coord, color }) => {
    grid[coord.x][coord.y] = color;
  });

  return grid;
};

const extractPoints = (grid) => {
  const points = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const color = grid[row][col];
      if (color !== null) points.push({ x: row, y: col, color });
    }
  }

  return points;
};

const matchesAt = (yarns, points, startX, startY) => {
  const colorHash = {};

  return points.every(({ x, y, color }) => {
    const yarn = yarns[x + startX][y + startY];

    if (color in colorHash) return colorHash[color] === yarn;

    colorHash[color] = yarn;
    return true;
  });
};

export const matchPattern = ({ yarns }, pattern) => {
  const grid = generatePatternGrid(pattern);
  const points = extractPoints(grid);

  const patternHeight = grid.length;
  const patternWidth = grid[0].length;

  const boardHeight = yarns.length;
  const boardWidth = yarns[0].length;

  for (let i = 0; i < boardHeight - patternHeight + 1; i++) {
    for (let j = 0; j < boardWidth - patternWidth + 1; j++) {
      if (matchesAt(yarns, points, i, j)) return true;
    }
  }

  return false;
};
