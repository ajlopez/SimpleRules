
var simplerules = require('../'),
    assert = require('assert');
    
/*
    Rule:

    if
        p is Person
        p.temperature >= 38
    then
        p.hasFever = true
    end

    with p.temperature listener
*/

function Rule() {
    this.start = function (engine) {
        engine.onAddObject(onAddObject);

        function onAddObject (item) {
            if (!(item.object instanceof Person))
                return;

            var state = { p: item };
            var step = engine.createStep(state);
            step.check = function (state) { return state.p.object.temperature >= 38 };
            step.makeNextTask = makeTaskHasFever;
            step.makeBacktrack = makeBacktrackHasFever;
            step.firstRun = function (state) { state.p.onSetProperty('temperature', function() { step.run() }); }
            
            engine.addTask(step.makeTask());
        }

        function makeTaskHasFever(state) {
            return function () {
                state.p.setProperty('hasFever', true);
            };
        }

        function makeBacktrackHasFever(state) {
            var original = state.p.hasFever;

            return function () {
                engine.addTask(function () {
                    state.p.setProperty('hasFever', original) });
            };
        }
    }
}

// Person 'class'

function Person() {
}

// Don't fire rule if not a Person

var engine = simplerules.createEngine();

engine.addRule(new Rule());

var p = { temperature: 38 };

engine.addObject(p);
engine.runSync();

assert.equal(p.hasFever, undefined);

// Fire rule

var engine = simplerules.createEngine();

engine.addRule(new Rule());

var p = new Person();
p.temperature = 38;

engine.addObject(p);
engine.runSync();

assert.equal(p.hasFever, true);

// Don't fire rule

var engine = simplerules.createEngine();

engine.addRule(new Rule());

var p = new Person();
p.temperature = 37;

engine.addObject(p);
engine.runSync();

assert.equal(p.hasFever, undefined);

// Fire rule when set property

var engine = simplerules.createEngine();

engine.addRule(new Rule());

var p = new Person();

var item = engine.addObject(p);
engine.runSync();

assert.equal(p.hasFever, undefined);

item.setProperty('temperature', 38);
assert.equal(p.hasFever, undefined);
engine.runSync();
assert.equal(p.hasFever, true);

// Backtrack with new value

item.setProperty('temperature', 36);
assert.equal(p.hasFever, true);
engine.runSync();
assert.equal(p.hasFever, undefined);

// New fire with new value

item.setProperty('temperature', 38);
assert.equal(p.hasFever, undefined);
engine.runSync();
assert.equal(p.hasFever, true);
