
var rule = (function () {
    function Rule(data) {
        var conditions = [];
        var actions = [];
        
        for (var n in data)
            this[n] = data[n];
            
        this.when = function (cond) {
            if (typeof cond == 'function') {
                conditions.push(cond);
                return this;
            }
            
            var fn = new Function('model', 'return ' + cond + ";");
            conditions.push(fn);
            
            return this;
        }
        
        this.then = function (action) {
            if (typeof action == 'function') {
                actions.push(action);
                return;
            }
            
            var fn = new Function('model', action);
            
            actions.push(fn);
            
            return this;
        }
        
        this.run = function (model) {
            if (this.checkConditions(model))
                this.doActions(model);
        }
        
        this.doActions = function (model) {
            actions.forEach(function (action) {
                action(model);
            });
        }
        
        this.checkConditions = function (model) {
            for (var n in conditions) {
                var condition = conditions[n];
                var result = condition(model);
                
                if (result !== true)
                    return result;
            }
            
            return true;
        }
    }
    
    function createRule(data) {
        return new Rule(data);
    }
    
    return createRule;
})();

if (typeof window == 'undefined')
    module.exports = rule;

