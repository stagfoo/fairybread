Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
            [].concat(_toConsumableArray(Array(20))).map(function (data, key) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            });
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
            //FIXME: Create Object Here
            this.sheet.insertRule ? this.sheet.insertRule(this.masterClass + " " + selector + " { " + rules + " }", this.index) : this.sheet.addRule(this.masterClass + " " + selector, rules, this.index);

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
