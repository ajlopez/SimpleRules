
var parse = require('../lib/parse');

exports['parse line'] = function (test) {
    var result = parse("rule");
    
    test.deepEqual(result, [{ text: "rule" }]);
};

exports['parse line and indented line'] = function (test) {
    var result = parse("rule\n  when");
    
    test.deepEqual(result, [
        { text: "rule", elements: [
            { text: "when" }
        ]}
    ]);
};

exports['parse rule'] = function (test) {
    var result = parse("rule\n  when\n    model.temperature >= 37\n  then\n    facts.fever = true");
    
    test.deepEqual(result, [
        { text: "rule", elements: [
            { text: "when", elements: [
                { text: "model.temperature >= 37" }
            ] },
            { text: "then", elements: [
                { text: "facts.fever = true" }
            ] }
        ]}
    ]);
};

