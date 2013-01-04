
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

// Name

getToken("foo", "foo", TokenType.Name);
getToken("foo123", "foo123", TokenType.Name);
getToken("foo_bar", "foo_bar", TokenType.Name);
getToken("_foo", "_foo", TokenType.Name);
getToken("   foo    ", "foo", TokenType.Name);
