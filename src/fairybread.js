class Fairybread {
 constructor(id,sheet,rules){
 this.id = id;
 this.sheet = sheet;
 this.rules = rules;
 this.index = 0;
 this.global = false;
 
}

makeId(){
        var text = "fairybread_";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 5; i++ ){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

getAll() {
        var rules = this.sheet.cssRules || this.sheet.rules || [];
        var results = {};
        // Browsers report selectors in lowercase
        for (var i = 0; i < rules.length; i++) {
            const className =  rules[i].selectorText.replace(`.${this.id} `,'');
            var cssText = rules[i].cssText.slice(rules[i].cssText.indexOf('{')+1);
            var attrs = cssText.split(';');

            var ruleSet = {};
            for (var k = 0; k < attrs.length; ++k) {
                var keyValue = attrs[k].split(':');
                if (keyValue.length == 2) {
                    var key = keyValue[0].trim();
                    var value = keyValue[1].trim();
                    ruleSet[key] = value;
                }
            }
              for (var testRule in ruleSet) { // We are going to add the rule iff it is not an empty object
                results[className] = ruleSet;
                break;
            }
        }
        return results;
    }

get(selector){
  const all = this.getAll();
  return all[selector];
}
  
add(selector, rules) {
  const sheet = this.sheet;
	if (sheet.insertRule) {
        sheet.insertRule(`.${this.id} ${selector} { ${rules} }`, this.index);
    } else {
    sheet.addRule(`.${this.id} ${selector}`, rules, this.index);
  }
  this.index++;
}
  
  
createSheet(){
    if(!this.sheet){
    this.id = this.makeId();
    var styleNode = document.createElement('style');
    styleNode.type = 'text/css';
    styleNode.id = this.id;
    styleNode.rel = 'stylesheet';
    document.head.appendChild(styleNode);
    this.sheet = styleNode.sheet;
        } else {
            console.log('You have already made a sheet');
            
        }
        return this.id;
    }
    createGlobal(){
    if(!this.sheet){  
        this.id = "";
        var styleNode = document.createElement('style');
        styleNode.type = 'text/css';
        styleNode.id = this.id;
        styleNode.rel = 'stylesheet';
        document.head.appendChild(styleNode);
        this.sheet = styleNode.sheet;
        } else {
        console.log('You have already made a sheet')
        }
    }
 }
