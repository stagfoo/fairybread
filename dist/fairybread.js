function Fairybread(options) {
    if (typeof options === 'undefined') {
        options = {
            global: false,
            render: 'head'
        };
    }
    this.options = options;
    this.sheetType = options.global === true ? 'global' : 'local';
    this.ensureList = {};
    // Create Id
    function makeId() {
        var text = 'fairybread_';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var array = Array.apply(null, Array(20));
        array.map(function (data, key) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        });
        return text;
    }
    // Uniquish Id
    this.id = makeId();
    this.scopeClass = options.global !== true ? '.' + this.id : '';
    // Create Sheetsheet
    this.createSheet = function (id) {
        var styleNode = document.createElement('style');
        styleNode.type = 'text/css';
        styleNode.id = id;
        // Required for sheet attr to be created
        return styleNode;
    };
    this.bindSheet = function (node, location) {
        document[location].appendChild(node);
    };
    // Create Js Object from Css text
    this.cssToJs = function (css) {
        var rules = css.split(';');
        var ruleSet = {};
        rules.map(function (data, key) {
            var keyValue = data.split(':');
            if (keyValue.length === 2) {
                ruleSet[keyValue[0].trim().toString()] = keyValue[1].trim();
            }
        });
        return ruleSet;
    };
    this.sheet = this.createSheet(this.id);
    this.specialSheet = false;
    this.specialId = makeId() + '_special';
    this.rendered = false;
    this.rules = {};
    this.index = 0;
    this.specialIndex = 0;
    this.replaceHost = function (css, replace) {
        return css.split(':host').join(this.scopeClass);
    };
}
// Extend any rule to use in another css object
Fairybread.prototype.extend = function (selector) {
    return this.rules[selector];
};
Fairybread.prototype.add = function (selector, rules) {
    if (this.rules[selector.toString()] === undefined) {
        this.rules[selector.toString()] = {
            js: this.cssToJs(rules),
            css: rules
        };
    }
    else {
        console.error(selector + ' is ready in this style sheet');
    }
};
Fairybread.prototype.render = function (location) {
    var result;
    var sheetRules = this.rules;
    var thisSheet = this.sheet;
    var bindSheet = this.bindSheet;
    var scopeClass = this.scopeClass;
    var rulesRef = Object.keys(sheetRules);
    if (typeof location !== 'undefined') {
        this.options.render = location;
    }
    // Generate a plain text style sheet
    function renderFlat() {
        var echoSheet = '';
        rulesRef.map(function (key) {
            //TODO allow host
            echoSheet += scopeClass + ' ' + key + '{' + sheetRules[key].css + '}';
        });
        echoSheet = echoSheet.replace(/(\r\n|\n|\r)/gm, '').trim();
        return echoSheet;
    }
    switch (this.options.render) {
        case 'raw':
            var flatSheet = renderFlat();
            this.sheet.innerHTML = flatSheet;
            result = {
                js: sheetRules,
                css: flatSheet
            };
            break;
        case 'here':
            thisSheet.innerHTML = renderFlat();
            result = {
                tag: this.sheet,
                id: this.id
            };
            break;
        case 'body':
            bindSheet(thisSheet, 'body');
            thisSheet.innerHTML = renderFlat();
            result = this.id;
            break;
        case 'head':
        default:
            bindSheet(thisSheet, 'head');
            thisSheet.innerHTML = renderFlat();
            result = this.id;
            break;
    }
    this.rendered = true;
    return result;
};
Fairybread.prototype.addSpecial = function (rule) {
    var id = this.specialId;
    if (this.specialSheet === false) {
        var styleNode = document.createElement('style');
        styleNode.type = 'text/css';
        styleNode.id = id;
        document.body.appendChild(styleNode);
        this.specialSheet = document.getElementById(id);
        // replace with free function?
        this.specialSheet.innerHTML = rule;
    }
    else {
        this.specialSheet.innerHTML += '\n' + rule;
    }
};
Fairybread.prototype.css = function (css) {
    var _this = this;
    var v = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        v[_i - 1] = arguments[_i];
    }
    var flat = css.map((function (str, i) {
        return _this.replaceHost(str, _this.scopedClass) + (v[i] || '');
    })).join('');
    this.sheet.innerHTML = flat;
    this.rendered = true;
    var returnVal = this.sheet;
    switch (this.options.render) {
        case 'raw':
            returnVal = {
                css: flat,
                id: this.id
            };
            break;
        default:
            returnVal = this.sheet;
            break;
    }
    return returnVal;
};
Fairybread.prototype.ensure = function (key, path) {
    // Check if this sheet has already ensured it
    var sheetId = this.id;
    var ensureList = this.ensureList;
    if (ensureList[key] !== true) {
        // It hasn't ok, is it on the page anywhere.
        var exist = false;
        var allFbs = [].slice.call(document.querySelectorAll('style[id*=fairybread_]'));
        allFbs.map(function (node, i) {
            if (node.id.indexOf(key) > -1) {
                exist = true;
            }
        });
        if (exist === false) {
            var temp_id = sheetId + '_' + key;
            var ensured = this.createSheet(temp_id);
            ensured.innerHTML = '@import url("' + path + '")';
            this.bindSheet(ensured, 'head');
            ensureList[key] = true;
        }
    }
};
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Fairybread;
}
else {
    window['Fairybread'] = Fairybread;
}
