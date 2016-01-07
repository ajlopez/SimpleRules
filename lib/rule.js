
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
            
            if (Array.isArray(cond)) {
                var self = this;
                cond.forEach(function (c) { self.when(c); });
                return this;
            }
            
            var fn = new Function('model', 'facts', 'return ' + cond + ";");
            conditions.push(fn);
            
            return this;
        }
        
        this.then = function (action) {
            if (typeof action == 'function') {
                actions.push(action);
                return;
            }
            
            if (Array.isArray(action)) {
                var self = this;
                action.forEach(function (a) { self.then(a); });
                return this;
            }
            
            var fn = new Function('model', 'facts', action);
            
            actions.push(fn);
            
            return this;
        }
        
        this.run = function (model, facts) {
            if (this.checkConditions(model, facts))
                this.doActions(model);
        }
        
        this.doActions = function (model, facts) {
            actions.forEach(function (action) {
                action(model, facts);
            });
        }
        
        this.checkConditions = function (model, facts) {
            for (var n in conditions) {
                var condition = conditions[n];
                var result = condition(model, facts);
                
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

