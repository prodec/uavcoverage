class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  subtract(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  multiply(v) {
    return (this.x * v.x) + (this.y * v.y);
  }

  multiplyScalar(s) {
    return new Vector(this.x * s, this.y * s);
  }

  divide(v) {
    return new Vector(this.x / v.x, this.y / v.y);
  }

  divideScalar(s) {
    return new Vector(this.x / s, this.y / s);
  }

  crossProduct(v) {
    return new Vector(this.x * v.y, this.y * v.x);
  }

  norm() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    let n = this.norm();

    return (n > 0 ? this.divideScalar(n) : this);
  }

  distanceToLine(v0, v1) {
    let ref = this.subtract(v0),
        refLength = ref.norm();

    if (refLength == 0.0) {
      return { distance: 0.0, angle: 0.0 };
    }

    let a = v1.subtract(v0),
        b = ref.divideScalar(refLength),
        na = a.norm(),
        cosAng = a.divideScalar(na).multiply(b),
        dist = refLength * Math.sqrt(Math.abs(1.0 - cosAng * cosAng)),
        ang  = (cosAng * refLength) / na;

    return { distance: dist, angle: ang };
  }

  toString() {
    return "(`this.x`, `this.y`)";
  }

  toArray() {
    return [this.x, this.y];
  }
}

export default Vector;
