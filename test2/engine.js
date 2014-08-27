
var engine = require('../lib/engine');

exports['create engine'] = function (test) {
    var eng = engine({ name: 'engine1', title: 'Engine 1' });
    
    test.ok(eng);
    test.equal(eng.name, 'engine1');
    test.equal(eng.title, 'Engine 1');
}

