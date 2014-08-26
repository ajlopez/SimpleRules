
var rule = require('../lib/rule');

exports['create rule with data'] = function (test) {
    var r = rule({ name: 'rule1', title: 'Rule 1' });
    
    test.ok(r);
    test.equal(typeof r, 'object');
    test.equal(r.name, 'rule1');
    test.equal(r.title, 'Rule 1');
}

exports['define and apply condition'] = function (test) {
    var r = rule({ name: 'rule1' });
    r.addCondition({ name: 'temperature', value: 37 });
    
    var model = { temperature: 37 };
    
    test.strictEqual(r.checkConditions(model), true);
}

exports['define and apply false condition'] = function (test) {
    var r = rule({ name: 'rule1' });
    r.addCondition({ name: 'temperature', value: 37 });
    
    var model = { temperature: 36 };
    
    test.strictEqual(r.checkConditions(model), false);
}

exports['define and apply action'] = function (test) {
    var r = rule({ name: 'rule1' });
    r.addAction({ set: 'hasFever', value: true });
    
    var model = { temperature: 37 };
    
    r.doActions(model);
    
    test.equal(model.temperature, 37);
    test.equal(model.hasFever, true);
}

exports['define and apply function as action'] = function (test) {
    var r = rule({ name: 'rule1' });
    r.addAction(function (model) { model.hasFever = true; });
    
    var model = { temperature: 37 };
    
    r.doActions(model);
    
    test.equal(model.temperature, 37);
    test.equal(model.hasFever, true);
}
