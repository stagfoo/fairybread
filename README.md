![Logo](logo.png)

is a javascript utility to manage css styles and replace precompilers.
you have probably all read [this talk](https://speakerdeck.com/vjeux/react-css-in-js) and you have probably all had issues with libraries that have local binds not building.

this little 1.38kb library interacts with style tags on the page to help you create pretty shit.

[![NPM](https://nodei.co/npm/fairybread.png?downloads=true&downloadRank=false&stars=true)](https://nodei.co/npm/fairybread/)

## Basic Setup
```js
var colors = {
    yellow: '#FFFFBE',
    pink: '#febfe2',

};
var globalSheet = new Fairybread('global');
globalSheet.add('body',`background:${colors.yellow}` );
globalSheet.add('h1',`color:${colors.pink}` );
globalSheet.render()
```
[Demo](http://codepen.io/stagfoo/pen/xqdWKE)

Outputs
```html
<style id="fairybread_208X7mLD6jwR4LCgOzod">
    body { background: #FFFFBE; }
    h1 { color:#febfe2; }
</style>
```
As you may have guested passing "global" at creation will make a global stylesheet that will effect everything on the page (Ahh so scary!)

## Scoped Styles
```js
var sheet = new Fairybread();
sheet.add('a','color:red;');
sheet.render()
```
[Demo](http://codepen.io/stagfoo/pen/qrmoEr)

outputs
```html
<style id="fairybread_xjRSIWrtA3kBepAHLZsM">
    .fairybread_xjRSIWrtA3kBepAHLZsM a {
        background: #FFFFBE;
    }
</style>
```
`sheet.id` is the scoping class (excluding the .) that you can attached appropriately for example at the top of a component. the render function allows you to choose your rendering method incase you want to include your css inside the component

## Specials
Now I know all you designer types love the fonts and keyframes so you can add these as well.
```js
sheet.addSpecial(`
  @import url('https://fonts.googleapis.com/css?family=Sacramento');
`);
sheet.addSpecial(`
  @keyframes fairyfade {
      0%   { color:#f15a5a }
      22%   { color:#f0c419 }
      45%   { color:#4eba6f }
      70%   { color:#2d95bf }
      90%   { color:#955ba5 }
      100%   { color:#f15a5a }
  }`)
```
[Demo](http://codepen.io/stagfoo/pen/vxmROp)

`.addSpecial` lets you paste any full css into the special style sheet.
Its global in its own sheet that is render automatically because its designed for font-face and keyframes, which can't be scoped. this should also help you fix any style syntax not supported yet by fairybread.

## Render
a new function called render allow you to choose the render location of your sheet. it takes 3 options.

```js
sheet.render('raw') // this returns an object with Js and plaintext css
 {
     js: //javascript object of styles,
     css: //a css string for rendering into a style tag.
 }

 sheet.render('head') //renders a style tag into the head bottom
 sheet.render('body') //renders a style tag into the body bottom
 shhet.render()       // this is the same as 'head'
```
## Extend
Pretty much just object syntax from javascript
```js
var tag_color = sheet.extend('a').color;
sheet.add ('.button', `color:${tag_color}`);
// OR
var tag_color = sheet.getAll()['a'];
sheet.add ('.button', `color:${tag_color}`);
```
Well now that's everything for now. Now your css is in js you have function and vars and all that goodness.
