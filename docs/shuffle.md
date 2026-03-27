# Ettana Board Game – Shuffle Utility

This document describes the shuffle logic used in the Ettana board game along
with its test cases.

---

## Shuffle Implementation

```js
export const shuffle = (elements, randomFn = Math.random) =>
  elements.toSorted((a, b) => randomFn() <= 0.5 ? a - b : b - a);
```

### Explanation

- Accepts:

  - `elements`: an array of values
  - `randomFn`: optional randomness function (defaults to `Math.random`)
- Uses `.toSorted()` with a comparator:

  - If `randomFn() <= 0.5` → sorts **ascending**
  - If `randomFn() > 0.5` → sorts **descending**

> This is not a true shuffle. It only switches between ascending and descending
> order.

---

## Tests

```js
import { shuffle } from "../src/shuffle.js";
import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";

describe("Testing shuffle", () => {
  const list = [1, 3, 4, 2];

  it("Shuffle in ascending order", () => {
    const shuffled = shuffle(list, () => 0.4);
    assertEquals(shuffled, [1, 2, 3, 4]);
  });

  it("Shuffle in descending order", () => {
    const shuffled = shuffle(list, () => 0.6);
    assertEquals(shuffled, [4, 3, 2, 1]);
  });
});
```

---

## Test Behavior

- When `randomFn()` returns `0.4` (≤ 0.5):

  - Output → `[1, 2, 3, 4]` (ascending)

- When `randomFn()` returns `0.6` (> 0.5):

  - Output → `[4, 3, 2, 1]` (descending)

---

## Summary

- Deterministic behavior when injecting `randomFn`
- Simple and testable design
- Suitable for controlled randomness in Ettana gameplay

---

**IF WE WANT, WE CAN USE JSR:@STD/RANDOM**
