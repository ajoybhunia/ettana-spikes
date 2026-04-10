const createGrid = (rows, cols) =>
  Array.from({ length: rows }, () => Array(cols).fill(null));

const getCount = (freq, val) => freq.get(val) || 0;

const inc = (freq, val) => freq.set(val, getCount(freq, val) + 1);
const dec = (freq, val) => freq.set(val, getCount(freq, val) - 1);

const canPlace = (grid, freq, row, col, val, maxTime) => {
  const top = row > 0 ? grid[row - 1][col] : null;
  const left = col > 0 ? grid[row][col - 1] : null;

  return (
    getCount(freq, val) < maxTime &&
    val !== top &&
    val !== left
  );
};

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const satisfiesMin = (freq, values, minTime = 0) =>
  values.every((v) => getCount(freq, v) >= minTime);

const solve = (grid, freq, config, row = 0, col = 0) => {
  const { rows, cols, values, maxTime } = config;

  if (row === rows) return true;

  const nextRow = col === cols - 1 ? row + 1 : row;
  const nextCol = col === cols - 1 ? 0 : col + 1;

  for (const val of shuffle(values)) {
    if (!canPlace(grid, freq, row, col, val, maxTime)) continue;

    grid[row][col] = val;
    inc(freq, val);

    if (solve(grid, freq, config, nextRow, nextCol)) return true;

    grid[row][col] = null;
    dec(freq, val);
  }

  return false;
};

export const generateGrid = (config) => {
  const { rows, cols, values, minTime = 0 } = config;

  while (true) {
    const grid = createGrid(rows, cols);
    const freq = new Map();

    if (!solve(grid, freq, config)) continue;
    if (!satisfiesMin(freq, values, minTime)) continue;

    return { grid, freq };
  }
};

const yarnConfig = {
  rows: 5,
  cols: 5,
  values: [1, 2, 3, 4, 5],
  maxTime: 5,
};

console.log(generateGrid(yarnConfig));

const tileConfig = {
  rows: 4,
  cols: 4,
  values: [1, 2, 3, 4, 5, 6],
  maxTime: 3,
  minTime: 2,
};

console.log(generateGrid(tileConfig));
