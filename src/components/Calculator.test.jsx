import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

describe('Calculator Component', () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  describe('Initial render', () => {
    it('should display 0 initially', () => {
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('0');
    });

    it('should render all number buttons', () => {
      for (let i = 0; i <= 9; i++) {
        expect(screen.getByTestId(`btn-${i}`)).toBeInTheDocument();
      }
    });

    it('should render all operator buttons', () => {
      const operators = ['+', '-', '*', '/'];
      operators.forEach(op => {
        expect(screen.getByTestId(`btn-${op}`)).toBeInTheDocument();
      });
    });

    it('should render equals button', () => {
      expect(screen.getByTestId('btn-=')).toBeInTheDocument();
    });

    it('should render decimal button', () => {
      expect(screen.getByTestId('btn-.')).toBeInTheDocument();
    });

    it('should render clear button', () => {
      expect(screen.getByTestId('clear')).toBeInTheDocument();
    });

    it('should show "No history yet" message initially', () => {
      expect(screen.getByText('No history yet')).toBeInTheDocument();
    });

    it('should not show clear history button initially', () => {
      expect(screen.queryByTestId('clear-history')).not.toBeInTheDocument();
    });
  });

  describe('Number input', () => {
    it('should display single digit when clicked', () => {
      const btn5 = screen.getByTestId('btn-5');
      fireEvent.click(btn5);
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('5');
    });

    it('should display multiple digits when clicked', () => {
      fireEvent.click(screen.getByTestId('btn-1'));
      fireEvent.click(screen.getByTestId('btn-2'));
      fireEvent.click(screen.getByTestId('btn-3'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('123');
    });

    it('should replace 0 with first digit', () => {
      fireEvent.click(screen.getByTestId('btn-5'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('5');
      expect(display).not.toHaveTextContent('05');
    });
  });

  describe('Decimal input', () => {
    it('should add decimal point', () => {
      fireEvent.click(screen.getByTestId('btn-5'));
      fireEvent.click(screen.getByTestId('btn-.'));
      fireEvent.click(screen.getByTestId('btn-2'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('5.2');
    });

    it('should not add multiple decimal points', () => {
      fireEvent.click(screen.getByTestId('btn-5'));
      fireEvent.click(screen.getByTestId('btn-.'));
      fireEvent.click(screen.getByTestId('btn-2'));
      fireEvent.click(screen.getByTestId('btn-.'));
      fireEvent.click(screen.getByTestId('btn-3'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('5.23');
    });

    it('should add 0. when decimal is first input', () => {
      fireEvent.click(screen.getByTestId('btn-.'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('0.');
    });
  });

  describe('Basic operations', () => {
    it('should perform addition', () => {
      fireEvent.click(screen.getByTestId('btn-5'));
      fireEvent.click(screen.getByTestId('btn-+'));
      fireEvent.click(screen.getByTestId('btn-3'));
      fireEvent.click(screen.getByTestId('btn-='));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('8');
    });

    it('should perform subtraction', () => {
      fireEvent.click(screen.getByTestId('btn-9'));
      fireEvent.click(screen.getByTestId('btn--'));
      fireEvent.click(screen.getByTestId('btn-4'));
      fireEvent.click(screen.getByTestId('btn-='));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('5');
    });

    it('should perform multiplication', () => {
      fireEvent.click(screen.getByTestId('btn-6'));
      fireEvent.click(screen.getByTestId('btn-*'));
      fireEvent.click(screen.getByTestId('btn-7'));
      fireEvent.click(screen.getByTestId('btn-='));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('42');
    });

    it('should perform division', () => {
      fireEvent.click(screen.getByTestId('btn-8'));
      fireEvent.click(screen.getByTestId('btn-/'));
      fireEvent.click(screen.getByTestId('btn-2'));
      fireEvent.click(screen.getByTestId('btn-='));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('4');
    });
  });

  describe('Chain operations', () => {
    it('should chain multiple operations', () => {
      fireEvent.click(screen.getByTestId('btn-5'));
      fireEvent.click(screen.getByTestId('btn-+'));
      fireEvent.click(screen.getByTestId('btn-3'));
      fireEvent.click(screen.getByTestId('btn-*'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('8');
    });

    it('should continue calculation after equals', () => {
      fireEvent.click(screen.getByTestId('btn-5'));
      fireEvent.click(screen.getByTestId('btn-+'));
      fireEvent.click(screen.getByTestId('btn-3'));
      fireEvent.click(screen.getByTestId('btn-='));
      fireEvent.click(screen.getByTestId('btn-*'));
      fireEvent.click(screen.getByTestId('btn-2'));
      fireEvent.click(screen.getByTestId('btn-='));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('16');
    });
  });

  describe('Clear functionality', () => {
    it('should clear display to 0', () => {
      fireEvent.click(screen.getByTestId('btn-5'));
      fireEvent.click(screen.getByTestId('btn-3'));
      fireEvent.click(screen.getByTestId('clear'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('0');
    });

    it('should clear operation in progress', () => {
      fireEvent.click(screen.getByTestId('btn-5'));
      fireEvent.click(screen.getByTestId('btn-+'));
      fireEvent.click(screen.getByTestId('btn-3'));
      fireEvent.click(screen.getByTestId('clear'));
      fireEvent.click(screen.getByTestId('btn-2'));
      fireEvent.click(screen.getByTestId('btn-='));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('2');
    });
  });

  describe('Error handling', () => {
    it('should display Error when dividing by zero', () => {
      fireEvent.click(screen.getByTestId('btn-5'));
      fireEvent.click(screen.getByTestId('btn-/'));
      fireEvent.click(screen.getByTestId('btn-0'));
      fireEvent.click(screen.getByTestId('btn-='));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('Error');
    });

    it('should recover from error state', () => {
      fireEvent.click(screen.getByTestId('btn-5'));
      fireEvent.click(screen.getByTestId('btn-/'));
      fireEvent.click(screen.getByTestId('btn-0'));
      fireEvent.click(screen.getByTestId('btn-='));
      fireEvent.click(screen.getByTestId('clear'));
      fireEvent.click(screen.getByTestId('btn-3'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('3');
    });
  });

  describe('History functionality', () => {
    it('should add calculation to history after equals', () => {
      fireEvent.click(screen.getByTestId('btn-5'));
      fireEvent.click(screen.getByTestId('btn-+'));
      fireEvent.click(screen.getByTestId('btn-3'));
      fireEvent.click(screen.getByTestId('btn-='));

      const historyItem = screen.getByTestId('history-item-0');
      expect(historyItem).toHaveTextContent('5 + 3 = 8');
    });

    it('should add multiple calculations to history', () => {
      fireEvent.click(screen.getByTestId('btn-5'));
      fireEvent.click(screen.getByTestId('btn-+'));
      fireEvent.click(screen.getByTestId('btn-3'));
      fireEvent.click(screen.getByTestId('btn-='));

      fireEvent.click(screen.getByTestId('btn-*'));
      fireEvent.click(screen.getByTestId('btn-2'));
      fireEvent.click(screen.getByTestId('btn-='));

      expect(screen.getByTestId('history-item-0')).toHaveTextContent('5 + 3 = 8');
      expect(screen.getByTestId('history-item-1')).toHaveTextContent('8 * 2 = 16');
    });

    it('should show clear history button when history exists', () => {
      fireEvent.click(screen.getByTestId('btn-2'));
      fireEvent.click(screen.getByTestId('btn-+'));
      fireEvent.click(screen.getByTestId('btn-3'));
      fireEvent.click(screen.getByTestId('btn-='));

      expect(screen.getByTestId('clear-history')).toBeInTheDocument();
    });

    it('should add chained calculations to history', () => {
      fireEvent.click(screen.getByTestId('btn-5'));
      fireEvent.click(screen.getByTestId('btn-+'));
      fireEvent.click(screen.getByTestId('btn-3'));
      fireEvent.click(screen.getByTestId('btn-*'));

      expect(screen.getByTestId('history-item-0')).toHaveTextContent('5 + 3 = 8');
    });
  });

  describe('Clear history functionality', () => {
    it('should clear all history when clear history button is clicked', () => {
      fireEvent.click(screen.getByTestId('btn-5'));
      fireEvent.click(screen.getByTestId('btn-+'));
      fireEvent.click(screen.getByTestId('btn-3'));
      fireEvent.click(screen.getByTestId('btn-='));

      fireEvent.click(screen.getByTestId('btn-2'));
      fireEvent.click(screen.getByTestId('btn-*'));
      fireEvent.click(screen.getByTestId('btn-4'));
      fireEvent.click(screen.getByTestId('btn-='));

      expect(screen.getByTestId('history-item-0')).toBeInTheDocument();
      expect(screen.getByTestId('history-item-1')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('clear-history'));

      expect(screen.queryByTestId('history-item-0')).not.toBeInTheDocument();
      expect(screen.queryByTestId('history-item-1')).not.toBeInTheDocument();
      expect(screen.getByText('No history yet')).toBeInTheDocument();
    });

    it('should hide clear history button after clearing', () => {
      fireEvent.click(screen.getByTestId('btn-5'));
      fireEvent.click(screen.getByTestId('btn-+'));
      fireEvent.click(screen.getByTestId('btn-3'));
      fireEvent.click(screen.getByTestId('btn-='));

      fireEvent.click(screen.getByTestId('clear-history'));

      expect(screen.queryByTestId('clear-history')).not.toBeInTheDocument();
    });

    it('should not affect calculator state when clearing history', () => {
      fireEvent.click(screen.getByTestId('btn-5'));
      fireEvent.click(screen.getByTestId('btn-+'));
      fireEvent.click(screen.getByTestId('btn-3'));
      fireEvent.click(screen.getByTestId('btn-='));

      const displayBeforeClear = screen.getByTestId('display').textContent;

      fireEvent.click(screen.getByTestId('clear-history'));

      const displayAfterClear = screen.getByTestId('display').textContent;
      expect(displayAfterClear).toBe(displayBeforeClear);
    });
  });

  describe('Decimal operations', () => {
    it('should handle decimal addition', () => {
      fireEvent.click(screen.getByTestId('btn-1'));
      fireEvent.click(screen.getByTestId('btn-.'));
      fireEvent.click(screen.getByTestId('btn-5'));
      fireEvent.click(screen.getByTestId('btn-+'));
      fireEvent.click(screen.getByTestId('btn-2'));
      fireEvent.click(screen.getByTestId('btn-.'));
      fireEvent.click(screen.getByTestId('btn-3'));
      fireEvent.click(screen.getByTestId('btn-='));

      const display = screen.getByTestId('display');
      expect(display.textContent).toMatch(/3\.8/);
    });

    it('should handle decimal multiplication', () => {
      fireEvent.click(screen.getByTestId('btn-2'));
      fireEvent.click(screen.getByTestId('btn-.'));
      fireEvent.click(screen.getByTestId('btn-5'));
      fireEvent.click(screen.getByTestId('btn-*'));
      fireEvent.click(screen.getByTestId('btn-4'));
      fireEvent.click(screen.getByTestId('btn-='));

      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('10');
    });
  });
});
