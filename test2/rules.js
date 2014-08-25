
var rule = require('../lib/rule');

exports['create rule with data'] = function (test) {
    var r = rule({ name: 'rule1', title: 'Rule 1' });
    
    test.ok(r);
    test.equal(typeof r, 'object');
    test.equal(r.name, 'rule1');
    test.equal(r.title, 'Rule 1');
}

