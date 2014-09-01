
var rule = require('./rule');

var engine = (function () {
    function Runner(rules, model) {
        var results = [];
        
        this.run = function () {
            while (runOnePass())
                ;
        }
        
        function runOnePass() {
            var fired = 0;
            
            for (var n in rules) {
                var rule = rules[n];
                var result = rule.checkConditions(model);
                var oldresult = results[n];
                
                if (result !== oldresult) {
                    if (result) {
                        rule.doActions(model);
                        fired++;
                    }
                    
                    results[n] = result;
                }
            }
            
            return fired;
        }
    }
    
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
            var runner = new Runner(rules, model);
            return runner.run();
        }
    }
    
    function createEngine(data) {
        return new Engine(data);
    }
    
    return createEngine;
})();

if (typeof window == 'undefined')
    module.exports = engine;
    
