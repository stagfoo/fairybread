const Fairybread = require('../dist/fairybread');
const options = {
	global: false
}
const sheet = new Fairybread('local');
const idTest = [
	new Fairybread(options),
	new Fairybread(options),
	new Fairybread(options),
	new Fairybread(options),
	new Fairybread(options),
	new Fairybread(options),
	new Fairybread(options),
	new Fairybread(options),
	new Fairybread(options),
	new Fairybread(options),
	new Fairybread(options),
	new Fairybread(options)
];

test(`Is Sheet's defined`, () => {
	expect(sheet).toBeDefined();
});

test(`Is it a global`, () => {
	expect(sheet.sheetType).toBe('local');
	expect(sheet.specialSheet).toBeFalsy();
});

test(`Was a sheet created?`, () => {
	expect(sheet.sheet).toBeDefined();
});

test(`Does it have an Id?`, () => {
	expect(sheet.id).toBeDefined();
});

test(`Does it have different Id?`, () => {
	const masterId = sheet.id;
	idTest.map(slaveSheet => {
		expect(masterId).not.toBe(slaveSheet.id);
	});
});

test(`Is it rendered?`, () => {
	expect(sheet.rendered).toBeFalsy();
});

test(`Are there no Rules yet?`, () => {
	expect(sheet.index).toBe(0);
	expect(sheet.specialIndex).toBe(0);
	expect(Object.keys(sheet.rules).length).toBe(0);
});

