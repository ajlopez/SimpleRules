

function parseLines(text) {
    var lines = text.split('\n');
    
    var result = [];
    
    lines.forEach(function (line) {
        var indent = 0;
        
        for (var k = 0; k < line.length && line[k] <= ' '; k++)
            ;            
            
        line = line.trim();
        
        if (line.length === 0 || line[0] === '#')
            return;
            
        result.push({ indent: k, text: line.trim() });
    });
    
    return result;
}

module.exports = parseLines;