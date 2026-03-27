# Ettana Board Game – Shuffle Utility

This document describes the shuffle logic used in the Ettana board game along\
with its test cases.

---

## Shuffle Implementation

```js
export const shuffle = (elements, randomFn = Math.random) => {
  const shuffled = [...elements];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(randomFn() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};
```

## Explanation

# Accepts:

- elements: an array of values
- randomFn: optional randomness function (defaults to Math.random)
- Iterates from the end of the array to the beginning Picks a random index j
  between 0 and i Swaps elements at positions i and j

# Ensures:

Uniform randomness (each permutation is equally likely) Does not mutate the
original array (creates a copy)

This is a true shuffle algorithm, unlike comparator-based approaches.

# Tests

```js
import { shuffle } from "../src/shuffle.js";
import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";

describe("Testing shuffle", () => {
  const list = [1, 2, 3, 4];

  it("Shuffle with deterministic randomFn", () => {
    const shuffled = shuffle(list, () => 0);
    assertEquals(shuffled, [2, 3, 4, 1]);
  });
});
```

# Test Behavior

- When `randomFn() always returns 0:`
- j is always 0
- Each iteration swaps the current element with the first element

# Step-by-step:

- [1, 2, 3, 4]
- Swap index 3 with 0 → [4, 2, 3, 1]
- Swap index 2 with 0 → [3, 2, 4, 1]
- Swap index 1 with 0 → [2, 3, 4, 1]
- Final output → [2, 3, 4, 1]

# Summary

- Implements a correct and unbiased shuffle
- Supports deterministic testing via injected randomFn
- Avoids mutating the original array
- Reliable for gameplay randomness in Ettana

_**IF WE WANT, WE CAN USE @std/random FOR MORE ADVANCED RANDOMNESS**_
