/**
 * Created by sahaque on 4/19/2017.
 */

describe('Citation', function() {
    before(function () {
        this.citation = new Citation();
    });
    describe('ParseTree', function() {
        it('testParse', function () {
            var tree = [['1 SOUR @S123@', [['2 PAGE 15']]]];
            this.citation.parseTree(tree, '5.5.1');
            expect(this.citation.toString()).to.equal("(Version->5.5.1, SourceId->S123, Page->15, EventType->undefined, RoleInEvent->undefined, EntryDate->undefined, Texts->(), Quay->undefined, MediaLinks->(), Notes->())");
        });

        it('testParseFull', function() {
            "use strict";
            this.citation = new Citation();
            var tree = [['1 SOUR @S123@', [
                ['2 PAGE 15'],
                ['2 EVEN Marraige', [
                    ['3 ROLE Husband']]],
                ['2 DATA', [
                    ['3 DATE 2010-03-02'],
                    ['3 TEXT Text1'],
                    ['3 TEXT text2']]],
                ['2 QUAY 7'],
                ['2 NOTE van Gogh Rocks!']
            ]]];
            this.citation.parseTree(tree, '5.5.1');
            expect(this.citation.toString()).to.equal("(Version->5.5.1, SourceId->S123, Page->15, EventType->Marraige, RoleInEvent->Husband, EntryDate->2010-03-02, Texts->(\nText->(Text1)\nText->(text2)), Quay->7, MediaLinks->(), Notes->(\n(Version->5.5.1, Text->van Gogh Rocks!)))");
        });
    });
});