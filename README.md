# Calculator App

A modern, fully-functional calculator built with React and Vite, featuring calculation history tracking and comprehensive test coverage using Jest.

## Features

- **Basic Operations**: Addition, subtraction, multiplication, and division
- **Decimal Support**: Handle decimal numbers in calculations
- **Calculation History**: Automatically saves all calculations performed
- **Clear History**: Remove all calculation history with a single click
- **Error Handling**: Graceful error handling (e.g., division by zero)
- **Responsive Design**: Beautiful gradient UI that works on all screen sizes
- **Comprehensive Testing**: 65 passing tests with Jest and React Testing Library

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd calculator-app
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Running Tests

### Run all tests:
```bash
npm test
```

### Run tests in watch mode:
```bash
npm run test:watch
```

### Run tests with coverage:
```bash
npm run test:coverage
```

## Project Structure

```
calculator-app/
├── src/
│   ├── components/
│   │   ├── Calculator.jsx        # Main calculator component
│   │   ├── Calculator.css         # Calculator styles
│   │   └── Calculator.test.jsx    # Calculator component tests
│   ├── utils/
│   │   ├── calculator.js          # Calculator logic
│   │   └── calculator.test.js     # Calculator logic tests
│   ├── App.jsx                    # Root component
│   ├── App.css                    # App styles
│   ├── index.css                  # Global styles
│   ├── main.jsx                   # App entry point
│   └── setupTests.js              # Test setup configuration
├── jest.config.js                 # Jest configuration
├── babel.config.js                # Babel configuration
├── vite.config.js                 # Vite configuration
└── package.json                   # Project dependencies
```

## How to Use

1. **Enter Numbers**: Click on number buttons (0-9) to input values
2. **Decimal Points**: Click the "." button to add decimal points
3. **Operations**: Click +, -, *, or / to perform calculations
4. **Equals**: Click "=" to get the result
5. **Clear**: Click "Clear" button to reset the calculator
6. **View History**: All calculations appear in the history panel on the right
7. **Clear History**: Click "Clear All" button in the history panel to remove all history

## Test Coverage

The application includes comprehensive test coverage:

- **Calculator Logic Tests** (src/utils/calculator.test.js):
  - Addition, subtraction, multiplication, and division
  - Decimal number operations
  - Error handling (division by zero, invalid inputs)
  - String number parsing
  - Expression formatting

- **Component Tests** (src/components/Calculator.test.jsx):
  - Initial render state
  - Number and decimal input
  - Basic operations
  - Chained operations
  - Clear functionality
  - Error handling and recovery
  - History tracking
  - Clear history functionality

All 65 tests passing ✓

## Technologies Used

- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **Jest 30.2.0** - Testing framework
- **React Testing Library** - Component testing utilities
- **Babel** - JavaScript compiler for Jest
- **CSS3** - Styling with gradients and modern features

## License

This project is open source and available for educational purposes.
