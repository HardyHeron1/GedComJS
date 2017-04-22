/**
 * Created by sahaque on 4/19/2017.
 */

describe('CharacterSet', function() {
    before(function () {
        this.characterSet = new CharacterSet();
    });
    describe('ParseTree', function() {
        it('testParse', function () {
            var tree = [['1 CHAR UTF-8']];
            this.characterSet.parseTree(tree, '5.5.1');
            expect(this.characterSet.toString()).to.equal("(CharacterSet->UTF-8, VerNbr->undefined)");
        });

        it('testParseFull', function() {
            "use strict";
            this.characterSet = new CharacterSet();
            var tree = [['1 CHAR UTF-8',
                [['2 VERS 1.0']]]];
            this.characterSet.parseTree(tree, '5.5.1');
            expect(this.characterSet.toString()).to.equal("(CharacterSet->UTF-8, VerNbr->1.0)");
        });
    });

    describe('ToGedcom', function() {
        it('testGedcom', function () {
            this.characterSet = new CharacterSet();
            var tree = [['1 CHAR UTF-8']];
            this.characterSet.parseTree(tree, '5.5.1');
            expect(this.characterSet.toGedcom(1, '5.5.1')).to.equal("1 CHAR UTF-8");
        });

        it('testGedcomFull', function() {
            "use strict";
            this.characterSet = new CharacterSet();
            var tree = [['1 CHAR UTF-8',
                [['2 VERS 1.0']]]];
            this.characterSet.parseTree(tree, '5.5.1');
            expect(this.characterSet.toGedcom(1, '5.5.1')).to.equal("1 CHAR UTF-8\n2 VERS 1.0");
        });
    });
});