const fs = require('fs');

const selectorsToVerifyVisibility = [
	{ name: 'Search Bar', selector: '#product_1' },
	{ name: 'Product inside the grid', selector: '#product_1' },
	{ name: 'Main menu', selector: '#DIV__mainmenu__15' },
	{ name: 'Cart button', selector: '#A__cartbt__49' },
	{ name: 'Sidebar filters', selector: '#sidebar_filters' },
	{ name: 'Filter button', selector: '#filterBtn' },
	{ name: 'Cart number of items badge', selector: '#STRONG____50' }
];

const taskNumber = 1;

/**
 * Tests file for the first file.
 */
class Task1ElementVisibility {
	/**
	 * Use this to configure the test for different environments, viewports and output file for the results
	 * @param {*} url
	 * @param {*} resultsFile
	 * @param {*} viewPorts
	 */
	constructor({ url, resultsFile, viewPorts }) {
		this.config = { url, resultsFile, viewPorts };
	}

	runTests() {
		this.config.viewPorts.forEach((viewPort) => {
			const { height, width, screenOrientation, deviceName } = viewPort;
			describe('Elements visibility', () => {
				selectorsToVerifyVisibility.forEach((component) => {
					it(`Check visibility for ${component.name} ${JSON.stringify(viewPort)}`, () => {
						width ? cy.viewport(width, height) : cy.viewport(deviceName, screenOrientation);
						cy.visit(this.config.url);
						const browserName = Cypress.browser.name;
						this._shouldBeVisible(
							browserName,
							`${height}X${width}`,
							deviceName,
							taskNumber,
							component.name,
							component.selector
						);
					});
				});
			});
		});
	}

	//Note if you are using "Expect" or "should" instead of Assert,
	//create a couple of wrappers for "expect" or "should" methods
	//Instead of should('be.visible'),
	_shouldBeVisible(browser, viewPort, device, task, testName, domId) {
		var displayed = true;
		try {
			cy.get(domId).should('be.visible');
		} catch (e) {
			displayed = false;
		}
		return this._hackathonReporter(browser, viewPort, device, task, testName, domId, displayed);
	}

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
	_hackathonReporter = (browser, viewport, device, task, testName, domId, comparisonResult) => {
		cy.writeFile(
			this.config.resultsFile,
			`Task: ${task}, Test Name: ${testName}, DOM Id: ${domId}, Browser: ${browser}, Viewport: ${viewport}, Device: ${device}, Status: ${
				comparisonResult ? 'Pass' : 'Fail'
			}\n`,
			{ flag: 'a+' }
		);

		console.log(
			'Traditional-V1-TestResults.txt',
			`Task: ${task}, Test Name: ${testName}, DOM Id: ${domId}, Browser: ${browser}, Viewport: ${viewport}, Device: ${device}, Status: ${
				comparisonResult ? 'Pass' : 'Fail'
			}\n`
		);
		return comparisonResult;
	};
}
export default Task1ElementVisibility;
