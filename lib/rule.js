
var rule = (function () {
    function Rule(data) {
        var conditions = [];
        var actions = [];
        
        for (var n in data)
            this[n] = data[n];
            
        this.condition = function (cond) {
            if (typeof cond == 'function') {
                conditions.push(cond);
                return this;
            }
            
            if (cond.operator) {
                var value = cond.value;
                
                if (typeof value == 'string')
                    value = '"' + value + '"';
                    
                var fn = new Function('model', 'return model["' + cond.name + '"] ' + cond.operator + " " + value);
                conditions.push(fn);
                return this;
            }
            
            conditions.push(function (model) {
                return model[cond.name] === cond.value;
            });
            
            return this;
        }
        
        this.action = function (action) {
            if (typeof action == 'function') {
                actions.push(action);
                return;
            }
            
            actions.push(function (model) {
                model[action.set] = action.value;
            });
            
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