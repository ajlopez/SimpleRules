
var lines = require('../lib/lines');

exports['parse text'] = function (test) {
    var result = lines("rule");
    
    test.deepEqual(result, [ { indent: 0, text: "rule" } ]);
};

exports['parse text with indent and spaces'] = function (test) {
    var result = lines("  rule  ");
    
    test.deepEqual(result, [ { indent: 2, text: "rule" } ]);
};

exports['parse text with two lines'] = function (test) {
    var result = lines("rule\n  when");
    
    test.deepEqual(result, [ 
        { indent: 0, text: "rule" },
        { indent: 2, text: "when" }
    ]);
};

exports['parse text with two lines and carriage return'] = function (test) {
    var result = lines("rule\r\n  when\r\n");
    
    test.deepEqual(result, [ 
        { indent: 0, text: "rule" },
        { indent: 2, text: "when" }
    ]);
};

