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
      return new Vector(this.x + s.x, this.y + s.y);
    }
  }, {
    key: "product",
    value: function product(v) {
      return new Vector(this.x * v.x, this.y * v.y);
    }
  }, {
    key: "productScalar",
    value: function productScalar(s) {
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
  }]);

  return Vector;
})();

exports["default"] = Vector;
module.exports = exports["default"];