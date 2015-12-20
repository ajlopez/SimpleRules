
var parse = require('../lib/parse');

exports['parse line'] = function (test) {
    var result = parse("rule");
    
    test.deepEqual(result, [{ indent: 0, text: "rule" }]);
};

exports['parse line and indented line'] = function (test) {
    var result = parse("rule\n  when");
    
    test.deepEqual(result, [
        { indent: 0, text: "rule", elements: [
            { indent: 2, text: "when" }
        ]}
    ]);
};

