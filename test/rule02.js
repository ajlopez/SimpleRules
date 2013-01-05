
var simplerules = require('../'),
    assert = require('assert');
    
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
            engine.addTask(makeTaskTemperature(state));
        }

        function makeTaskTemperature(state) {
            return function () {
                var fired = false;
                var backtrack = null;

                if (checkTemperature()) {
                    fired = true;
                    backtrack = makeBacktrackHasFever(state);
                    engine.addTask(makeTaskHasFever(state));
                }

                state.p.onSetProperty('temperature', listenTemperature);

                function checkTemperature() {
                    return state.p.object.temperature >= 38;
                }

                function listenTemperature() {
                    if (checkTemperature()) {
                        if (!fired) {
                            fired = true;
                            backtrack = makeBacktrackHasFever(state);
                            engine.addTask(makeTaskHasFever(state));
                        }
                    }
                    else if (fired) {
                        fired = false;
                        backtrack();
                        backtrack = null;
                    }
                }
            };
        }

        function makeTaskHasFever(state) {
            return function () {
                state.p.setProperty('hasFever', true);
            };
        }

        function makeBacktrackHasFever(state) {
            var original = state.p.temperature;

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
