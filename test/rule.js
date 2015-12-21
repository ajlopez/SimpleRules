
var rule = require('../lib/rule');

exports['create rule with data'] = function (test) {
    var r = rule({ name: 'rule1', title: 'Rule 1' });
    
    test.ok(r);
    test.equal(typeof r, 'object');
    test.equal(r.name, 'rule1');
    test.equal(r.title, 'Rule 1');
}

exports['define and apply equal condition'] = function (test) {
    var r = rule({ name: 'rule1' });
    r.when("model.temperature == 37");
    
    var model = { temperature: 37 };
    
    test.strictEqual(r.checkConditions(model), true);
}

exports['define and apply condition with operator'] = function (test) {
    var r = rule({ name: 'rule1' });
    r.when("model.temperature >= 37");
    
    var model = { temperature: 40 };
    
    test.strictEqual(r.checkConditions(model), true);
}

exports['define and apply condition with operator and string value'] = function (test) {
    var r = rule({ name: 'rule1' });
    r.when("model.name != 'Adam'");
    
    var model = { value: 'Eve' };
    
    test.strictEqual(r.checkConditions(model), true);
}

exports['define and apply function as condition'] = function (test) {
    var r = rule({ name: 'rule1' });
    r.when(function (model) { return model.temperature && model.temperature >= 37 });
    
    var model = { temperature: 37 };
    
    test.strictEqual(r.checkConditions(model), true);
}

exports['define and apply false condition'] = function (test) {
    var r = rule({ name: 'rule1' });
    r.when("model.temperature == 37");
    
    var model = { temperature: 36 };
    
    test.strictEqual(r.checkConditions(model), false);
}

exports['define and apply action on model'] = function (test) {
    var r = rule({ name: 'rule1' });
    r.then("model.hasFever = true");
    
    var model = { temperature: 37 };
    
    r.doActions(model);
    
    test.equal(model.temperature, 37);
    test.equal(model.hasFever, true);
}

exports['define and apply function as action'] = function (test) {
    var r = rule({ name: 'rule1' });
    r.then(function (model) { model.hasFever = true; });
    
    var model = { temperature: 37 };
    
    r.doActions(model);
    
    test.equal(model.temperature, 37);
    test.equal(model.hasFever, true);
}

exports['define and run rule'] = function (test) {
    var model = { temperature: 37 };
    
    var r = rule({ name: 'rule1' })
        .when("model.temperature == 37")
        .then("model.hasFever = true")
        .run(model);
    
    test.equal(model.temperature, 37);
    test.equal(model.hasFever, true);
}

exports['define and run rule setting undefined value'] = function (test) {
    var model = { };
    
    var r = rule({ name: 'rule1' })
        .when("model.temperature === undefined")
        .then("model.temperature = 'unknown'")
        .run(model);
    
    test.equal(model.temperature, 'unknown');
}

exports['define and run a failed rule'] = function (test) {
    var model = { temperature: 36 };
    
    var r = rule({ name: 'rule1' })
        .when("model.temperature == 37")
        .then("model.hasFever = true")
        .run(model);
    
    test.equal(model.temperature, 36);
    test.ok(!model.hasFever);
    test.equal(typeof model.hasFever, 'undefined');
}

exports['define when and then with multiple entries'] = function (test) {
    var model = { temperature: 40, age: 40 };
    
    var r = rule({ name: 'rule1' })
        .when("model.temperature >= 39")
        .when("model.age >= 12")
        .then("model.fever = true")
        .then("model.critical = true")
        .run(model);
    
    test.equal(model.temperature, 40);
    test.equal(model.age, 40);
    test.equal(model.fever, true);
    test.equal(model.critical, true);
}

