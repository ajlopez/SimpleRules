
var rule = require('../lib/rule');

exports['create rule with data'] = function (test) {
    var r = rule({ name: 'rule1', title: 'Rule 1' });
    
    test.ok(r);
    test.equal(typeof r, 'object');
    test.equal(r.name, 'rule1');
    test.equal(r.title, 'Rule 1');
}

exports['define and apply condition'] = function (test) {
    test.async();
    
    var r = rule({ name: 'rule1' });
    r.addCondition({ name: 'temperature', value: 37 });
    
    var model = { temperature: 37 };
    
    r.checkConditions(model, function (err, result) {
        test.ok(!err);
        test.strictEqual(result, true);
        test.done();
    });
}

