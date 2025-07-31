let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let shouldResetScreen = false;

const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');

numberButtons.forEach(button =>
  button.addEventListener('click', () => appendNumber(button.textContent))
);

operatorButtons.forEach(button =>
  button.addEventListener('click', () => setOperator(button.textContent))
);

equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);

function appendNumber(number) {
  if (display.textContent === '0' || shouldResetScreen) resetScreen();
  if (number === '.' && display.textContent.includes('.')) return;
  if (display.textContent === '' && number === '.') display.textContent = '0';
  if (display.textContent.length >= 10) return;

  display.textContent += number;

}

function resetScreen() {
  display.textContent = '';
  shouldResetScreen = false;
}

function clear() {
  display.textContent = '0';
  firstOperand = '';
  secondOperand = '';
  currentOperator = null;
  shouldResetScreen = false;
}

function deleteNumber() {
  display.textContent = display.textContent.toString().slice(0, -1);
  if (display.textContent === '') display.textContent = '0';
}

function setOperator(operator) {
  if (currentOperator !== null) evaluate();
  firstOperand = display.textContent;
  currentOperator = operator;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetScreen) return;
  secondOperand = display.textContent;
  const result = operate(currentOperator, firstOperand, secondOperand);
  display.textContent = roundResult(result);
  currentOperator = null;
}

function roundResult(number) {
  if (typeof number === 'string') return number;
  return Math.round(number * 1000) / 1000;
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '÷': return a / b;
    case '%': return a % b;
  }
}
