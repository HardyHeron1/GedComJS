/**
 * Created by sahaque on 4/19/2017.
 */


describe('Association', function() {
    before(function () {
        this.association = new Association();
    });
    describe('ParseTree', function() {
        it('testParse', function () {
            var tree = [['1 ASSO @I191@', [['2 RELA GodFather']]]];
            this.association.parseTree(tree, '5.5.1');
            expect(this.association.toString()).to.equal("(Version->5.5.1, AssociateId->I191, Relationship->GodFather, Citations->(), Notes-> ())");
        });

        it('testParseFull', function() {
            "use strict";
            this.association = new Association();
            var tree = [['1 ASSO @I191@', [
                ['2 RELA GodFather'],
                ['2 NOTE van Gogh Rocks!'],
                ['2 SOUR @S123@']]]];
            this.association.parseTree(tree, '5.5.1');
            expect(this.association.toString()).to.equal("(Version->5.5.1, AssociateId->I191, Relationship->GodFather, Citations->(\n(Version->5.5.1, SourceId->S123, Page->undefined, EventType->undefined, RoleInEvent->undefined, EntryDate->undefined, Texts->(), Quay->undefined, MediaLinks->(), Notes->())), Notes-> (\n(Version->5.5.1, Text->van Gogh Rocks!)))");
        });
    });

    describe('ToGedcom', function() {
        it('testGedcom', function () {
            this.association = new Association();
            var tree = [['1 ASSO @I191@', [['2 RELA GodFather']]]];
            this.association.parseTree(tree, '5.5.1');
            expect(this.association.toGedcom(1, '5.5.1')).to.equal("1 ASSO @I191@\n2 RELA GodFather");
        });

        it('testGedcomFull', function() {
            "use strict";
            this.association = new Association();
            var tree = [['1 ASSO @I191@', [
                ['2 RELA GodFather'],
                ['2 NOTE van Gogh Rocks!'],
                ['2 SOUR @S123@']]]];
            this.association.parseTree(tree, '5.5.1');
            expect(this.association.toGedcom(1 , '5.5.1')).to.equal("1 ASSO @I191@\n2 RELA GodFather\n2 SOUR @S123@\n2 NOTE van Gogh Rocks!");
        });
    });
});