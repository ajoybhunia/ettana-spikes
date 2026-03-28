import { matchPattern } from "../src/pattern_match.js";
import { assertEquals } from "@std/assert";
import { beforeAll, describe, it } from "@std/testing/bdd";

describe("matchPattern", () => {
  let board;

  beforeAll(() => {
    board = {
      yarns: [
        [2, 1, 1, 1, 1],
        [2, 3, 2, 2, 2],
        [3, 3, 1, 3, 3],
        [4, 4, 4, 3, 1],
        [5, 5, 1, 5, 5],
      ],
      tiles: [
        [
          { value: 0, pinId: null },
          { value: 1, pinId: null },
          { value: 2, pinId: null },
          { value: 3, pinId: null },
          { value: 4, pinId: null },
          { value: 0, pinId: null },
        ],
        [
          { value: 0, pinId: null },
          { value: 5, pinId: null },
          { value: 6, pinId: null },
          { value: 1, pinId: null },
          { value: 2, pinId: null },
          { value: 0, pinId: null },
        ],
        [
          { value: 0, pinId: null },
          { value: 3, pinId: null },
          { value: 4, pinId: null },
          { value: 5, pinId: null },
          { value: 6, pinId: null },
          { value: 0, pinId: null },
        ],
        [
          { value: 0, pinId: null },
          { value: 1, pinId: null },
          { value: 2, pinId: null },
          { value: 3, pinId: null },
          { value: 4, pinId: null },
          { value: 0, pinId: null },
        ],
        [
          { value: 0, pinId: null },
          { value: 5, pinId: null },
          { value: 6, pinId: null },
          { value: 1, pinId: null },
          { value: 2, pinId: null },
          { value: 0, pinId: null },
        ],
        [
          { value: 0, pinId: null },
          { value: 3, pinId: null },
          { value: 4, pinId: null },
          { value: 5, pinId: null },
          { value: 6, pinId: null },
          { value: 0, pinId: null },
        ],
      ],
    };
  });

  it("should match a horizontal pattern of same colors", () => {
    const pattern = [
      { coord: { x: 0, y: 0 }, color: 1 },
      { coord: { x: 0, y: 1 }, color: 1 },
      { coord: { x: 0, y: 2 }, color: 1 },
    ];
    assertEquals(matchPattern(board, pattern), true);
  });

  it("should not match if pattern does not exist", () => {
    const nonMatchingPattern = [
      { coord: { x: 0, y: 0 }, color: 1 },
      { coord: { x: 1, y: 0 }, color: 1 },
      { coord: { x: 2, y: 0 }, color: 1 },
    ];

    assertEquals(matchPattern(board, nonMatchingPattern), false);
  });

  it("should match pattern after translation", () => {
    const shiftedPattern = [
      { coord: { x: 2, y: 0 }, color: 1 },
      { coord: { x: 2, y: 1 }, color: 2 },
      { coord: { x: 2, y: 2 }, color: 1 },
    ];

    assertEquals(matchPattern(board, shiftedPattern), true);
  });

  it("should allow different pattern colors to map to different yarns", () => {
    const multiColorPattern = [
      { coord: { x: 0, y: 0 }, color: 1 },
      { coord: { x: 0, y: 1 }, color: 2 },
      { coord: { x: 0, y: 2 }, color: 3 },
    ];

    assertEquals(matchPattern(board, multiColorPattern), true);
  });

  it("should match single-point pattern", () => {
    const singlePointPattern = [
      { coord: { x: 0, y: 0 }, color: 1 },
    ];

    assertEquals(matchPattern(board, singlePointPattern), true);
  });

  it("should fail when pattern goes out of bounds after translation", () => {
    const largePattern = [
      { coord: { x: 0, y: 0 }, color: 1 },
      { coord: { x: 0, y: 1 }, color: 1 },
      { coord: { x: 0, y: 2 }, color: 1 },
      { coord: { x: 0, y: 3 }, color: 1 },
      { coord: { x: 0, y: 4 }, color: 1 },
      { coord: { x: 0, y: 5 }, color: 1 },
    ];

    assertEquals(matchPattern(board, largePattern), false);
  });

  it("should match vertical pattern if present", () => {
    const verticalPattern = [
      { coord: { x: 0, y: 0 }, color: 1 },
      { coord: { x: 1, y: 0 }, color: 1 },
      { coord: { x: 2, y: 0 }, color: 1 },
    ];

    assertEquals(matchPattern(board, verticalPattern), false);
  });

  it("should match a pattern that present before the actual design coordinate", () => {
    const pattern = [
      { coord: { x: 4, y: 0 }, color: 1 },
      { coord: { x: 4, y: 1 }, color: 1 },
      { coord: { x: 4, y: 2 }, color: 1 },
      { coord: { x: 4, y: 3 }, color: 1 },
    ];

    assertEquals(matchPattern(board, pattern), true);
  });
});
