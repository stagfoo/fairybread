function Fairybread(sheetType) {
    this.sheetType = sheetType;
    this.scopeClass = '';
    // Create Id
    function makeId() {
            var text = "fairybread_";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
            array.map(function(data,key) { text += possible.charAt(Math.floor(Math.random() * possible.length)); });
            return text;
        };
    // Uniquish Id
    this.id = makeId();
    // Create Sheetsheet
    function createSheet(id){
        var styleNode = document.createElement('style');     
        styleNode.type = 'text/css';
        styleNode.id = id;
        styleNode.rel = 'stylesheet';
        // required for sheet attr to be created
        document.body.appendChild(styleNode);
        return styleNode.sheet;
    }
    // Create Js Object from Css text
    this.cssToJs = function(css){
        var rules = css.split(';');
        var ruleSet = {}
        rules.map(function(data, key){
            var keyValue = data.split(':');
            if(keyValue.length === 2){
                ruleSet[keyValue[0].trim().toString()] = keyValue[1].trim();
            }
        });
        return ruleSet;
    }
    
    this.sheet = createSheet(this.id);
    this.specialSheet = false;
    this.specialId = makeId() + "_special";
    this.rendered = false;
    this.rules = [];
    this.index = 0;
    this.specialIndex = 0;
 
}

Fairybread.prototype.getAll = function() { return this.rules; }
//Extend any rule to use in another css object
Fairybread.prototype.extend = function(selector) { return this.rules[selector]; }
Fairybread.prototype.add  = function(selector, rules){
    //Create Css Objects
    this.rules[selector.toString()] = this.cssToJs(rules);
    //Create Css Rules
    if(this.sheetType != 'global') {
        this.scopeClass = "."+this.id.toString();
    }
	if(this.sheet.insertRule)  { 
        this.sheet.insertRule(this.scopeClass+" "+selector+" {"+rules+"}", this.index) 
    } else {
       this.sheet.addRule(this.scopeClass+" "+selector, rules, this.index);
    }
  this.index++;
}

Fairybread.prototype.addSpecial  = function(rule){
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
        this.specialSheet.innerHTML += "\n"+rule;
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Fairybread;
  } else {
    window.Fairybread = Fairybread;
}