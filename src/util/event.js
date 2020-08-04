// eventProxy.js

const eventProxy = {
  onObj: {},
  oneObj: {},
  $on: function (key, fn) {
    if (this.onObj[key] === undefined) {
      this.onObj[key] = [];
    }

    this.onObj[key].push(fn);
  },
  once: function (key, fn) {
    if (this.oneObj[key] === undefined) {
      this.oneObj[key] = [];
    }

    this.oneObj[key].push(fn);
  },
  off: function (key) {
    this.onObj[key] = [];
    this.oneObj[key] = [];
  },
  $emit: function () {
    if (arguments.length === 0) {
      return false;
    }
    const key = arguments[0];
    const args = [].concat(Array.prototype.slice.call(arguments, 1));

    if (this.onObj[key] !== undefined &&
      this.onObj[key].length > 0) {
      for (const i in this.onObj[key]) {
        this.onObj[key][i].apply(null, args);
      }
    }
    if (this.oneObj[key] !== undefined &&
      this.oneObj[key].length > 0) {
      for (const i in this.oneObj[key]) {
        this.oneObj[key][i].apply(null, args);
        this.oneObj[key][i] = undefined;
      }
      this.oneObj[key] = [];
    }
  }
};

export default eventProxy;
