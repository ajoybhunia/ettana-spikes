const normalize = (pattern) => {
  const minX = Math.min(...pattern.map((p) => p.coord.x));
  const minY = Math.min(...pattern.map((p) => p.coord.y));

  return pattern.map((p) => ({
    x: p.coord.x - minX,
    y: p.coord.y - minY,
    color: p.color,
  }));
};

const rotatePoints = (points) => {
  const rotated = points.map(({ x, y, color }) => ({
    x: y,
    y: -x,
    color,
  }));

  const minX = Math.min(...rotated.map((p) => p.x));
  const minY = Math.min(...rotated.map((p) => p.y));

  return rotated.map((p) => ({
    x: p.x - minX,
    y: p.y - minY,
    color: p.color,
  }));
};

const matchesAt = (yarns, points, offsetX, offsetY) => {
  const colorToYarn = {};
  const yarnToColor = {};
  const coords = [];

  for (const { x, y, color } of points) {
    const boardX = x + offsetX;
    const boardY = y + offsetY;
    const yarn = yarns[boardX][boardY];

    if (color in colorToYarn) {
      if (colorToYarn[color] !== yarn) return null;
    } else {
      colorToYarn[color] = yarn;
    }

    if (yarn in yarnToColor) {
      if (yarnToColor[yarn] !== color) return null;
    } else {
      yarnToColor[yarn] = color;
    }

    coords.push({ x: boardX, y: boardY });
  }

  return coords;
};

export const matchPattern = ({ yarns }, pattern) => {
  let points = normalize(pattern);

  const boardHeight = yarns.length;
  const boardWidth = yarns[0].length;

  for (let r = 0; r < 4; r++) {
    const maxX = Math.max(...points.map((p) => p.x));
    const maxY = Math.max(...points.map((p) => p.y));

    for (let i = 0; i < boardHeight - maxX; i++) {
      for (let j = 0; j < boardWidth - maxY; j++) {
        const result = matchesAt(yarns, points, i, j);
        if (result) return result;
      }
    }

    points = rotatePoints(points);
  }

  return false;
};
