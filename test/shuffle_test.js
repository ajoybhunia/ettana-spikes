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
