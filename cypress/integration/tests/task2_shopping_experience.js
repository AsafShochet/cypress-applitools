const fs = require('fs');

const blackShoesFieldSelector = '#colors__Black';
const filterSubmitButtonSelector = '#filterBtn';
const productsGridSelector = '#product_grid';

const taskNumber = 2;

const selectorsToVerifyVisibility = [
	{ name: 'products grid', selector: '#product_grid' },
	{ name: 'product 1', selector: '#product_1' },
	{ name: 'product 2', selector: '#product_2' }
];
/**
 * Tests file for the first file.
 */
class Task2FShoppingExperience {
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
			describe('Filter black shoes', () => {
				it('Select Black from filter options', () => {
					width ? cy.viewport(width, height) : cy.viewport(deviceName, screenOrientation);
					cy.visit(this.config.url);
					this._shouldBeVisible(viewPort, 'Black shoes filter option', blackShoesFieldSelector);
					cy.get(blackShoesFieldSelector).click();
					cy.get(filterSubmitButtonSelector).click();
					cy.get(productsGridSelector).should('have.length', 2);
				});

				selectorsToVerifyVisibility.forEach((component) => {
					it(`Check visibility for ${component.name} ${JSON.stringify(viewPort)}`, () => {
						this._shouldBeVisible(viewPort, component.name, component.selector);
					});
				});
			});
		});
	}

	//Note if you are using "Expect" or "should" instead of Assert,
	//create a couple of wrappers for "expect" or "should" methods
	//Instead of should('be.visible'),
	_shouldBeVisible(viewPort, testName, domId) {
		const { height, width, deviceName } = viewPort;
		const browserName = Cypress.browser.name;
		const viewDimensions = `${width}X${height}`;

		var displayed = true;
		try {
			cy.get(domId).should('be.visible');
		} catch (e) {
			displayed = false;
		}
		return this._hackathonReporter(
			browserName,
			viewDimensions,
			deviceName,
			testName,
			domId,
			displayed
		);
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
	_hackathonReporter = (browser, viewport, device, testName, domId, comparisonResult) => {
		const task = this.taskNumber;
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
export default Task2FShoppingExperience;
