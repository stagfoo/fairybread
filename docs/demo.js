import Fairybread from './dist/fairybread';
const vars = {
  colors: {
    white: '#ffffff',
    yellow: '#FFFFBE',
    orange: '#F7CD99',
    pink: '#ff9cc8',
    purple: '#4b007d',
    blue: 'blue',
    bread: 'rgb(255, 243, 189)',
    crust: '#ffb903',
  },
  'rainbow':  `  background-size:100%;
  background: #f15a5a; /* Old browsers */
  background: -moz-linear-gradient(left, #f15a5a 0%, #f0c419 22%, #4eba6f 45%, #2d95bf 70%, #955ba5 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(left, #f15a5a 0%,#f0c419 22%,#4eba6f 45%,#2d95bf 70%,#955ba5 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to right, #f15a5a 0%,#f0c419 22%,#4eba6f 45%,#2d95bf 70%,#955ba5 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f15a5a', endColorstr='#955ba5',GradientType=1 ); /* IE6-9 */
  `
}

const globalSheet = new Fairybread();
globalSheet.addSpecial(`@import url('https://fonts.googleapis.com/css?family=Sacramento|Raleway');`);
globalSheet.createGlobal();
globalSheet.add('body',`
  background-size:7em;
  font-family:Arial,sans-serf;
  `);
globalSheet.add('p',`
            line-height:1.4em;
            color:${vars.colors.black};
            font-weight:100;
            letter-spacing:1px;
            font-size: 15px;
            text-align: left
          `);
globalSheet.add('#main',`
              font-weight:bold;
              width:70vw;
              margin:0 auto;
              padding:1em;
              `);
globalSheet.add('.fiddy',`
    display:inline-block;
    max-width:30vw;
    overflow:hidden;
    float:left;
    margin:1em;
`);
var logo = new Fairybread();
var logo_id = logo.createScope();
logo.add('h1', `
  ${vars.rainbow};
  font-size:12em;
  font-family: "Sacramento";
  overflow: visible;
  font-weight:100;
  padding:0em;
  margin:0em;
  display:inline-block;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
 `);
document.querySelector('[data-id="header"]').classList += ' '+logo_id;
 
var card = new Fairybread();
var card_id = card.createScope();
card.add('',`
    box-shadow:0px 0px 5px rgba(0,0,0,0.5);
    font-family:Raleway;
`)
card.add('.color-wrapper',`
    padding:0.3em;
    overflow:hidden;
    ${vars.rainbow};  
    margin:1em;
`)
card.add('img',`width:100%;`)
card.add('h1',`padding:0px 10px;  margin:0px;`)
card.add('p',`color:grey; padding:10px;`)
card.add('a',`color:grey; padding:1em; width:100%; background:#efefef; display:block; text-decoration:none;`)
card.add('a:hover',`background:${vars.colors.yellow}; color:${vars.colors.orange}`)
document.querySelector('[data-id="card1"]').classList += ' '+card_id;




// console.log(id);