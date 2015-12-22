
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

exports['compile rule with additional data'] = function (test) {
    var text = [
        "rule",
        "  name Rule1",
        "  when",
        "    model.temperature >= 37",
        "  then",
        "    model.fever = true"
    ].join('\n');
    
    var engine = simplerules.compile(text);
    
    test.ok(engine.rules);
    test.equal(engine.rules.length, 1);
    
    test.equal(engine.rules[0].name, "Rule1");
    
    var model = { temperature: 38 };
    
    engine.run(model);
    
    test.strictEqual(model.fever, true);
}

