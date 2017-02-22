import Fairybread from './src/fairybread';
var sheet = new Fairybread();
var id = sheet.createScope();
// sheet.createGlobal();

sheet.add('a','color:red;');
sheet.add('a:hover','color:green;');
sheet.add('h1','font-family:"Permanent Marker"')
sheet.add('p',`color:blue; font-family: 'Roboto';`);
sheet.add('#main',`
              background:#efefef;
              font-weight:bold;
              width:900px;
              margin:0 auto;
              padding:1em;
              `);
sheet.addSpecial(` @font-face {
    font-family: 'Permanent Marker';
    font-style: normal;
    font-weight: 400;
    src: local('Permanent Marker'), local('PermanentMarker'), url(https://fonts.gstatic.com/s/permanentmarker/v5/9vYsg5VgPHKK8SXYbf3sMio-5Z6V1O0VBgfXWFfbB4c.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
}`);
sheet.addSpecial(`
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v15/ek4gzZ-GeXAPcSbHtCeQI_esZW2xOQ-xsNqO47m55DA.woff2) format('woff2');
  unicode-range: U+0460-052F, U+20B4, U+2DE0-2DFF, U+A640-A69F;
}`);
console.log(sheet.extend('p'));
console.log(sheet.getAll());

// console.log(id);
document.querySelector('#main').className = id