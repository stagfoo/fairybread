const Fairybread = require('../src/fairybread')
const sheet = new Fairybread('global')
// Added Rules
const pink = 'hotpink'
sheet.add('body',`background:${pink}` )
test(`Is there a rule now?`,() =>{
  expect(sheet.index).toBe(0)
  expect(sheet.specialIndex).toBe(0)
  expect(Object.keys(sheet.rules).length).toBe(1)
})
test(`is the css rule returned on render as an object`,() =>{
  const renderSheet = sheet.render('return')
  console.log(renderSheet.js)
  expect(renderSheet.js.body).toBeDefined()
  // Not sure about this??
  expect(renderSheet.js.body.js.background).toEqual('hotpink')

})