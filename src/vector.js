class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    return new Vector(this.x + s.x, this.y + s.y);
  }

  product(v) {
    return new Vector(this.x * v.x, this.y * v.y);
  }

  productScalar(s) {
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
}

export default Vector;
