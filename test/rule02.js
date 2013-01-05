
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

                if (checkTemperature()) {
                    fired = true;
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
                            engine.addTask(makeTaskHasFever(state));
                        }
                    }
                    else if (fired) {
                        fired = false;
                        // do backtracking
                    }
                }
            };
        }

        function makeTaskHasFever(state) {
            return function () {
                state.p.setProperty('hasFever', true);
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
