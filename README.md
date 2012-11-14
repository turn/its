# precondition
Precondition is a utility to simplify common precondition or state checking. It's useful for signaling
to calling methods when they've made invalid calls to a method.

## Usage
There are four available functions:
* `precondition.checkDefined(expression [, messageTemplate [, messageArgs...]])` for throwing reference errors
* `precondition.checkType(expression [, messageTemplate [, messageArgs...]])` for throwing type errors
* `precondition.checkRange(expression [, messageTemplate [, messageArgs...]])` for throwing range errors
* `precondition.check(expression [, errorType] [, messageTemplate [, messageArgs...]])` for throwing custom errors

`expression` is a boolean value which determines whether the precondition will throw an error or not.

`messageTemplate` is a message with 0 or more '%s' placeholders for message arguments

`messageArgs` is a variable argument (0 or more) to fill the placeholders in the message template

`errorType` is used for throwing custom error objects. These objects should inherit from `Error`.

## Examples
```javascript
// Things that should pass
precondition.checkDefined("anything"); // returns "anything"
precondition.checkType(typeof "something" === "string"); // returns true
precondition.checkRange(1 < 2 && 1 > 0); // returns true
precondition.check(1 === 1); // returns true
precondition.check(1 === 1, ReferenceError); // throws true

// Things that shouldn't pass
precondition.checkDefined(void 0); // throws ReferenceError
precondition.checkType(typeof "something" === "number"); // throws TypeError
precondition.checkRange(1 < 2 && 1 > 2); // throws RangeError
precondition.check(1 !== 1); // throws Error
precondition.check(1 === void 0, ReferenceError); // throws ReferenceError

// Messages
precondition.checkDefined(void 0, "This doesn't look right."); // throws ReferenceError with a message of "This doesn't look right."
precondition.checkDefined(void 0, "This doesn't look %s.", "right"); // throws ReferenceError with a message of "This doesn't look right."
precondition.checkDefined(void 0, "%s doesn't look %s.", "This", "right"); // throws ReferenceError with a message of "This doesn't look right."

// What real use may look like
var addOnlyNumbersBelow100 = function(number1, number2){
	precondition.checkRange(number1 < 100);
	precondition.checkRange(number2 < 100);

	return number1 + number2;
};

addOnlyNumbersBelow100(10, 20); // returns 30
addOnlyNumbersBelow100(10, 338484); // throws RangeError
```
