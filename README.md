# Fairybread
a javascript utility to manage css styles and replace precompilers
you have probaby all read [this talk](https://speakerdeck.com/vjeux/react-css-in-js) and you have probablly all had issues with libraries that have local binds not building.

this little 2.4kb libraries interacts with style tags on the page to help you create pretty shit.

```
npm install fairybread
```

## Basic Setup
```js
const colors: {
    yellow: '#FFFFBE',
  }
}
import Fairybread from './dist/fairybread';
const globalSheet = new Fairybread();
globalSheet.createGlobal();
globalSheet.add('body',
                `background:${colors.yellow}`
                );
```

output in head
```html
<style id="fairybread_xjRSIWrtA3kBepAHLZsM">
    body {
        background: #FFFFBE;
    }
</style>
```
As you may have guested `.createGlobal` create a global style globalSheet that will effect everything on the page (Ahh so scary!)

## Scoped Styles
```js
var sheet = new Fairybread();
var id = sheet.createScope();
sheet.add('a','color:red;'); 
```
output in head
```
<style id="fairybread_xjRSIWrtA3kBepAHLZsM">
    .fairybread_xjRSIWrtA3kBepAHLZsM a {
        background: #FFFFBE;
    }
</style>
```
`var id` is the class that you can stick appropriately for example at the top of a card or navbar.

## Specials
now i know all you designer types love the fonts and keyframes so you can add these as well.
```
sheet.addSpecial(` @font-face {
    font-family: 'Permanent Marker';
    font-style: normal;
    font-weight: 400;
    src: local('Permanent Marker'), local('PermanentMarker'), url(https://fonts.gstatic.com/s/permanentmarker/v5/9vYsg5VgPHKK8SXYbf3sMio-5Z6V1O0VBgfXWFfbB4c.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
};`);
```
`.addSpecial` lets you paste any css into the special style sheet.
Its global because most this like font-face and keyframe can't be scoped. this should also help you fix any styles not supported.

## Extend
```
var tag_color = sheet.extend('a').color;
sheet.add ('.button', `color:${tag_color}`);
// OR 
var tag_color = sheet.getAll()['a'];
sheet.add ('.button', `color:${tag_color}`);
```

Well now thats everything for now. Now your css is in js you have function and vars and all that goodness.