
var lines = require('../lib/lines');

exports['parse text'] = function (test) {
    var result = lines("rule");
    
    test.deepEqual(result, [ { indent: 0, text: "rule" } ]);
};

exports['parse text with indent and spaces'] = function (test) {
    var result = lines("  rule  ");
    
    test.deepEqual(result, [ { indent: 2, text: "rule" } ]);
};

