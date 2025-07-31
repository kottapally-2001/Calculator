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


deleteButton.addEventListener('click', deleteNumber);

function deleteNumber() {
  display.textContent = display.textContent.toString().slice(0, -1);
  if (display.textContent === '') display.textContent = '0';
}

numberButtons.forEach(button =>
  button.addEventListener('click', () => appendNumber(button.textContent))
);

operatorButtons.forEach(button =>
  button.addEventListener('click', () => setOperator(button.textContent))
);

equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);

function appendNumber(number) {
  if (display.textContent === '0' || shouldResetScreen) {
    resetScreen();
  }
  display.textContent += number;
  if (display.textContent.length > 10) {
    display.textContent = display.textContent.slice(10);
  }
  else {
    display.textContent += number;
  }
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

function setOperator(operator) {
  if (currentOperator !== null) evaluate();
  firstOperand = display.textContent;
  currentOperator = operator;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetScreen) return;
  secondOperand = display.textContent;
  let result = operate(currentOperator, firstOperand, secondOperand);
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
    case '.':
      if (a === 0) return b;
      if (b === 0) return a;
      return `${a}.${b}`;
}
}