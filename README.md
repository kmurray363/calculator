# calculator
A calculator programmed using javascript.

Functions similar to a standard desktop calculator. Will only calculate one pair of numbers at a time.
Pressing an operator after two numbers have been entered will calculate what is on screen and add the operator after the output.
Exponent raises the current number to an exponent, SQRT takes the square root of the current number.

KNOWN BUGS:
- +/- will calculate without showing the sign switch when two values are on the screen. The signSwitch function will have to be adjusted to fix this.
- using a negative or decimal exponent with EXP will give a wrong answer instead of throwing an error.
- dividing by 0 gives infinity instead of throwing an error.

LIMITATIONS:
- No keyboard support for operator keys.
- No keyboard support for backspaces.
- EXP can only raise numbers to whole numbers and positive numbers.
- No parentheses or order of operations. Calculations are performed in the order that they are entered.
