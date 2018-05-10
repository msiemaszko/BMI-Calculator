/* lib.js */

const PI = 3.141592;

function double(x) {
  return x * 2;
}

class Robot {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log("TEST: " + this.name);
  }
}

export { PI, double, Robot };
