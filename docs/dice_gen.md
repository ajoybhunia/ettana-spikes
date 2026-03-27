# Spike: Dice Generation Logic for Ettana

## Overview

This spike explores dice behavior for the _Ettana_ board game, supporting:

- Fully random dice rolls (color + value)
- Preset color with random value

---

## Core Concept

Each dice has two properties:

- **diceValue** → always random (1–6)
- **diceColor** → random (1–6) or preset via `colorId`

---

## Implementation

### Dice Value

- Generated using a random function
- Ensures values between 1 and 6

```js
const getDiceValue = (randomFn) => Math.floor(randomFn() * 6) + 1;
```

### Dice Color

- If colorId is provided → use it
- Otherwise → generate randomly

```js
const getDiceColor = (colorId, randomFn) => {
  if (colorId === undefined) return Math.floor(randomFn() * 6) + 1;
  return colorId;
};
```

### Final Dice Generator

- Combines both color and value logic
- Allows injecting randomness for testing

```js
export const getDice = (colorId, randomFn = Math.random) => {
  const diceColor = getDiceColor(colorId, randomFn);
  const diceValue = getDiceValue(randomFn);

  return { diceValue, diceColor };
};
```

### Testing Strategy

- Uses a fixed random function for predictability:

```js
(() => 0.5);
```

This results in:

```js
Math.floor(0.5 * 6) + 1 = 4
```

## Learnings

- Separation of concerns between value and color
- Deterministic testing via injected randomness
- Flexible design supporting both random and controlled gameplay
