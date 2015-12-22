
'use strict';

var engine = require('./engine');
var parse = require('./parse');

function compile(text) {
    var tree = parse(text);
    var eng = engine();
    
    tree.forEach(function (node) {
        if (node.text != "rule")
            return;
            
        var rule = eng.rule({});
        
        node.elements.forEach(function (element) {
            if (element.text == "when")
                element.elements.forEach(function (condition) {
                    rule.when(condition.text);
                });
            else if (element.text == "then")
                element.elements.forEach(function (action) {
                    rule.then(action.text);
                });
            else {
                var words = element.text.split(/\s+/);
                
                var name = words[0];
                var value = element.text.substring(name.length).trim();
                
                rule[name] = value;
            }
        });
    });
    
    return eng;
}

module.exports = {
    engine: engine,
    compile: compile
}
