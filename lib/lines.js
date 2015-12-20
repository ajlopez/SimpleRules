

function parseLines(text) {
    var lines = text.split('\n');
    
    var result = [];
    
    lines.forEach(function (line) {
        var indent = 0;
        
        for (var k = 0; k < line.length && line[k] <= ' '; k++)
            ;
            
        result.push({ indent: k, text: line.trim() });
    });
    
    return result;
}

module.exports = parseLines;