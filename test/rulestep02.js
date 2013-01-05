
var simplerules = require('../'),
    assert = require('assert');

function RuleStep(engine, state) {
    var self = this;
    var fired = false;
    var backtrack = null;

    this.makeTask = function () {
        return function () {
            self.run();
            self.firstRun(state);
        };
    };

    this.run = function () {
        if (this.check(state)) {
            if (!fired) {
                fired = true;
                backtrack = this.makeBacktrack(state);
                var next = this.makeNextTask(state);
                if (next)
                    engine.addTask(next);
            }
        }
        else if (fired) {
            fired = false;
            if (backtrack)
                backtrack();
            backtrack = null;
        }
    };
}

/*
    Rule:

    if
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
            var state = { p: item };
            var step = new RuleStep(engine, state);
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

// Fire rule

var engine = simplerules.createEngine();

engine.addRule(new Rule());

var p = { temperature: 38 };

engine.addObject(p);
engine.runSync();

assert.equal(p.hasFever, true);

// Don't fire rule

var engine = simplerules.createEngine();

engine.addRule(new Rule());

var p = { temperature: 37 };

engine.addObject(p);
engine.runSync();

assert.equal(p.hasFever, undefined);

// Fire rule when set property

var engine = simplerules.createEngine();

engine.addRule(new Rule());

var p = { };

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
