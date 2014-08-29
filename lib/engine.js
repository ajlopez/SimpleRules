
var rule = require('./rule');

var engine = (function () {
    function Engine(data) {
        var rules = [];
    
        for (var n in data)
            this[n] = data[n];
            
        this.rule = function (data) {
            var newrule = rule(data);
            rules.push(newrule);
            return newrule;
        }
        
        this.run = function (model) {
            rules.forEach(function (rule) {
                rule.run(model);
            });
        }
    }
    
    function createEngine(data) {
        return new Engine(data);
    }
    
    return createEngine;
})();

if (typeof window == 'undefined')
    module.exports = engine;
    
