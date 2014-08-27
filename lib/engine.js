
var rule = require('./rule');

var engine = (function () {
    function Engine(data) {
        for (var n in data)
            this[n] = data[n];
            
        this.rule = function (data) {
            return rule(data);
        }
    }
    
    function createEngine(data) {
        return new Engine(data);
    }
    
    return createEngine;
})();

if (typeof window == 'undefined')
    module.exports = engine;
    
