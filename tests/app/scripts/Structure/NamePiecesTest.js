/**
 * Created by sahaque on 4/19/2017.
 */

describe('NamePieces', function() {
    before(function () {
        this.namePieces = new NamePieces();
    });
    describe('ParseTree', function() {
        it('testParseId', function () {
            var tree = [['2 GIVN Vincent']];
            this.namePieces.parseTree(tree, '5.5.1');
            expect(this.namePieces.toString()).to.equal("(Version->5.5.1, Prefix->undefined, Given->Vincent, NickName->undefined, SurnamePrefix->undefined, Surname->undefined, Suffix->undefined)");
        });

        it('testParseFull', function() {
            "use strict";
            this.namePieces = new NamePieces();
            var tree = [['2 GIVN Vincent'],
                ['2 NPFX The Honorable'],
                ['2 NICK Vince'],
                ['2 SPFX van'],
                ['2 SURN Gogh'],
                ['2 NSFX III']
            ];
            this.namePieces.parseTree(tree, '5.5.1');
            expect(this.namePieces.toString()).to.equal("(Version->5.5.1, Prefix->The Honorable, Given->Vincent, NickName->Vince, SurnamePrefix->van, Surname->Gogh, Suffix->III)");
        });
    });
});