import Fairybread from './dist/fairybread';
const vars = {
  colors: {
    yellow: '#FFFFBE',
    orange: '#F7CD99',
    pink: '#ff9cc8',
    purple: '#9886E8',
    blue: '#97CACB',
    crust: '#9a681e',
  }
}

const globalSheet = new Fairybread();
globalSheet.createGlobal();
globalSheet.add('body',`
  padding:4em;
  `);
globalSheet.add('.grade',`
/* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ffeaf3+0,ff9cc8+100 */
background: #ffeaf3; /* Old browsers */
background: -moz-linear-gradient(top,  #ffeaf3 0%, #ff9cc8 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(top,  #ffeaf3 0%,#ff9cc8 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom,  #ffeaf3 0%,#ff9cc8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffeaf3', endColorstr='#ff9cc8',GradientType=0 ); /* IE6-9 */
`)



var local = new Fairybread();
var id = local.createScope();
local.add('h1', `
        font-family:"Permanent Marker";
        font-size:9em;
        color: ${vars.colors.yellow};
        margin:0px;
        padding:0px;
        letter-spacing:-1px;
        text-shadow:5px 5px 0px ${vars.colors.orange};
        `);
local.add('p',`
            font-family: 'Pangolin';
            font-size:1.7em;
            line-height:1.4em;
            color:${vars.colors.yellow};
            font-weight:bold;
            letter-spacing:1px;
          `);
local.add('#main',`
              background:#efefef;
              font-weight:bold;
              width:900px;
              margin:0 auto;
              padding:1em;
              `);
local.addSpecial(`@import url('https://fonts.googleapis.com/css?family=Permanent+Marker|Pangolin');`);


// console.log(id);
document.querySelector('#main').className = id