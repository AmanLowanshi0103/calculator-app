export const calculate = (num1, num2, operator) => {
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  if (isNaN(n1) || isNaN(n2)) {
    throw new Error('Invalid number');
  }

  switch (operator) {
    case '+':
      return n1 + n2;
    case '-':
      return n1 - n2;
    case '*':
      return n1 * n2;
    case '/':
      if (n2 === 0) {
        throw new Error('Cannot divide by zero');
      }
      return n1 / n2;
    default:
      throw new Error('Invalid operator');
  }
};

export const formatExpression = (num1, operator, num2, result) => {
  return `${num1} ${operator} ${num2} = ${result}`;
};
