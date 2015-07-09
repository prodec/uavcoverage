"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = (function () {
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
  }

  _createClass(Vector, [{
    key: "add",
    value: function add(v) {
      return new Vector(this.x + v.x, this.y + v.y);
    }
  }, {
    key: "subtract",
    value: function subtract(v) {
      return new Vector(this.x - v.x, this.y - v.y);
    }
  }, {
    key: "multiply",
    value: function multiply(v) {
      return this.x * v.x + this.y * v.y;
    }
  }, {
    key: "multiplyScalar",
    value: function multiplyScalar(s) {
      return new Vector(this.x * s, this.y * s);
    }
  }, {
    key: "divide",
    value: function divide(v) {
      return new Vector(this.x / v.x, this.y / v.y);
    }
  }, {
    key: "divideScalar",
    value: function divideScalar(s) {
      return new Vector(this.x / s, this.y / s);
    }
  }, {
    key: "crossProduct",
    value: function crossProduct(v) {
      return new Vector(this.x * v.y, this.y * v.x);
    }
  }, {
    key: "norm",
    value: function norm() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var n = norm();

      return n > 0 ? this.divideScalar(n) : this;
    }
  }, {
    key: "distanceToLine",
    value: function distanceToLine(v0, v1) {
      var ref = this.subtract(v0),
          refLength = ref.norm();

      if (refLength == 0.0) {
        return { distance: 0.0, angle: 0.0 };
      }

      var a = v1.subtract(v0),
          b = ref.divideScalar(refLength),
          na = a.norm(),
          cosAng = a.divideScalar(na).multiply(b),
          dist = refLength * Math.sqrt(Math.abs(1.0 - cosAng * cosAng)),
          ang = cosAng * refLength / na;

      return { distance: dist, angle: ang };
    }
  }, {
    key: "toString",
    value: function toString() {
      return "(`this.x`, `this.y`)";
    }
  }]);

  return Vector;
})();

exports["default"] = Vector;
module.exports = exports["default"];