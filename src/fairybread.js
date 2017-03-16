function Fairybread(sheetType) {
    this.sheetType = sheetType;
    this.scopeClass = '';
    // Create Id
    function makeId() {
        var text = "fairybread_";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var array = [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9];
        array.map(function (data, key) { text += possible.charAt(Math.floor(Math.random() * possible.length)); });
        return text;
    };
    // Uniquish Id
    this.id = makeId();
    // Create Sheetsheet
    function createSheet(id) {
        var styleNode = document.createElement('style');
        styleNode.type = 'text/css';
        styleNode.id = id;
        styleNode.rel = 'stylesheet';
        // required for sheet attr to be created
        return styleNode;
    }
    this.bindSheet = function (node,location) {
        document[location].appendChild(node);
    }
    // Create Js Object from Css text
    this.cssToJs = function (css) {
        var rules = css.split(';');
        var ruleSet = {}
        rules.map(function (data, key) {
            var keyValue = data.split(':');
            if (keyValue.length === 2) {
                ruleSet[keyValue[0].trim().toString()] = keyValue[1].trim();
            }
        });
        return ruleSet;
    }

    this.sheet = createSheet(this.id);
    this.specialSheet = false;
    this.specialId = makeId() + "_special";
    this.rendered = false;
    this.rules = {};
    this.index = 0;
    this.specialIndex = 0;

}

Fairybread.prototype.getAll = function () { return this.rules; }
//Extend any rule to use in another css object
Fairybread.prototype.extend = function (selector) { return this.rules[selector]; }

Fairybread.prototype.add = function (selector, rules) {
    if (this.sheetType != 'global') {
            this.scopeClass = "." + this.id;
    }
    //Create Css Objects
    if (this.rules[selector.toString()] === undefined) {
        this.rules[selector.toString()] = {
            js: this.cssToJs(rules),
            css: rules,

        }
    } else {
        console.error(selector + " is ready in this style sheet");
    }
}
Fairybread.prototype.render = function (location) {
    let result;
    const sheetRules = this.rules;
    const thisSheet = this.sheet;
    const bindSheet = this.bindSheet;
    const scopeClass = this.scopeClass;
    const rulesRef = Object.keys(sheetRules);
    //Generate a plain text style sheet
    function renderFlat(location) {
            bindSheet(thisSheet, location);
            let echoSheet = "";
            rulesRef.map(function (key) {
                echoSheet += ` ${scopeClass} ${key}{${sheetRules[key].css}}`
            });
            echoSheet = echoSheet.replace(/(\r\n|\n|\r)/gm, "").trim();
            thisSheet.innerHTML = echoSheet;
    }

    switch (location) {
        case 'return':
            let flatSheet = "";
            rulesRef.map(function (key) {
                flatSheet += `${scopeClass} ${key} { ${sheetRules[key].css}  }`
            });
            flatSheet = flatSheet.replace(/(\r\n|\n|\r)/gm, "").trim();
            this.sheet.innerHTML = flatSheet;
            result = {
                js: sheetRules,
                css: flatSheet
            };
            break;
        case 'head':
            renderFlat('head');
            break;
        case 'body':
            renderFlat('body');
        break;
        default:
            renderFlat('body');
            break;
    }
    return result;
}


Fairybread.prototype.addSpecial = function (rule) {
    var id = this.specialId;
    if (this.specialSheet === false) {
        var styleNode = document.createElement('style');
        styleNode.type = 'text/css';
        styleNode.id = id;
        styleNode.rel = 'stylesheet';
        document.body.appendChild(styleNode);
        this.specialSheet = document.getElementById(id);  //FIXME
        this.specialSheet.innerHTML = rule;
    } else {
        this.specialSheet.innerHTML += "\n" + rule;
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Fairybread;
} else {
    window.Fairybread = Fairybread;
}