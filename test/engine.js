
var simplerules = require('../'),
    assert = require('assert');
    
// createEngine is defined

assert.ok(simplerules.createEngine);
assert.equal(typeof simplerules.createEngine, 'function');

var engine = simplerules.createEngine();
assert.ok(engine);

var obj = { };
var item = engine.addObject(obj);

// Is defined

assert.equal(item.isDefined('name'), false);

// On set property

var value = 0;

item.onSetProperty('name', function () { value = 1; });
item.setProperty('name', 'Adam');
assert.equal(value, 1);
assert.equal(obj.name, 'Adam');

// Get property

assert.equal(item.getProperty('name'), 'Adam');

// On add object

var value = null;

engine.onAddObject(function (item) { value = item.object; });
engine.addObject(4);

assert.equal(value, 4);

// Add task and run sync

var value = null;

engine.addTask(function () { value = 1; });
engine.runSync();
assert.equal(value, 1);

