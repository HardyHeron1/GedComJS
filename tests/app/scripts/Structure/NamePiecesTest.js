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

    describe('ToGedcom', function() {
        it('testGedcomGivenOnly', function () {
            this.namePieces = new NamePieces();
            var tree = [['2 GIVN Vincent']];
            this.namePieces.parseTree(tree, '5.5.1');
            expect(this.namePieces.toGedcom(2, '5.5.1')).to.equal("2 GIVN Vincent");
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
            expect(this.namePieces.toGedcom(2, '5.5.1')).to.equal("2 NPFX The Honorable\n2 GIVN Vincent\n2 NICK Vince\n2 SPFX van\n2 SURN Gogh\n2 NSFX III");
        });
    });
});