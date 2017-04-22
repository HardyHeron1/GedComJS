/**
 * Created by sahaque on 4/19/2017.
 */

describe('GedC', function() {
    before(function () {
        this.gedC = new GedC();
    });
    describe('ParseTree', function() {
        it('testParse', function () {
            var tree = [['1 GEDC',
                [['2 VERS 5.5.1']]]
            ];
            this.gedC.parseTree(tree, '5.5.1');
            expect(this.gedC.toString()).to.equal("(VerNbr->5.5.1, Form->LINEAGE-LINKED)");
        });

        it('testStringFull', function() {
            "use strict";
            this.gedC = new GedC();
            this.gedC.ver = '5.5.1';
            this.gedC.verNbr = '5.5.1';
            expect(this.gedC.toString()).to.equal("(VerNbr->5.5.1, Form->LINEAGE-LINKED)");
        });
    });
    describe('ToGedcom', function() {
        it('testGedcom', function () {
            this.gedC = new GedC();
            var tree = [['1 GEDC']];
            this.gedC.parseTree(tree, '5.5.1');
            expect(this.gedC.toGedcom(1, '5.5.1')).to.equal("1 GEDC\n2 FORM LINEAGE-LINKED");
        });
        it('testGedcomFull', function () {
            this.gedC = new GedC();
            var tree = [['1 GEDC',
                [['2 VERS 5.5.1']]]
            ];
            this.gedC.parseTree(tree, '5.5.1');
            expect(this.gedC.toGedcom(1, '5.5.1')).to.equal("1 GEDC\n2 VERS 5.5.1\n2 FORM LINEAGE-LINKED");
        });
    });
});