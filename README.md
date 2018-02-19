<p align="center"><img src="docs/logo.svg" height="170px" ></img></p>
<p align="center">
  <a href="https://gitter.im/fairybread/Lobby">
  <img src="https://img.shields.io/badge/chat%20on-gitter-ff69b4.svg?style=flat-square" />
  </a>
  <a href="https://www.npmjs.com/package/fairybread">
    <img src="https://img.shields.io/npm/dm/fairybread.svg?style=flat-square" />
  </a>
    <img src="https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square" />
  </p>
 <p align="center">
take control of your style tags. create, share, extend and render css with javacsript
</p>


# Includes
- 🏡 Structured & clear
- 🔮 Css in js
- ⚙️ Functional
- 🤷‍♀️ framework agnostic

## Notice v2 Breaking Change
I have added options to give fairybread more power in the future, this means the old syntax
`new Fairybread('global')` should be replaced with `new Fairybread({global: true})`

## Basic Setup
```js
var colors = {
    yellow: '#FDCA21',
    pink: '#FF05FA',

};
var globalSheet = new Fairybread({
    global: true
});
globalSheet.add('body',`background:${colors.yellow}` );
globalSheet.add('h1',`color:${colors.pink}` );
globalSheet.render()
```

Outputs
```html
<style id="fairybread_208X7mLD6jwR4LCgOzod">
    body { background: #FDCA21; }
    h1 { color:#FF05FA; }
</style>
```
As you may have guested passing "global" at creation will make a global stylesheet that will effect everything on the page (Ahh so scary!)

## Scoped Styles
```js
var sheet = new Fairybread();
sheet.add('a','color:red;');
sheet.render('head')
```

outputs
```html
<style id="fairybread_xjRSIWrtA3kBepAHLZsM">
    .fairybread_xjRSIWrtA3kBepAHLZsM a {
        color: red
    }
</style>
```
`sheet.id` is the scoping class (excluding the .) that you can attach appropriately for example at the top of a component. the render function allows you to choose your rendering method incase you want to include your css inside the component

## Specials
Now I know all you designer types love the fonts and keyframes so you can add these as well.
```js
sheet.addSpecial(`
  @import url('https://fonts.googleapis.com/css?family=Sacramento');
`);
sheet.addSpecial(`
  @keyframes fairyfade {
      0%   { color:#FF008A }
      22%   { color:#FDCA21 }
      45%   { color:#85CF42 }
      70%   { color:#00FBF1 }
      90%   { color:#6A00FD }
      100%   { color:#FF008A }
  }`)
```

`.addSpecial` lets you paste any full css into the special style sheet.
Its global in its own sheet that is rendered automatically because its designed for font-face and keyframes, which can't be scoped. this should also help you fix any style syntax not supported yet by fairybread.

## Render
a new function called render allow you to choose the render location of your sheet. it takes these options.

```js
sheet.render('raw') // this returns an object with Js and plaintext css
 {
     js: //javascript object of styles,
     css: //a css string for rendering into a style tag.
 }
 sheet.render('head') //renders a style tag into the head bottom
 sheet.render('body') //renders a style tag into the body bottom
 sheet.render('here') //returns an style tag and id for components
 sheet.render()       // this is the same as 'head'
```

## Tagged Templates (New)
to make added styles to components easier I added `.css` to scope, build and return in place

```js
const sheet = new Fairybread().css`
    :host a { color: red }
    body { background: green }
`;
```
outputs
```html
<style id="fairybread_xjRSIWrtA3kBepAHLZsM">
    .fairybread_xjRSIWrtA3kBepAHLZsM a {
        color: red
    }
    body { background: green }
</style>
```
this will return the same as the [scope styles](#scoped-styles) example but instead of rendering to `head`
it will return a Style tag dom element for inclusion by you.
this function will replace `:host` with the scoped tag, if you don't include `:host` it will be global
because of this, you can mimic the `addSpecial` function as well.

## Extend
Pretty much just object syntax from javascript
```js
var tag_color = sheet.extend('a').color;
sheet.add ('.button', `color:${tag_color}`);
// OR
var tag_color = sheet.rules['a'].js;
sheet.add ('.button', `${tag_color}`);
```