/**
 * Created by sahaque on 4/19/2017.
 */

describe('PersonalName', function() {
    before(function () {
        this.personalName = new PersonalName();
    });
    describe('ParseTree', function() {
        it('testParse', function () {
            var tree = [['2 NAME Vincent /van Gogh/']];
            this.personalName.parseTree(tree, '5.5.1');
            expect(this.personalName.toString()).to.equal("(Version->5.5.1, Name->(Version->5.5.1, Full->Vincent /van Gogh/, Type->undefined, Pieces->(Version->, Prefix->undefined, Given->undefined, NickName->undefined, SurnamePrefix->undefined, Surname->undefined, Suffix->undefined)))");
        });

        it('testParseFull', function() {
            "use strict";
            this.personalName = new PersonalName();
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
            this.personalName.parseTree(tree, '5.5.1');
            expect(this.personalName.toString()).to.equal("(Version->5.5.1, Name->(Version->5.5.1, Full->Vincent /van Gogh/, Type->Birthname, Pieces->(Version->5.5.1, Prefix->The Artist, Given->Vincent, NickName->undefined, SurnamePrefix->van, Surname->Gogh, Suffix->III)))");
        });
    });
});