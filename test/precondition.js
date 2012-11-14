test("precondition exists", 5, function() {
	ok(precondition !== void 0);
	ok(precondition.check !== void 0);
	ok(precondition.checkDefined !== void 0);
	ok(precondition.checkRange !== void 0);
	ok(precondition.checkType !== void 0);
});

test("precondition.check", 7, function() {
	var testMessage = "Test Message";
		testTemplate = "Test %s, %s.";
		testTemplateArg1 = "one";
		testTemplateArg2 = "two";
		testTemplateRendered = "Test one, two.";

	ok(precondition.check(1 === 1) === true);

	try{
		precondition.check(1 !== 1);
	} catch(e){
		ok(e instanceof Error, "Error is not an instance of Error");
	}

	try{
		precondition.check(1 !== 1, TypeError);
	} catch(e){
		ok(e instanceof TypeError, "Error is not an instance of custom error type");
	}

	try{
		precondition.check(1 !== 1, TypeError, testMessage);
	} catch(e){
		ok(e instanceof TypeError, "Error is not an instance of custom error type");
		ok(e.message === testMessage, "Message is incorrect");
	}

	try{
		precondition.check(1 !== 1, TypeError, testTemplate, testTemplateArg1, testTemplateArg2);
	} catch(e){
		ok(e instanceof TypeError, "Error is not an instance of custom error type");
		ok(e.message === testTemplateRendered, "Templated message is incorrect");
	}
});

test("precondition.checkDefined", 6, function() {
	var testMessage = "Test Message";
		testTemplate = "Test %s, %s.";
		testTemplateArg1 = "one";
		testTemplateArg2 = "two";
		testTemplateRendered = "Test one, two.";

	ok(precondition.checkDefined(false) === false);

	try{
		precondition.checkDefined(void 0);
	} catch(e){
		ok(e instanceof ReferenceError, "Error is not an instance of ReferenceError");
	}

	try{
		precondition.checkDefined(void 0, testMessage);
	} catch(e){
		ok(e instanceof ReferenceError, "Error is not an instance of ReferenceError");
		ok(e.message === testMessage, "Message is incorrect");
	}

	try{
		precondition.checkDefined(void 0, testTemplate, testTemplateArg1, testTemplateArg2);
	} catch(e){
		ok(e instanceof ReferenceError, "Error is not an instance of ReferenceError");
		ok(e.message === testTemplateRendered, "Templated message is incorrect");
	}
});

test("precondition.checkType", 6, function() {
	var testMessage = "Test Message";
		testTemplate = "Test %s, %s.";
		testTemplateArg1 = "one";
		testTemplateArg2 = "two";
		testTemplateRendered = "Test one, two.";

	ok(precondition.checkType(typeof "something" === "string") === true);

	try{
		precondition.checkType(typeof "something" === "number");
	} catch(e){
		ok(e instanceof TypeError, "Error is not an instance of TypeError");
	}

	try{
		precondition.checkType(typeof "something" === "number", testMessage);
	} catch(e){
		ok(e instanceof TypeError, "Error is not an instance of TypeError");
		ok(e.message === testMessage, "Message is incorrect");
	}

	try{
		precondition.checkType(typeof "something" === "number", testTemplate, testTemplateArg1, testTemplateArg2);
	} catch(e){
		ok(e instanceof TypeError, "Error is not an instance of TypeError");
		ok(e.message === testTemplateRendered, "Templated message is incorrect");
	}
});


test("precondition.checkRange", 6, function() {
	var testMessage = "Test Message";
		testTemplate = "Test %s, %s.";
		testTemplateArg1 = "one";
		testTemplateArg2 = "two";
		testTemplateRendered = "Test one, two.";

	ok(precondition.checkRange(1 > 0) === true);

	try{
		precondition.checkRange(1 < 0);
	} catch(e){
		ok(e instanceof RangeError, "Error is not an instance of RangeError");
	}

	try{
		precondition.checkRange(1 < 0, testMessage);
	} catch(e){
		ok(e instanceof RangeError, "Error is not an instance of RangeError");
		ok(e.message === testMessage, "Message is incorrect");
	}

	try{
		precondition.checkRange(1 < 0, testTemplate, testTemplateArg1, testTemplateArg2);
	} catch(e){
		ok(e instanceof RangeError, "Error is not an instance of RangeError");
		ok(e.message === testTemplateRendered, "Templated message is incorrect");
	}
});