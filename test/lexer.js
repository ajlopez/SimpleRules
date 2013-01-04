
var simplerules = require('../'),
    assert = require('assert');
    
// Lexer is defined

assert.ok(simplerules);
assert.equal(typeof simplerules.Lexer, 'function');

var Lexer = simplerules.Lexer;
var TokenType = simplerules.TokenType;

var lexer = new simplerules.Lexer("foo");
var token = lexer.nextToken();
assert.ok(token);
assert.equal(token.value, "foo");
assert.equal(token.type, TokenType.Name);
assert.equal(lexer.nextToken(), null);

