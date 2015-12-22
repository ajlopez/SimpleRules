
var simplerules = require('..');

exports['compile and run simple rule'] = function (test) {
    var text = [
        "rule",
        "  when",
        "    model.temperature >= 37",
        "  then",
        "    model.fever = true"
    ].join('\n');
    
    var engine = simplerules.compile(text);
    
    test.ok(engine.rules);
    test.equal(engine.rules.length, 1);
    
    var model = { temperature: 38 };
    
    engine.run(model);
    
    test.strictEqual(model.fever, true);
}

