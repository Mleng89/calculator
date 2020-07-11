//keeping track of numbers
let runningTotal = 0;
//keeping track of what's on the screen
let buffer = '0';
//what's on screen will be a string
let previousOperator = null;
const screen = document.querySelector('.screen');

//if user clicks a button
function buttonClick(value) {
	if (isNaN(value)) {
		//this is not a number
		handleSymbol(value);
	} else {
		//this is a number
		handleNumber(value);
	}
	screen.innerText = buffer;
}

function handleSymbol(symbol) {
	// if (symbol === 'C') {
	// 	buffer = '0';
	// 	runningTotal = 0;
	// }
	console.log('handle symbol', symbol);
	switch (symbol) {
		case 'C':
			buffer = '0';
			runningTotal = 0;
			break;
		case '=':
			if (previousOperator === null) {
				//you need two numbers to do math
				return;
			}
			flushOperation(parseInt(buffer));
			previousOperator = null;
			buffer = runningTotal;
			runningTotal = 0;
			break;
		case '+':
		case '-':
		case 'x':
		case '÷':
			handleMath(symbol);
			break;
	}
}

function handleMath(symbol) {
	console.log('handleMath', symbol);
	if (buffer === '0') {
		//do nothing
		return;
	}

	const intBuffer = parseInt(buffer); //or +buffer
	if (runningTotal === 0) {
		runningTotal = intBuffer;
	} else {
		flushOperation(intBuffer);
	}
	previousOperator = symbol;
	buffer = '0';
}
function flushOperation(intBuffer) {
	if (previousOperator === '+') {
		runningTotal += intBuffer;
	} else if (previousOperator === '-') {
		runningTotal -= intBuffer;
	} else if (previousOperator === 'x') {
		runningTotal *= intBuffer;
	} else {
		runningTotal /= intBuffer;
	}
	console.log('Running total:', runningTotal);
}

function handleNumber(numberString) {
	if (buffer === '0') {
		buffer = numberString;
	} else {
		buffer += numberString;
	}
}

//function called at least once
function init() {
	document.querySelector('.calc-buttons').addEventListener('click', function(event) {
		buttonClick(event.target.innerText);
	});
}

init();
