
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

            if (isDigit(ch))
                return nextInteger(ch);
        }

        function nextName(ch) {
            var value = ch;

            for (ch = nextChar(); ch && isCharOfName(ch); ch = nextChar())
                value += ch;

            if (ch)
                pushChar(ch);

            return new Token(value, TokenType.Name);
        }

        function nextInteger(ch) {
            var value = ch;

            for (ch = nextChar(); ch && isDigit(ch); ch = nextChar())
                value += ch;

            if (ch)
                pushChar(ch);

            return new Token(value, TokenType.Integer);
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

    function Item(obj) {
        this.listeners = { };
        this.object = obj;
    }

    Item.prototype.setProperty = function (name, value) {
        this.object[name] = value;

        if (this.listeners[name]) {
            var listeners = this.listeners[name];
            for (var k in listeners)
                listeners[k](name, value);
        }
    };

    Item.prototype.getProperty = function (name, value) {
        return this.object[name];
    };

    Item.prototype.onSetProperty = function (name, listener) {
        if (!this.listeners[name])
            this.listeners[name] = [];
        this.listeners[name].push(listener);
    };

    Item.prototype.isDefined = function (name) {
        return this.object[name] !== undefined;
    };

    function Engine() {
        var onaddobj = [];

        this.addObject = function (obj) {
            var item = new Item(obj);

            for (var k in onaddobj)
                onaddobj[k](item);

            return item;
        };

        this.onAddObject = function (listener) {
            onaddobj.push(listener);
        };
    };

    return {
        Lexer: Lexer,
        TokenType: TokenType,
        createEngine: function () { return new Engine(); }
    };
})();

if (typeof window === 'undefined') {
	module.exports = simplerules;
}
