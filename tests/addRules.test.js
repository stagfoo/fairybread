const Fairybread = require('../src/fairybread');

const sheet = new Fairybread({
	global: true
});
// Temp page
document.body.innerHTML = `
<head></head>
<body></body>
`;

// Added Rules
const pink = 'hotpink';
sheet.add('body', `background:${pink}`);

describe(`Adding a rule`, () => {
	test(`is rule created?`, () => {
		expect(sheet.index).toBe(0);
		expect(sheet.specialIndex).toBe(0);
		expect(Object.keys(sheet.rules).length).toBe(1);
	});
});

describe(`Render Methods`, () => {
    // Check head method
	test(`is raw method working`, () => {
		const renderSheet = sheet.render('raw');
		expect(renderSheet.js.body).toBeDefined();
		expect(renderSheet.js.body.js.background).toEqual('hotpink');
	});
    // Check head method
	test(`is head method working`, () => {
		const renderSheet = sheet.render('head');
		const element = document.getElementById(renderSheet);
		expect(element).toBeDefined();
		expect(element.parentElement.nodeName).toBe('HEAD');
		expect(element.innerHTML).toBe('body{background:hotpink}');
	});
     // Check body method
	test(`is body method working`, () => {
		const renderSheet = sheet.render('body');
		const element = document.getElementById(renderSheet);
		expect(element.parentElement.nodeName).toBe('BODY');
		expect(element).toBeDefined();
		expect(element.innerHTML).toBe('body{background:hotpink}');
	});
});
