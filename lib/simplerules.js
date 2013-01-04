
'use strict';

var simplerules = (function () {
    var TokenType = { Name: 1 };

    function Token(value, type) {
        this.value = value;
        this.type = type;
    }

    function Lexer(text) {
        var length = text ? text.length : 0;
        var position = 0;

        this.nextToken = function () {
            skipSpaces();

            var ch = nextChar();

            if (ch === null)
                return null;

            if (isFirstCharOfName(ch))
                return nextName(ch);
        }

        function nextName(ch) {
            var value = ch;

            for (ch = nextChar(); ch && isCharOfName(ch); ch = nextChar())
                value += ch;

            if (ch)
                pushChar(ch);

            return new Token(value, TokenType.Name);
        }

        function nextChar() {
            if (position >= length)
                return null;

            return text[position++];
        }

        function skipSpaces() {
            for (var ch = nextChar(); ch && isSpace(ch);)
                ch = nextChar();

            if (ch)
                pushChar(ch);
        }

        function pushChar(ch) {
            if (ch)
                position--;
        }

        function isFirstCharOfName(ch) {
            return isLetter(ch) || ch === '_';
        }

        function isCharOfName(ch) {
            return isLetter(ch) || isDigit(ch) || ch === '_';
        }

        function isDigit(ch) {
            return ch >= '0' && ch <= '9';
        }

        function isLetter(ch) {
            return ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z';
        }

        function isSpace(ch) {
            return ch <= ' ' && ch !== '\n' && ch !== '\r';
        }
    };

    return {
        Lexer: Lexer,
        TokenType: TokenType
    };
})();

if (typeof window === 'undefined') {
	module.exports = simplerules;
}
