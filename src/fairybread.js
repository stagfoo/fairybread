class Fairybread {
 constructor(){
 this.id = this.makeId();
 this.masterClass = `.${this.id}`;
 this.sheet = false;
 this.specialSheet = false;
 this.rules;
 this.index = 0;
 this.specialIndex = 0;
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
        const rules = this.sheet.cssRules || this.sheet.rules || {};
        const results = {};
        Object.keys(rules).map((key) => {
            const className =   rules[key].selectorText.replace(`${this.masterClass} `,'');
            const cssText =  rules[key].cssText.slice(rules[key].cssText.indexOf('{')+1).split(';');
            const ruleSet = {}
            cssText.map((data, key) => {
                const keyValue = data.split(':');
                if(keyValue.length === 2){
                    ruleSet[keyValue[0].trim()] = keyValue[1].trim();
                }
            });
            results[className] = ruleSet;
        })  
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

addSpecial(rule) {
    if(this.specialSheet === false){
        const styleNode = document.createElement('style');
        styleNode.type = 'text/css';
        styleNode.id = this.makeId()+"_special";
        styleNode.rel = 'stylesheet';
        document.head.appendChild(styleNode);
        this.specialSheet = styleNode.sheet;
        this.specialSheet.insertRule(`${rule}`, this.specialIndex);
        this.specialIndex++;
    } else {
        this.specialSheet.insertRule(`${rule}`, this.specialIndex);
        this.specialIndex++;
    }
    console.log(this.specialSheet)
}


createScope(){
    if(this.sheet === false){
    const styleNode = document.createElement('style');
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
    if(this.sheet === false){
        this.masterClass = " ";
        const styleNode = document.createElement('style');
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
