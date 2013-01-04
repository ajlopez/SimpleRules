
var simplerules = require('../'),
    assert = require('assert');
    
// createEngine is defined

assert.ok(simplerules.createEngine);
assert.equal(typeof simplerules.createEngine, 'function');

var engine = simplerules.createEngine();
assert.ok(engine);

var obj = { };
var item = engine.addObject(obj);

assert.equal(item.isDefined('name'), false);

var value = 0;

item.onSetProperty('name', function () { value = 1; });
item.setProperty('name', 'Adam');
assert.equal(value, 1);
assert.equal(obj.name, 'Adam');
assert.equal(item.getProperty('name'), 'Adam');

var value = null;

engine.onAddObject(function (item) { value = item.object; });
engine.addObject(4);

assert.equal(value, 4);