import { getDice } from "../src/preset.js";
import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";

describe("Testing getDice", () => {
  it("Getting dice color and value when no preset happens", () => {
    const dice = getDice(undefined, () => 0.5);
    assertEquals(dice, { diceValue: 4, diceColor: 4 });
  });

  it("Getting dice color and value with preset", () => {
    const dice = getDice(2, () => 0.5);
    assertEquals(dice, { diceValue: 4, diceColor: 2 });
  });
});
