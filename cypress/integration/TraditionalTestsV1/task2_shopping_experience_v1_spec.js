import config from '../../config/env-config.json';
import Task2FShoppingExperience from '../tests/task2_shopping_experience';

const task1Tests = new Task2FShoppingExperience({
	url: config.version1.url,
	viewPorts: config.traditionalViewPorts,
	resultsFile: config.version1.resultsFile
});
task1Tests.runTests();
