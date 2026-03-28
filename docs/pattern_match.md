# Ettana Board Game – Pattern Matching Spike

## Objective

Evaluate methods for detecting whether a **pattern exists within a 2D yarn
grid** in the Ettana board game. The solution must support:

- Translation across the board
- Rotation (0°, 90°, 180°, 270°)
- Flexible color mapping between pattern and board yarns

---

## Key Rules

- **Translation:** Patterns can appear anywhere within board bounds.
- **Rotation:** Patterns can be rotated in 90° increments.
- **Color Mapping:**
  - Same pattern color → must map to the same yarn value
  - Different pattern colors → must map to different yarn values
- **Invalid Patterns:**
  - Exceed board boundaries
  - Have inconsistent color mapping

---

## Approaches

### 1. Coordinate Translation (Pattern-Based)

- Normalize pattern to origin `(0,0)`
- Generate all translated variations within a fixed board size
- Compare each variation directly to the board

**Pros:** Simple, straightforward to implement and debug\
**Cons:**

- Hardcoded board size
- Does not support rotation
- Generates redundant variations

### 2. Grid + Sliding Window + Rotation

- Convert pattern into a 2D grid representation
- Extract non-null points for matching
- Slide the pattern grid over the board to check for matches using a `colorHash`
- Apply rotations (0°, 90°, 180°, 270°) and repeat matching

**Pros:**

- Supports translation and rotation
- Scales to any board size
- Clean, maintainable, and efficient

**Cons:** Slightly more complex logic compared to pattern-based approach

---

## Core Matching Logic

```js
if (color in colorHash) {
  return colorHash[color] === yarn;
}
colorHash[color] = yarn;
```
