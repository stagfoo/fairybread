import Fairybread from './dist/fairybread';
const vars = {
  colors: {
    yellow: '#FFFFBE',
    orange: '#F7CD99',
    pink: '#FF77A1',
    purple: '#9886E8',
    blue: '#97CACB',

  }
}

const globalSheet = new Fairybread();
globalSheet.createGlobal();
globalSheet.add('body',`
  background:${vars.colors.pink};
  padding:4em;
  `);

var local = new Fairybread();
var id = local.createScope();
local.add('h1', `
        font-family:"Permanent Marker";
        font-size:9em;
        color: ${vars.colors.yellow};
        margin:0px;
        padding:0px;
        text-shadow:5px 5px 0px ${vars.colors.orange}

        `);

local.add('p',`
            font-family: 'Pangolin';
            font-size:1.7em;
            line-height:1.4em;
            color:${vars.colors.yellow};
            font-weight:300;
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