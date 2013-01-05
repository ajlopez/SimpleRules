
var simplerules = require('../'),
    assert = require('assert');
    
/*
    Rule:

    if
        p.temperature >= 38
    then
        p.hasFever = true
    end
*/

function Rule() {
    this.start = function (engine) {
        engine.onAddObject(onAddObject);

        function onAddObject (item) {
            var state = { p: item };
            var task = makeTaskTemperature(state);
            engine.addTask(task);
        }

        function makeTaskTemperature(state) {
            return function() {
                if (state.p.object.temperature >= 38)
                    engine.addTask(makeTaskHasFever(state));
            };
        }

        function makeTaskHasFever(state) {
            return function() {
                state.p.setProperty('hasFever', true);
            }
        }
    }
}

var engine = simplerules.createEngine();

engine.addRule(new Rule());

var p = { temperature: 38 };

engine.addObject(p);
engine.runSync();

assert.equal(p.hasFever, true);

