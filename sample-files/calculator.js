// Simple Calculator Class for Testing
class Calculator {
  constructor() {
    this.result = 0;
  }

  add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers');
    }
    return a + b;
  }

  subtract(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers');
    }
    return a - b;
  }

  multiply(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers');
    }
    return a * b;
  }

  divide(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers');
    }
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  }

  power(base, exponent) {
    if (typeof base !== 'number' || typeof exponent !== 'number') {
      throw new Error('Both arguments must be numbers');
    }
    return Math.pow(base, exponent);
  }

  sqrt(num) {
    if (typeof num !== 'number') {
      throw new Error('Argument must be a number');
    }
    if (num < 0) {
      throw new Error('Cannot calculate square root of negative number');
    }
    return Math.sqrt(num);
  }

  factorial(n) {
    if (typeof n !== 'number' || !Number.isInteger(n)) {
      throw new Error('Argument must be an integer');
    }
    if (n < 0) {
      throw new Error('Factorial is not defined for negative numbers');
    }
    if (n === 0 || n === 1) {
      return 1;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  percentage(value, total) {
    if (typeof value !== 'number' || typeof total !== 'number') {
      throw new Error('Both arguments must be numbers');
    }
    if (total === 0) {
      throw new Error('Total cannot be zero');
    }
    return (value / total) * 100;
  }

  reset() {
    this.result = 0;
  }

  chainAdd(value) {
    if (typeof value !== 'number') {
      throw new Error('Argument must be a number');
    }
    this.result += value;
    return this;
  }

  chainSubtract(value) {
    if (typeof value !== 'number') {
      throw new Error('Argument must be a number');
    }
    this.result -= value;
    return this;
  }

  getResult() {
    return this.result;
  }
}

// Export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Calculator;
}

// Example usage
const calc = new Calculator();
console.log('5 + 3 =', calc.add(5, 3));
console.log('10 - 4 =', calc.subtract(10, 4));
console.log('6 * 7 =', calc.multiply(6, 7));
console.log('15 / 3 =', calc.divide(15, 3));
console.log('2^8 =', calc.power(2, 8));
console.log('√16 =', calc.sqrt(16));
console.log('5! =', calc.factorial(5));
console.log('25% of 200 =', calc.percentage(25, 100) * 200 / 100);

// Chain operations
calc.reset();
const chainResult = calc.chainAdd(10).chainSubtract(3).chainAdd(5).getResult();
console.log('Chain: 10 + (-3) + 5 =', chainResult);
