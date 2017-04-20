/**
 * Created by sahaque on 4/16/2017.
 */

describe('Note', function() {
    before(function () {
        this.note = new Note();
    });
    describe('ParseTree', function() {
        it('testEmtpyObjectString', function () {
            expect(this.note.toString()).to.equal("(Version->, Text->undefined)");
        });

        it('testStringIdAndText', function () {
            this.note.id = '42';
            this.note.ver = '5.5.1';
            this.note.text = '2010-03-01';
            expect(this.note.toString()).to.equal("(Version->5.5.1, Id->42)");
        });

        it('testStringNoIdAndText', function () {
            this.note = new Note();
            this.note.ver = '5.5.1';
            this.note.text = '2010-03-01';
            expect(this.note.toString()).to.equal("(Version->5.5.1, Text->2010-03-01)");
        });

        it('testParseId', function () {
            this.note = new Note();
            var tree = [['1 NOTE @N111@']];
            this.note.parseTree(tree, '5.5.1');
            expect(this.note.toString()).to.equal("(Version->5.5.1, Id->N111)");
        });

        it('testParsetext', function () {
            "use strict";
            this.note = new Note();
            var tree = [['1 NOTE van Gogh Rocks!']];
            this.note.parseTree(tree, '5.5.1');
            expect(this.note.toString()).to.equal("(Version->5.5.1, Text->van Gogh Rocks!)");
        })
    });
});