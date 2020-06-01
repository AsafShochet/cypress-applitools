import config from '../../config/env-config.json';
import Task1ElementVisibility from '../tests/task1_elements_visibility';

const task1Tests = new Task1ElementVisibility({
	url: config.version1.url,
	viewPorts: config.traditionalViewPorts,
	resultsFile: config.version1.resultsFile
});
task1Tests.runTests();
