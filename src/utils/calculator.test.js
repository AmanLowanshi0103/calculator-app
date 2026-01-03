import { calculate, formatExpression } from './calculator';

describe('calculate', () => {
  describe('addition', () => {
    it('should add two positive numbers', () => {
      expect(calculate(5, 3, '+')).toBe(8);
    });

    it('should add negative numbers', () => {
      expect(calculate(-5, -3, '+')).toBe(-8);
    });

    it('should add positive and negative numbers', () => {
      expect(calculate(5, -3, '+')).toBe(2);
    });

    it('should add decimal numbers', () => {
      expect(calculate(1.5, 2.3, '+')).toBeCloseTo(3.8);
    });
  });

  describe('subtraction', () => {
    it('should subtract two positive numbers', () => {
      expect(calculate(5, 3, '-')).toBe(2);
    });

    it('should subtract negative numbers', () => {
      expect(calculate(-5, -3, '-')).toBe(-2);
    });

    it('should subtract resulting in negative', () => {
      expect(calculate(3, 5, '-')).toBe(-2);
    });

    it('should subtract decimal numbers', () => {
      expect(calculate(5.5, 2.2, '-')).toBeCloseTo(3.3);
    });
  });

  describe('multiplication', () => {
    it('should multiply two positive numbers', () => {
      expect(calculate(5, 3, '*')).toBe(15);
    });

    it('should multiply negative numbers', () => {
      expect(calculate(-5, -3, '*')).toBe(15);
    });

    it('should multiply positive and negative numbers', () => {
      expect(calculate(5, -3, '*')).toBe(-15);
    });

    it('should multiply decimal numbers', () => {
      expect(calculate(2.5, 4, '*')).toBe(10);
    });

    it('should multiply by zero', () => {
      expect(calculate(5, 0, '*')).toBe(0);
    });
  });

  describe('division', () => {
    it('should divide two positive numbers', () => {
      expect(calculate(10, 2, '/')).toBe(5);
    });

    it('should divide negative numbers', () => {
      expect(calculate(-10, -2, '/')).toBe(5);
    });

    it('should divide positive and negative numbers', () => {
      expect(calculate(10, -2, '/')).toBe(-5);
    });

    it('should divide decimal numbers', () => {
      expect(calculate(5.5, 2, '/')).toBe(2.75);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => calculate(5, 0, '/')).toThrow('Cannot divide by zero');
    });
  });

  describe('error handling', () => {
    it('should throw error for invalid operator', () => {
      expect(() => calculate(5, 3, '%')).toThrow('Invalid operator');
    });

    it('should throw error for invalid first number', () => {
      expect(() => calculate('abc', 3, '+')).toThrow('Invalid number');
    });

    it('should throw error for invalid second number', () => {
      expect(() => calculate(5, 'xyz', '+')).toThrow('Invalid number');
    });

    it('should throw error for both invalid numbers', () => {
      expect(() => calculate('abc', 'xyz', '+')).toThrow('Invalid number');
    });
  });

  describe('string number inputs', () => {
    it('should handle string numbers for addition', () => {
      expect(calculate('5', '3', '+')).toBe(8);
    });

    it('should handle string numbers for subtraction', () => {
      expect(calculate('10', '4', '-')).toBe(6);
    });

    it('should handle string numbers for multiplication', () => {
      expect(calculate('5', '3', '*')).toBe(15);
    });

    it('should handle string numbers for division', () => {
      expect(calculate('10', '2', '/')).toBe(5);
    });
  });
});

describe('formatExpression', () => {
  it('should format addition expression', () => {
    expect(formatExpression(5, '+', 3, 8)).toBe('5 + 3 = 8');
  });

  it('should format subtraction expression', () => {
    expect(formatExpression(10, '-', 4, 6)).toBe('10 - 4 = 6');
  });

  it('should format multiplication expression', () => {
    expect(formatExpression(5, '*', 3, 15)).toBe('5 * 3 = 15');
  });

  it('should format division expression', () => {
    expect(formatExpression(10, '/', 2, 5)).toBe('10 / 2 = 5');
  });

  it('should format expression with decimal numbers', () => {
    expect(formatExpression(5.5, '+', 2.3, 7.8)).toBe('5.5 + 2.3 = 7.8');
  });

  it('should format expression with negative result', () => {
    expect(formatExpression(3, '-', 5, -2)).toBe('3 - 5 = -2');
  });
});
