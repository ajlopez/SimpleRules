
var engine = require('../lib/engine');

exports['create engine'] = function (test) {
    var eng = engine({ name: 'engine1', title: 'Engine 1' });
    
    test.ok(eng);
    test.equal(eng.name, 'engine1');
    test.equal(eng.title, 'Engine 1');
}

exports['add rule'] = function (test) {
    var eng = engine({});
    
    var rule = eng.rule({ name: 'rule1', title: 'Rule 1' });
    
    test.ok(rule);
    test.equal(rule.name, 'rule1');
    test.equal(rule.title, 'Rule 1');
}