
'use strict';

var simplerules = (function () {
    function Lexer(text) {
        var length = text ? text.length : 0;

        this.nextToken = function () {

        }
    };

    return {
        Lexer: Lexer
    };
})();

if (typeof window === 'undefined') {
	module.exports = simplerules;
}
