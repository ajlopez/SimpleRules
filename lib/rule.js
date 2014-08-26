
var rule = (function () {
    function Rule(data) {
        var conditions = [];
        var actions = [];
        
        for (var n in data)
            this[n] = data[n];
            
        this.addCondition = function (cond) {
            if (typeof cond == 'function') {
                conditions.push(cond);
                return;
            }
            
            conditions.push(function (model) {
                return model[cond.name] == cond.value;
            });
        }
        
        this.addAction = function (action) {
            if (typeof action == 'function') {
                actions.push(action);
                return;
            }
            
            actions.push(function (model) {
                model[action.set] = action.value;
            });
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