const fs = require('fs');
import config from '../config/v1-config.json';

const selectorsToVerifyVisibility = [
	{ name: 'Search Bar', selector: '#product_1' },
	{ name: 'Product inside the grid', selector: '#product_1' },
	{ name: 'Main menu', selector: '#DIV__mainmenu__15' },
	{ name: 'Cart button', selector: '#A__cartbt__49' },
	{ name: 'Sidebar filters', selector: '#sidebar_filters' },
	{ name: 'Cart button', selector: '#A__cartbt__49' }
];

const taskNumber = 1;
config.viewPorts.forEach((viewPort) => {
	const { height, width, screenOrientation, deviceName } = viewPort;
	console.log(process.argv);
	describe('Elements visibility', () => {
		selectorsToVerifyVisibility.forEach((component) => {
			it(`Check visibility for ${component.name} ${JSON.stringify(viewPort)}`, () => {
				width ? cy.viewport(width, height) : cy.viewport(deviceName, screenOrientation);
				cy.visit(config.url);

				shouldBeVisible(
					name,
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

//Note if you are using "Expect" or "should" instead of Assert,
//create a couple of wrappers for "expect" or "should" methods
//Instead of should('be.visible'),
function shouldBeVisible(browser, viewPort, device, task, testName, domId) {
	var displayed = true;
	try {
		cy.get(domId).should('be.visible');
	} catch (e) {
		displayed = false;
	}
	return hackathonReporter(browser, viewPort, device, task, testName, domId, displayed);
}

const hackathonReporter = (browser, viewport, device, task, testName, domId, comparisonResult) => {
	console.log(
		'Traditional-V1-TestResults.txt',
		`"Task: ${task}, Test Name: ${testName}, DOM Id: ${domId}, Browser: ${browser}, Viewport: ${viewport}, Device: ${device}, Status: ${
			comparisonResult ? 'Pass' : 'Fail'
		}\n`
	);
	return comparisonResult;
};
