const input = document.getElementById('input');
const button = document.querySelectorAll('.btn');
const customTip = document.getElementById('customTip');
const error = document.getElementById('error');
const people = document.getElementById('people');
const totalVal = document.querySelectorAll('.tipValue');
const reset = document.querySelector('.reset');
const generateBill = document.querySelector('.generateBill');
const incrementBtn = document.querySelector('.increment');
const decrementBtn = document.querySelector('.decrement');
const setValueToZeroBtn = document.querySelector('.setToZero');

let billVal = 0;
let peopleVal = 1;
let tipVal = 0.15;

input.addEventListener('input', validateBill);
customTip.addEventListener('input', tipCustomVal);
reset.addEventListener('click', handleReset);
generateBill.addEventListener('click', calculate);

button.forEach(btn => {
  btn.addEventListener('click', handleClick);
});

incrementBtn.addEventListener('click', increment);
decrementBtn.addEventListener('click', decrement);
setValueToZeroBtn.addEventListener('click', setValueToZero);

function enableResetButton() {
  reset.style.backgroundColor = '#FFFFFF';
  reset.style.color = '#9C60FF';
}

function disableResetButton() {
  reset.style.backgroundColor = '#C39FFF';
  reset.style.color = '#9C60FF';
}

function validateBill() {
  if (input.value.includes(',')) {
    input.value = input.value.replace(',', '.');
  }
  billVal = parseFloat(input.value);
  updateGenerateButton();
  updateGenerateButtonStyle();
}

function handleClick(event) {
  button.forEach(btn => {
    btn.classList.remove('active');
    if (event.target.innerHTML === btn.innerHTML) {
      btn.classList.add('active');
      tipVal = parseFloat(btn.innerHTML) / 100;
      customTip.value = '';
    }
  });
  updateGenerateButton();
}

function tipCustomVal() {
  tipVal = parseFloat(customTip.value) / 100;
  button.forEach(btn => {
    btn.classList.remove('active');
  });
  updateGenerateButton();
}

function updatePeopleVal() {
  peopleVal = parseFloat(people.value);
  if (peopleVal <= 0) {
    error.innerHTML = 'ERROR: Number must be greater than zero';
    setTimeout(function () {
      error.innerHTML = '';
    }, 2000);
  }
  updateGenerateButton();
  updateGenerateButtonStyle();
}

function updateGenerateButton() {
  generateBill.disabled = billVal <= 0 || peopleVal < 1;
}

function calculate() {
  if (billVal >= 0 && peopleVal >= 1) {
    let tip = billVal * tipVal / peopleVal;
    let totalAmount = billVal * (tipVal + 1) / peopleVal;

    totalVal[0].innerHTML = '₹' + tip.toFixed(2);
    totalVal[1].innerHTML = '₹' + totalAmount.toFixed(2);

    reset.disabled = false;
    enableResetButton();
  }
}

function handleReset() {
  input.value = '';
  validateBill();

  totalVal[0].innerHTML = '₹0.00';
  totalVal[1].innerHTML = '₹0.00';

  button[2].click();
  people.value = 1;
  updatePeopleVal();

  reset.disabled = true;
  reset.classList.remove('enabled');
  disableResetButton();
}

function increment() {
  people.value = parseInt(people.value) + 1;
  updatePeopleVal();
}

function setValueToZero() {
  people.value = 0;
  updatePeopleVal();
}

function decrement() {
  people.value = parseInt(people.value) - 1;
  updatePeopleVal();
}

function updateGenerateButtonStyle() {
  if (billVal > 0 && peopleVal >= 1) {
    generateBill.style.backgroundColor = '#9C60FF';
    generateBill.style.color = ' #FFFFFF';
  } else {
    generateBill.style.backgroundColor = '#FBFAFB';
    generateBill.style.color = '#8F8F8F';
  }
}
