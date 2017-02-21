class Fairybread {
 constructor(id,sheet,rules){
 this.id = this.makeId();
 this.masterClass = `.${this.id}`;
 this.sheet = sheet;
 this.rules = rules;
 this.index = 0;
 this.global = false;

}

makeId(){
        var text = "fairybread_";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 20; i++ ){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
getAll() {
        const rules = this.sheet.cssRules || this.sheet.rules || [];
        let results = {};
        let resultsMap = {};

        resultsMap = rules.map((data, key) => {
            console.log(key);
        })

        // Browsers report selectors in lowercase
        for (var i = 0; i < rules.length; i++) {
            // FIXME: remove masterClass if fontface
            const className =  rules[i].selectorText.replace(`${this.masterClass} `,'');
            const cssText = rules[i].cssText.slice(rules[i].cssText.indexOf('{')+1);
            const attrs = cssText.split(';');

            let ruleSet = {};
            for (var k = 0; k < attrs.length; ++k) {
                var keyValue = attrs[k].split(':');
                if (keyValue.length == 2) {
                    var key = keyValue[0].trim();
                    var value = keyValue[1].trim();
                    ruleSet[key] = value;
                }
            }
            for (var testRule in ruleSet) {
                // We are going to add the rule if it is not an empty object
                results[className] = ruleSet;
                break;
            }
        }
        return results;
    }

extend(selector){
  const all = this.getAll();
  return all[selector];
}

add(selector, rules) {
	if (this.sheet.insertRule) {
        this.sheet.insertRule(`${this.masterClass} ${selector} { ${rules} }`, this.index);
    } else {
    this.sheet.addRule(`${this.masterClass} ${selector}`, rules, this.index);
  }
  this.index++;
}

// addFont(rules) {

//     this.sheet.insertRule(`${rules}`, this.index);
//     this.index++;
// }


createScope(){
    if(!this.sheet){
    var styleNode = document.createElement('style');
    styleNode.type = 'text/css';
    styleNode.id = this.id;
    styleNode.rel = 'stylesheet';
    document.head.appendChild(styleNode);
    this.sheet = styleNode.sheet;
        } else {
            console.error('You have already made a sheet on this instance')
        }
        return this.id;
    }
    createGlobal(){
    if(!this.sheet){
        this.masterClass = " ";
        var styleNode = document.createElement('style');
        styleNode.type = 'text/css';
        styleNode.id = this.id;
        styleNode.rel = 'stylesheet';
        document.head.appendChild(styleNode);
        this.sheet = styleNode.sheet;
        } else {
        console.error('You have already made a sheet on this instance')
        }
    }
 }
