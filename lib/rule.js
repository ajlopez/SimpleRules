
var rule = (function () {
    function Rule(data) {
        for (var n in data)
            this[n] = data[n];
    }
    
    function createRule(data) {
        return new Rule(data);
    }
    
    return createRule;
})();

if (typeof window == 'undefined')
    module.exports = rule;