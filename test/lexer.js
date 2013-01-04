
var simplerules = require('../'),
    assert = require('assert');
    
// Lexer is defined

assert.ok(simplerules);
assert.equal(typeof simplerules.Lexer, 'function');

var Lexer = simplerules.Lexer;
var TokenType = simplerules.TokenType;

function getToken(text, value, type) {
    var lexer = new simplerules.Lexer(text);
    var token = lexer.nextToken();
    assert.ok(token);
    assert.equal(token.value, value);
    assert.equal(token.type, type);
    assert.equal(lexer.nextToken(), null);
}


