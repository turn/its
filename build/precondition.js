/*! precondition - v0.0.1 - 2012-11-14
* Copyright 2012 Ozan Turgut; Licensed MIT */

(function (exports) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = exports; // CommonJS
  } else {
    return window.precondition = exports; // <script>
  }
}((function () {
	var exports = {};

/** Generic check function which throws an error if a given expression is false
*
*	The params list is a bit confusing, check the examples to see the available ways of calling this function
*
*	@param {Boolean} expression The determinant of whether an exception is thrown
*	@param {String|Object} [messageOrErrorType] A message or an ErrorType object to throw if expression is false
*   @param {String|Object} [messageOrMessageArgs] A message, message template, or a message argument
*	@param {...Object} [messageArgs] Arguments for a provided message template
*
*	@returns {Boolean} Returns the expression passed  
*	@throws {Error}
*
*	@example
*		check(0 < 10); // returns true
*		check(0 > 10); // throws Error with no message
*		check(0 > 10, "Something went wrong!"); // throws Error with message: "Something went wrong!"
*		check(0 > 10, "%s went %s!", "something", "wrong"); // throws Error with message: "Something went wrong!"
*		check(0 > 10, RangeError, "%s went %s!", "something", "wrong"); // throws RangeError with message: "Something went wrong!"
*		check(0 > 10, RangeError); // throws RangeError with no message
*/
exports.check = function(expression, messageOrErrorType){
	if(expression === false){
		if(messageOrErrorType && typeof messageOrErrorType !== "string"){ // Check if custom error object passed
			throw messageOrErrorType(arguments.length > 3 ? templatedMessage(arguments[2], splice.call(arguments,3)) : arguments[2]);	
		} else {
			throw new Error(arguments.length > 2 ? templatedMessage(messageOrErrorType, splice.call(arguments,2)) : messageOrErrorType);	
		}
	}
	return expression;
};

/** Throws a TypeError if a given expression is false
*
*	@param {Boolean} expression The determinant of whether an exception is thrown
*	@param {String} [message] A message or message template for the error (if it gets thrown)
*	@param {...Object} [messageArgs] Arguments for a provided message template
*
*	@returns {Boolean} Returns the expression passed  
*	@throws {TypeError}
*
*	@example
*		checkType(typeof "Team" === "string"); // returns true
*		checkType(typeof "Team" === "number"); // throws TypeError with no message
*		checkType(void 0, "Something went wrong!"); // throws TypeError with message: "Something went wrong!"
*		checkType(void 0, "%s went %s!", "something", "wrong"); // throws TypeError with message: "Something went wrong!"
*/
exports.checkType = function(expression, message){
	if(expression === false){
		throw new TypeError(arguments.length > 2 ? templatedMessage(message, splice.call(arguments,2)) : message);
	}
	return expression;
};

/** Throws a ReferenceError if a given expression is false
*
*	@param {Boolean} expression The determinant of whether an exception is thrown
*	@param {String} [message] A message or message template for the error (if it gets thrown)
*	@param {...Object} [messageArgs] Arguments for a provided message template
*
*	@returns {Boolean} Returns the expression passed  
*	@throws {ReferenceError}
*
*	@example
*		checkDefined("Something"); // returns true
*		checkDefined(void 0); // throws ReferenceError with no message
*		checkDefined(void 0, "Something went wrong!"); // throws ReferenceError with message: "Something went wrong!"
*		checkDefined(void 0, "%s went %s!", "something", "wrong"); // throws ReferenceError with message: "Something went wrong!"
*/
exports.checkDefined = function(expression, message){
	if(expression === void 0){
		throw new ReferenceError(arguments.length > 2 ? templatedMessage(message, splice.call(arguments,2)) : message);
	}

	return expression;
};

/** Throws a RangeError if a given expression is false
*
*	@param {Boolean} expression The determinant of whether an exception is thrown
*	@param {String} [message] A message or message template for the error (if it gets thrown)
*	@param {...Object} [messageArgs] Arguments for a provided message template
*
*	@returns {Boolean} Returns the expression passed  
*	@throws {RangeError}
*
*	@example
*		checkRange(1 > 0); // returns true
*		checkRange(1 < 2); // throws RangeError with no message
*		checkRange(1 < 2 && 1 > 2, "Something went wrong!"); // throws RangeError with message: "Something went wrong!"
*		checkRange(1 < 2 && 1 > 2, "%s went %s!", "something", "wrong"); // throws RangeError with message: "Something went wrong!"
*/
exports.checkRange = function(expression, message){
	if(expression === false){
		throw new RangeError(arguments.length > 2 ? templatedMessage(message, splice.call(arguments,2)) : message);
	}

	return expression;
};

var splice = Array.prototype.splice; // Reduce resolution calls
var templateRegEx = /%s/; // The template placeholder, used to split message templates

/** A basic templating function. 
	
	Takes a string with 0 or more '%s' placeholders and an array to populate it with.

	@param {String} messageTemplate A string which may or may not have 0 or more '%s' to denote argument placement
	@param {Array} [messageArguments] Items to populate the template with

	@example
		templatedMessage("Hello"); // returns "Hello"
		templatedMessage("Hello, %s", ["world"]); // returns "Hello, world"
		templatedMessage("Hello, %s. It's %s degrees outside.", ["world", 72]); // returns "Hello, world. It's 72 degrees outside"

	@returns {String} The resolved message
*/
var templatedMessage = function(messageTemplate, messageArguments){
	var result = [],
		messageArray = messageTemplate.split(templateRegEx),
		index = 0,
		length = messageArray.length;

	for(; index < length; index++){
		result.push(messageArray[index]);
		result.push(messageArguments[index]);
	}

	return result.join('');
};

return exports;
}())));