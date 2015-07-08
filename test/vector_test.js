import Vector from "../src/vector";
import assert from "assert";

describe("Vector", () => {
  it("returns the same Vector when added to (0, 0)", () => {
    let a = new Vector(1, 2),
        b = new Vector(0, 0),
        c = a.add(b);

    assert.equal(a.x, c.x);
    assert.equal(a.y, c.y);
  });

  it("returns the same Vector when subtracted from (0, 0)", () => {
    let a = new Vector(1, 2),
        b = new Vector(0, 0),
        c = a.subtract(b);

    assert.equal(a.x, c.x);
    assert.equal(a.y, c.y);
  });

  it("can determine if it's over a line formed by two other Vectors", () => {
    let a = new Vector(0, 0),
        b = new Vector(1, 0),
        c = new Vector(0, 1);

    assert.equal(0.0, a.distanceToLine(b, c));
  });
});
