/**
 * Created by sahaque on 4/19/2017.
 */

describe('RepositoryCitation', function() {
    before(function () {
        this.repositoryCitation = new RepositoryCitation();
    });
    describe('ParseTree', function() {
        it('testParse', function () {
            var tree = [['1 REPO @R123@', [['2 CALN 123456789']]]];
            this.repositoryCitation.parseTree(tree, '5.5.1');
            expect(this.repositoryCitation.toString()).to.equal("(RepositoryId->R123, Notes->(), CallNbrs->((123456789, undefined)))");
        });

        it('testParseFull', function() {
            "use strict";
            this.repositoryCitation = new RepositoryCitation();
            var tree = [['1 REPO @R123@', [
                ['2 CALN 123456789', [
                    ['3 MEDI digital book']]],
                ['2 CALN 999999999'],
                ['2 NOTE van Gogh Rocks!']]]];
            this.repositoryCitation.parseTree(tree, '5.5.1');
            expect(this.repositoryCitation.toString()).to.equal("(RepositoryId->R123, Notes->(\n(Version->5.5.1, Text->van Gogh Rocks!)), CallNbrs->((undefined, digital book), (999999999, undefined)))");
        });
    });

        describe('ToGedcom', function() {
            it('testGedcom', function () {
                this.repositoryCitation = new RepositoryCitation();
                var tree = [['1 REPO @R123@', [['2 CALN 123456789']]]];
                this.repositoryCitation.parseTree(tree, '5.5.1');
                expect(this.repositoryCitation.toGedcom(1,'5.5.1')).to.equal("1 REPO @(RepositoryId->R123, Notes->(), CallNbrs->((123456789, undefined)))@\n2 CALN 123456789");
            });

            it('testGedcomFull', function() {
                "use strict";
                this.repositoryCitation = new RepositoryCitation();
                var tree = [['1 REPO @R123@', [
                    ['2 CALN 123456789', [
                        ['3 MEDI digital book']]],
                    ['2 CALN 999999999'],
                    ['2 NOTE van Gogh Rocks!']]]];
                this.repositoryCitation.parseTree(tree, '5.5.1');
                expect(this.repositoryCitation.toGedcom(1,'5.5.1')).to.equal("1 REPO @(RepositoryId->R123, Notes->(\n(Version->5.5.1, Text->van Gogh Rocks!)), CallNbrs->((undefined, digital book), (999999999, undefined)))@\n2 CALN undefined\n3 MEDI digital book\n2 CALN 999999999\n2 NOTE van Gogh Rocks!");
            });
        });
});