
var rule = (function () {
    function Rule(data) {
        var conditions = [];
        
        for (var n in data)
            this[n] = data[n];
            
        this.addCondition = function (cond) {
            conditions.push(function (model) {
                return model[cond.name] == cond.value;
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