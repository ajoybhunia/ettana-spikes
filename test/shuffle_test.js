import { shuffle } from "../src/shuffle.js";
import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";

describe("Testing shuffle", () => {
  const list = [1, 2, 3, 4];

  it("Shuffle", () => {
    const shuffled = shuffle(list, () => 0);
    assertEquals(shuffled, [2, 3, 4, 1]);
  });
});
