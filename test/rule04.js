
var simplerules = require('../'),
    assert = require('assert');
    
/*
    Rule:

    if
        p is Person
        m is Person
        p.mother == m
    then
        m.gender = Gender.Female
    end
*/

function Rule() {
    this.start = function (engine) {
        engine.onAddObject(onAddObject);

        function onAddObject (item) {
            if (!(item.object instanceof Person))
                return;

            var state = { p: item };
            engine.onAddObject(makeOnAddObjectIsPerson(state));
        }

        function makeOnAddObjectIsPerson(state) {
            return function (item) {
                if (!(item.object instanceof Person))
                    return;
                var newstate = { p: state.p, m: item };
                engine.addTask(makeTaskIsMotherOf(newstate));
            }
        }

        function makeTaskIsMotherOf(state) {
            return function () {
                var fired = false;
                var backtrack = null;

                doCheck();

                state.p.onSetProperty('mother', doCheck);

                function checkIsMother() {
                    return state.p.object.mother == state.m.object;
                }

                function doCheck() {
                    if (checkIsMother()) {
                        if (!fired) {
                            fired = true;
                            backtrack = makeBacktrackGender(state);
                            engine.addTask(makeTaskGender(state));
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

        function makeTaskGender(state) {
            return function () {
                state.m.setProperty('gender', Gender.Female);
            };
        }

        function makeBacktrackGender(state) {
            var original = state.p.gender;

            return function () {
                engine.addTask(function () {
                    state.m.setProperty('gender', original) });
            };
        }
    }
}

// Person 'class'

function Person() {
}

var Gender = { Male: 1, Female: 2 };

// Simple fire

var engine = simplerules.createEngine();

engine.addRule(new Rule());

var p = new Person();
var m = new Person();
p.mother = m;

var itemp = engine.addObject(p);
var itemm = engine.addObject(m);
engine.runSync();

assert.equal(m.gender, Gender.Female);

// Backtrack

itemp.setProperty('mother', undefined);
assert.equal(m.gender, Gender.Female);
engine.runSync();
assert.equal(m.gender, undefined);
