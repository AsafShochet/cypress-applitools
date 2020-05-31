//Note: This is just an example in JavaScript. This shows how to print and also how to call that method.
//Feel free to change it to your language and framework needs

const fs = require('fs');

// Get the browser, viewport and device info from a variable like below or from a file or environment variable.
const browser = 'Firefox';
const viewport = '1200x700';
const device = 'Laptop';

/**
 * A Helper to print the test result in the following format:
 * Task: <Task Number>, Test Name: <Test Name>, DOM Id:: <id>, Browser: <Browser>, Viewport: <Width x Height>, Device<Device type>, Status: <Pass | Fail>
 *
 * Example: Task: 1, Test Name: Search field is displayed, DOM Id: DIV__customsear__41, Browser: Chrome, Viewport: 1200 x 700, Device: Laptop, Status: Pass
 *
 * @param task                    int - 1, 2 or 3
 * @param testName.               string - Something meaningful. E.g. 1.1 Search field is displayed
 * @param domId                   string - DOM ID of the element
 * @param comparisonResult        boolean - The result of comparing the "Expected" value and the "Actual" value.
 * @return                        boolean - returns the same comparison result back so that it can be used for further Assertions in the test code.
 */

function hackathonReporter(task, testName, domId, comparisonResult) {
	fs.appendFileSync(
		'Traditional-V1-TestResults.txt',
		`"Task: ${task}, Test Name: ${testName}, DOM Id: ${domId}, Browser: ${browser}, Viewport: ${viewport}, Device: ${device}, Status: ${
			comparisonResult ? 'Pass' : 'Fail'
		}\n`
	);
	return comparisonResult;
}

export { hackathonReporter };
