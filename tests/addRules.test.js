const Fairybread = require('../dist/fairybread');
const pink = 'hotpink';

function exampleGen(options){
	const sheet = new Fairybread(options);
	sheet.add('body', `background:${pink}`);
	return sheet;
}

const sheet = exampleGen({
	global:true
})
const localSheet = exampleGen({
	global: false
})
// Temp page
document.body.innerHTML = `
<head></head>
<body></body>
`;

// Added Rules

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
		const sheet = exampleGen({
			global: true,
			render: 'raw'
		})
		const renderSheet = sheet.render();
		expect(renderSheet.js.body).toBeDefined();
		expect(renderSheet.js.body.js.background).toEqual('hotpink');
	});
    // Check head method
	test(`is head method working`, () => {
		const sheet = exampleGen({
			global: true,
			render: 'head'
		})
		const renderSheet = sheet.render();
		const element = document.getElementById(renderSheet);
		expect(element).toBeDefined();
		expect(element.parentElement.nodeName).toBe('HEAD');
		expect(element.innerHTML).toBe('body{background:hotpink}');
	});
	// Check body method
	test(`is body method working`, () => {
		const sheet = exampleGen({
			global: true,
			render: 'body'
		})
		const renderSheet = sheet.render();
		const element = document.getElementById(renderSheet);
		expect(element.parentElement.nodeName).toBe('BODY');
		expect(element).toBeDefined();
		expect(element.innerHTML).toBe('body{background:hotpink}');
	});
});

describe(`Render Methods`, () => {
	test(`backtick function`, () => {
		const renderSheet = localSheet.css`
			:host { background: ${pink}; }
		`;
		expect(renderSheet.innerHTML).toContain('{ background: hotpink; }')
	})
})