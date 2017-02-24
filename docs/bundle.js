/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

function _toConsumableArray(a) {
  if (Array.isArray(a)) {
    for (var b = 0, c = Array(a.length); b < a.length; b++) {
      c[b] = a[b];
    }return c;
  }return Array.from(a);
}function _classCallCheck(a, b) {
  if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
}Object.defineProperty(exports, "__esModule", { value: !0 });var _createClass = function () {
  function a(a, b) {
    for (var c = 0; c < b.length; c++) {
      var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
    }
  }return function (b, c, d) {
    return c && a(b.prototype, c), d && a(b, d), b;
  };
}(),
    Fairybread = function () {
  function a() {
    _classCallCheck(this, a), this.id = this.makeId(), this.masterClass = "." + this.id, this.sheet = !1, this.specialSheet = !1, this.specialId = this.makeId() + "_special", this.rules, this.index = 0, this.specialIndex = 0, this.global = !1;
  }return _createClass(a, [{ key: "makeId", value: function value() {
      var b = "fairybread_",
          c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";return [].concat(_toConsumableArray(Array(20))).map(function (a, d) {
        b += c.charAt(Math.floor(Math.random() * c.length));
      }), b;
    } }, { key: "getAll", value: function value() {
      var b = this,
          c = this.sheet.cssRules || this.sheet.rules || {},
          d = {};return Object.keys(c).map(function (a) {
        var e = c[a].selectorText.replace(b.masterClass + " ", ""),
            f = c[a].cssText.slice(c[a].cssText.indexOf("{") + 1).split(";"),
            g = {};f.map(function (a, b) {
          var c = a.split(":");2 === c.length && (g[c[0].trim()] = c[1].trim());
        }), d[e] = g;
      }), d;
    } }, { key: "extend", value: function value(b) {
      var c = this.getAll();return c[b];
    } }, { key: "add", value: function value(b, c) {
      this.sheet.insertRule ? this.sheet.insertRule(this.masterClass + " " + b + " { " + c + " }", this.index) : this.sheet.addRule(this.masterClass + " " + b, c, this.index), this.index++;
    } }, { key: "addSpecial", value: function value(b) {
      var c = this.specialId;if (this.specialSheet === !1) {
        var d = document.createElement("style");d.type = "text/css", d.id = c, d.rel = "stylesheet", document.head.appendChild(d), this.specialSheet = document.getElementById(c), this.specialSheet.innerHTML = b;
      } else console.log(this.specialSheet), this.specialSheet.innerHTML += "\n" + b;
    } }, { key: "createScope", value: function value() {
      if (this.sheet === !1) {
        var b = document.createElement("style");b.type = "text/css", b.id = this.id, b.rel = "stylesheet", document.head.appendChild(b), this.sheet = b.sheet;
      } else console.error("You have already made a sheet on this instance");return this.id;
    } }, { key: "createGlobal", value: function value() {
      if (this.sheet === !1) {
        this.masterClass = " ";var b = document.createElement("style");b.type = "text/css", b.id = this.id, b.rel = "stylesheet", document.head.appendChild(b), this.sheet = b.sheet;
      } else console.error("You have already made a sheet on this instance");
    } }]), a;
}();exports.default = Fairybread;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var _fairybread = __webpack_require__(0);

var _fairybread2 = _interopRequireDefault(_fairybread);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vars = {
  colors: {
    white: '#ffffff',
    yellow: '#FFFFBE',
    orange: '#F7CD99',
    pink: '#ff9cc8',
    purple: '#4b007d',
    blue: 'blue',
    bread: 'rgb(255, 243, 189)',
    crust: '#ffb903'
  },
  'rainbow': '  background-size:100%;\n  background: #f15a5a; /* Old browsers */\n  background: -moz-linear-gradient(left, #f15a5a 0%, #f0c419 22%, #4eba6f 45%, #2d95bf 70%, #955ba5 100%); /* FF3.6-15 */\n  background: -webkit-linear-gradient(left, #f15a5a 0%,#f0c419 22%,#4eba6f 45%,#2d95bf 70%,#955ba5 100%); /* Chrome10-25,Safari5.1-6 */\n  background: linear-gradient(to right, #f15a5a 0%,#f0c419 22%,#4eba6f 45%,#2d95bf 70%,#955ba5 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#f15a5a\', endColorstr=\'#955ba5\',GradientType=1 ); /* IE6-9 */\n  '
};

var globalSheet = new _fairybread2.default();
globalSheet.addSpecial('@import url(\'https://fonts.googleapis.com/css?family=Sacramento|Raleway\');');
globalSheet.createGlobal();
globalSheet.add('body', '\n  background-size:7em;\n  font-family:Arial,sans-serf;\n  ');
globalSheet.add('p', '\n            line-height:1.4em;\n            color:' + vars.colors.black + ';\n            font-weight:100;\n            letter-spacing:1px;\n            font-size: 15px;\n            text-align: left\n          ');
globalSheet.add('#main', '\n              font-weight:bold;\n              width:70vw;\n              margin:0 auto;\n              padding:1em;\n              ');
globalSheet.add('.fiddy', '\n    display:inline-block;\n    max-width:30vw;\n    overflow:hidden;\n    float:left;\n    margin:1em;\n');
globalSheet.add('#buttons', '\n  text-align:center;\n  margin-bottom:2em;\n  display:block;\n');
globalSheet.add('#buttons a', '\n    ' + vars.rainbow + ';\n    display: inline-block;\n    padding: 15px 7px;\n    margin: 0px;\n    border-radius: 5px;\n    text-decoration:none;\n');
globalSheet.add('#buttons span', '\n    background:#fff;\n    padding: 10px;\n    margin: 0px;\n    color:#000;    \n');
var logo = new _fairybread2.default();
var logo_id = logo.createScope();
logo.add('h1', '\ntext-align:center;\nwidth:100%;\n  ' + vars.rainbow + ';\n  font-size:12em;\n  font-family: "Sacramento";\n  overflow: visible;\n  font-weight:100;\n  padding:0em;\n  margin:0em;\n  display:inline-block;\n  -webkit-text-fill-color: transparent;\n  -webkit-background-clip: text;\n ');
document.querySelector('[data-id="header"]').classList += ' ' + logo_id;

var card = new _fairybread2.default();
var card_id = card.createScope();
card.add('', '\n    box-shadow:0px 0px 5px rgba(0,0,0,0.5);\n    font-family:Raleway;\n');
card.add('.color-wrapper', '\n    padding:0.3em;\n    overflow:hidden;\n    ' + vars.rainbow + ';  \n    margin:1em;\n');
card.add('img', 'width:100%;');
card.add('h1', 'padding:0px 10px;  margin:0px;');
card.add('p', 'color:grey; padding:10px;');
card.add('a', 'color:grey; padding:1em; width:100%; background:#efefef; display:block; text-decoration:none;');
card.add('a:hover', 'background:' + vars.colors.yellow + '; color:' + vars.colors.orange);
document.querySelector('[data-id="card1"]').classList += ' ' + card_id;

// console.log(id);

/***/ })
/******/ ]);
