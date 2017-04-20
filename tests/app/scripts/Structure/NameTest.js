/**
 * Created by sahaque on 4/19/2017.
 */

describe('Name', function() {
    before(function () {
        this.name = new Name();
    });
    describe('ParseTree', function() {
        it('testParse', function () {
            var tree = [['2 NAME Vincent /van Gogh/']];
            this.name.parseTree(tree, '5.5.1');
            expect(this.name.toString()).to.equal("(Version->5.5.1, Full->Vincent /van Gogh/, Type->undefined, Pieces->(Version->, Prefix->undefined, Given->undefined, NickName->undefined, SurnamePrefix->undefined, Surname->undefined, Suffix->undefined))");
        });

        it('testParseFull', function() {
            "use strict";
            this.name = new Name();
            var tree = [['2 NAME Vincent /van Gogh/',
                [
                    ['3 TYPE Birthname'],
                    ['3 GIVN Vincent'],
                    ['3 NPFX The Artist'],
                    ['3 GIVN Vincent'],
                    ['3 SPFX van'],
                    ['3 SURN Gogh'],
                    ['3 NSFX III']
                ]]
            ];
            this.name.parseTree(tree, '5.5.1');
            expect(this.name.toString()).to.equal("(Version->5.5.1, Full->Vincent /van Gogh/, Type->Birthname, Pieces->(Version->5.5.1, Prefix->The Artist, Given->Vincent, NickName->undefined, SurnamePrefix->van, Surname->Gogh, Suffix->III))");
        });
    });
});