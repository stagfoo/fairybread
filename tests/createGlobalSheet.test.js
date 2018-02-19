const Fairybread = require('../dist/fairybread');

const sheet = new Fairybread({
	global: true
});
test(`Is Sheet's defined`, () => {
	expect(sheet).toBeDefined();
});
test(`Is it a global`, () => {
	expect(sheet.sheetType).toBe('global');
	expect(sheet.specialSheet).toBeFalsy();
});

test(`Was a sheet created?`, () => {
	expect(sheet.sheet).toBeDefined();
});

test(`Does it have an Id?`, () => {
	expect(sheet.id).toBeDefined();
});

test(`Is it rendered?`, () => {
	expect(sheet.rendered).toBeFalsy();
});

test(`Are there no Rules yet?`, () => {
	expect(sheet.index).toBe(0);
	expect(sheet.specialIndex).toBe(0);
	expect(Object.keys(sheet.rules).length).toBe(0);
});

