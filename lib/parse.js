
var lines = require('./lines');

function parseText(text) {
    var ls = lines(text);
    var l = ls.length;
    var p = 0;
    var result = [];
    
    while (p < l)
        result.push(parseElement());
    
    return result;
    
    function parseElement() {
        var line = ls[p++];
        var element = { text: line.text };
        
        var elements = [];
        
        while (ls[p] && ls[p].indent > line.indent)
            elements.push(parseElement());
            
        if (elements.length)
            element.elements = elements;
            
        return element;
    }
}

module.exports = parseText