function add(num1, num2){
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    console.log(typeof(num1));
    return num1 + num2;
}

function subtract(num1, num2){
    parseInt(num1);
    parseInt(num2);
    return num1 - num2;
}

function multiply(num1, num2){
    parseInt(num1);
    parseInt(num2);
    return num1 * num2;
}

function divide(num1, num2){
    parseInt(num1);
    parseInt(num2);
    return num1 / num2;
}

function exponent(num1, num2){
    let output = 1
    for (let i = 0; i < num2; i++){
        parseInt(num1);
        output *= num1;
    };
    return output;
}

function SQRT(num1){
    parseInt(num1);
    return Math.sqrt(num1);
}

function signSwitch(num1){
    parseInt(num1);
    return num1 * -1;
}

function operate(operator, num1, num2){
    parseInt(num1);
    parseInt(num2);
    return operator(num1, num2);
}

function clear(){
    calcVars.currentOp = '';
    calcVars.hasCalculated = null;
    calcVars.nextValue = '';
    calcVars.currentValue = '';
    display.innerHTML = '';
    calcVars.onNextValue = false;
    calcVars.decimalPresent = false;
}

function calculate(){
    switch(calcVars.currentOp){
        case 'root':
            display.innerHTML = operate(SQRT, calcVars.currentValue);
            break;
        case 'multiply':
            display.innerHTML = operate(multiply, calcVars.currentValue, calcVars.nextValue);
            break;
        case 'divide':
            display.innerHTML = operate(divide, calcVars.currentValue, calcVars.nextValue);
            break;
        case 'exponent':
            display.innerHTML = operate(exponent, calcVars.currentValue, calcVars.nextValue);
            break;
        case 'subtract':
            display.innerHTML = operate(subtract, calcVars.currentValue, calcVars.nextValue);
            break;
        case 'signSwitch':
            display.innerHTML = operate(signSwitch, calcVars.currentValue);
            break;
        case 'add':
            display.innerHTML = operate(add, calcVars.currentValue, calcVars.nextValue);
            break; 
    }
    calcVars.currentValue = display.innerHTML;
    calcVars.nextValue = '';
    calcVars.hasCalculated = true;
    calcVars.decimalPresent = false;
    calcVars.currentOp = '';
    return;
}

const calcVars = {
    currentValue: '',
    nextValue: '',
    currentOp: '',
    onNextValue: false,
    hasCalculated: null,
    decimalPresent: false,
}


const display = document.querySelector('#display')
display.innerHTML = null;

//number button key press code
const numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach((button) => button.addEventListener('click', () => {
    //check to see if decimal is present in current number. Terminate listner if there is one.
    if (button.innerHTML === '.'){
        if (calcVars.decimalPresent === true){
            return;
        } else {
            calcVars.decimalPresent = true;
        }
    };
    //do not allow user to enter a number if the result of a calculation is on the screen
    if (calcVars.hasCalculated === true) return;

    display.innerHTML = display.innerHTML + button.innerHTML;
    if(calcVars.onNextValue === false){
        calcVars.currentValue += button.innerHTML;
    } else {
        calcVars.nextValue += button.innerHTML;
    };

}));

//keyboard support
document.addEventListener('keydown', (e) => {
    let numKeyPress = `${e.code}`.replace(/[a-z]/gi, '');
    if (calcVars.hasCalculated === true) return;

    if(calcVars.onNextValue === false){
        calcVars.currentValue += numKeyPress;
    } else {
        calcVars.nextValue += numKeyPress;
    };

    display.innerHTML = display.innerHTML += numKeyPress;

})

//operation button key press code
const opButtons = document.querySelectorAll('.op-button');
opButtons.forEach((button)=> button.addEventListener('click', () => {
    //if operator is present in display, and a second value hasn't been typed, do not allow another operator to be pressed other than CLEAR or =
    if(display.innerHTML.replace(/[0-9]/gi, '') != '' && button.innerHTML != '=' && button.innerHTML != 'CLEAR' && calcVars.nextValue === '' && calcVars.currentOp != '') {
        return;
    };
        
    //calcuate if an operator is pressed and two pairs are already stored in calculator if the operator pressed was not 'CLEAR'.
    if (calcVars.onNextValue === true && button.innerHTML != 'CLEAR' && calcVars.nextValue != ''){
        calculate();
    };
    calcVars.onNextValue = true;
    calcVars.decimalPresent = false;
    switch(button.innerHTML){
        case 'SQRT':
            calcVars.currentOp = 'root';
            calculate();
            break;
        case 'CLEAR':
            clear();
            break;
        case '*':
            calcVars.currentOp = 'multiply';
            display.innerHTML = display.innerHTML + ' ' + button.innerHTML + ' '
            calcVars.hasCalculated = false;
            break;
        case '/':
            calcVars.currentOp = 'divide';
            display.innerHTML = display.innerHTML + ' ' + button.innerHTML + ' '
            calcVars.hasCalculated = false;
            break;
        case 'EXP':
            calcVars.currentOp = 'exponent';
            display.innerHTML = display.innerHTML + ' ' + '^' + ' '
            calcVars.hasCalculated = false;
            break;
        case '-':
            calcVars.currentOp = 'subtract';
            display.innerHTML = display.innerHTML + ' ' + button.innerHTML + ' '
            calcVars.hasCalculated = false;
            break;
        case '+/-':
            calcVars.currentOp = 'signSwitch';
            calculate();
            break;
        case '+':
            calcVars.currentOp = 'add';
            display.innerHTML = display.innerHTML + ' ' + button.innerHTML + ' '
            calcVars.hasCalculated = false;
            break;
        case '=':
            if(calcVars.nextValue === ''){
                return;
            }
            calculate();
            break;
        
    }
}));
