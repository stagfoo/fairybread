const Fairybread = require('../src/fairybread');

const sheet = new Fairybread({
	global:true
});
// Temp page
document.body.innerHTML = `
<head></head>
<body></body>
`;

// Added Rules
const pink = 'hotpink';
sheet.add('body', `background:${pink}`);
sheet.add('.example-class', `font-size:16px`);

describe(`this.cssToJs`, () => {
	const jss = sheet.cssToJs(`font-size: 16px;`);
	test(`is defined`, () => {
		expect(sheet.cssToJs).toBeDefined();
	});
	test(`is css in backticks converted in to an object`, () => {
		expect(jss['font-size']).toBeDefined();
		expect(jss['font-size']).toEqual('16px');
	});
});

describe(`Extend`, () => {
	test(`sheet extend plain text`, () => {
		const css = sheet.extend('body').css;
		expect(css).toEqual('background:hotpink');
		const cssB = sheet.extend('.example-class').css;
		expect(cssB).toEqual('font-size:16px');
	});
});

