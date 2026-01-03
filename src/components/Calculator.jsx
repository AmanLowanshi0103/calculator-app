import { useState } from 'react';
import { calculate, formatExpression } from '../utils/calculator';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);

  const handleNumberClick = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleDecimalClick = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const handleOperatorClick = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      try {
        const result = calculate(previousValue, inputValue, operator);
        const expression = formatExpression(previousValue, operator, inputValue, result);

        setHistory([...history, expression]);
        setDisplay(String(result));
        setPreviousValue(result);
      } catch (error) {
        setDisplay('Error');
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(false);
        return;
      }
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (operator && previousValue !== null) {
      try {
        const result = calculate(previousValue, inputValue, operator);
        const expression = formatExpression(previousValue, operator, inputValue, result);

        setHistory([...history, expression]);
        setDisplay(String(result));
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
      } catch (error) {
        setDisplay('Error');
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(false);
      }
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
  ];

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display" data-testid="display">{display}</div>
        <button className="clear-btn" onClick={handleClear} data-testid="clear">
          Clear
        </button>
        <div className="buttons">
          {buttons.map((btn) => {
            const isOperator = ['/', '*', '-', '+'].includes(btn);
            const isEquals = btn === '=';
            const isDecimal = btn === '.';

            return (
              <button
                key={btn}
                className={`btn ${isOperator ? 'operator' : ''} ${isEquals ? 'equals' : ''}`}
                onClick={() => {
                  if (isEquals) {
                    handleEquals();
                  } else if (isOperator) {
                    handleOperatorClick(btn);
                  } else if (isDecimal) {
                    handleDecimalClick();
                  } else {
                    handleNumberClick(btn);
                  }
                }}
                data-testid={`btn-${btn}`}
              >
                {btn}
              </button>
            );
          })}
        </div>
      </div>

      <div className="history-panel">
        <div className="history-header">
          <h3>History</h3>
          {history.length > 0 && (
            <button
              className="clear-history-btn"
              onClick={handleClearHistory}
              data-testid="clear-history"
            >
              Clear All
            </button>
          )}
        </div>
        <div className="history-list" data-testid="history-list">
          {history.length === 0 ? (
            <p className="no-history">No history yet</p>
          ) : (
            history.map((item, index) => (
              <div key={index} className="history-item" data-testid={`history-item-${index}`}>
                {item}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
