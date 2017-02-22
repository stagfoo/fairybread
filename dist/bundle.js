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

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fairybread = function () {
    function Fairybread() {
        _classCallCheck(this, Fairybread);

        this.id = this.makeId();
        this.masterClass = "." + this.id;
        this.sheet = false;
        this.specialSheet = false;
        this.specialId = this.makeId() + "_special";
        this.rules;
        this.index = 0;
        this.specialIndex = 0;
        this.global = false;
    }

    _createClass(Fairybread, [{
        key: "makeId",
        value: function makeId() {
            var text = "fairybread_";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 20; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }
    }, {
        key: "getAll",
        value: function getAll() {
            var _this = this;

            var rules = this.sheet.cssRules || this.sheet.rules || {};
            var results = {};
            Object.keys(rules).map(function (key) {
                var className = rules[key].selectorText.replace(_this.masterClass + " ", '');
                var cssText = rules[key].cssText.slice(rules[key].cssText.indexOf('{') + 1).split(';');
                var ruleSet = {};
                cssText.map(function (data, key) {
                    var keyValue = data.split(':');
                    if (keyValue.length === 2) {
                        ruleSet[keyValue[0].trim()] = keyValue[1].trim();
                    }
                });
                results[className] = ruleSet;
            });
            return results;
        }
    }, {
        key: "extend",
        value: function extend(selector) {
            var all = this.getAll();
            return all[selector];
        }
    }, {
        key: "add",
        value: function add(selector, rules) {
            if (this.sheet.insertRule) {
                this.sheet.insertRule(this.masterClass + " " + selector + " { " + rules + " }", this.index);
            } else {
                this.sheet.addRule(this.masterClass + " " + selector, rules, this.index);
            }
            this.index++;
        }
    }, {
        key: "addSpecial",
        value: function addSpecial(rule) {
            var id = this.specialId;
            if (this.specialSheet === false) {
                var styleNode = document.createElement('style');
                styleNode.type = 'text/css';
                styleNode.id = id;
                styleNode.rel = 'stylesheet';
                document.head.appendChild(styleNode);
                this.specialSheet = document.getElementById(id); //FIXME
                this.specialSheet.innerHTML = rule;
            } else {
                console.log(this.specialSheet);
                this.specialSheet.innerHTML += "\n" + rule;
            }
        }
    }, {
        key: "createScope",
        value: function createScope() {
            if (this.sheet === false) {
                var styleNode = document.createElement('style');
                styleNode.type = 'text/css';
                styleNode.id = this.id;
                styleNode.rel = 'stylesheet';
                document.head.appendChild(styleNode);
                this.sheet = styleNode.sheet;
            } else {
                console.error('You have already made a sheet on this instance');
            }
            return this.id;
        }
    }, {
        key: "createGlobal",
        value: function createGlobal() {
            if (this.sheet === false) {
                this.masterClass = " ";
                var styleNode = document.createElement('style');
                styleNode.type = 'text/css';
                styleNode.id = this.id;
                styleNode.rel = 'stylesheet';
                document.head.appendChild(styleNode);
                this.sheet = styleNode.sheet;
            } else {
                console.error('You have already made a sheet on this instance');
            }
        }
    }]);

    return Fairybread;
}();

exports.default = Fairybread;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fairybread = __webpack_require__(0);

var _fairybread2 = _interopRequireDefault(_fairybread);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sheet = new _fairybread2.default();
var id = sheet.createScope();
// sheet.createGlobal();

sheet.add('a', 'color:red;');
sheet.add('a:hover', 'color:green;');
sheet.add('h1', 'font-family:"Permanent Marker"');
sheet.add('p', 'color:blue; font-family: \'Roboto\';');
sheet.add('#main', '\n              background:#efefef;\n              font-weight:bold;\n              width:900px;\n              margin:0 auto;\n              padding:1em;\n              ');
sheet.addSpecial(' @font-face {\n    font-family: \'Permanent Marker\';\n    font-style: normal;\n    font-weight: 400;\n    src: local(\'Permanent Marker\'), local(\'PermanentMarker\'), url(https://fonts.gstatic.com/s/permanentmarker/v5/9vYsg5VgPHKK8SXYbf3sMio-5Z6V1O0VBgfXWFfbB4c.woff2) format(\'woff2\');\n    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n};');
sheet.addSpecial('\n@font-face {\n  font-family: \'Roboto\';\n  font-style: normal;\n  font-weight: 400;\n  src: local(\'Roboto\'), local(\'Roboto-Regular\'), url(https://fonts.gstatic.com/s/roboto/v15/ek4gzZ-GeXAPcSbHtCeQI_esZW2xOQ-xsNqO47m55DA.woff2) format(\'woff2\');\n  unicode-range: U+0460-052F, U+20B4, U+2DE0-2DFF, U+A640-A69F;\n};');
console.log(sheet.extend('p'));
console.log(sheet.getAll());

// console.log(id);
document.querySelector('#main').className = id;

/***/ })
/******/ ]);