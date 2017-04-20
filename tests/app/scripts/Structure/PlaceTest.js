/**
 * Created by sahaque on 4/19/2017.
 */

describe('PersonalName', function() {
    before(function () {
        this.place = new Place();
    });
    describe('ParseTree', function() {
        it('testParse', function () {
            var tree = [['2 PLAC Chicago, IL']];
            this.place.parseTree(tree, '5.5.1');
            expect(this.place.toString()).to.equal("(Version->5.5.1, Name->Chicago, IL, PlaceForm->undefined, Coordinates-> by )");
        });

        it('testParseFull', function() {
            "use strict";
            this.place = new Place();
            var tree = [['2 PLAC Chicago, IL', [
                ['3 FORM City, State'],
                ['3 MAP',[
                    ['4 LATI 100m'],
                    ['4 LONG 95h']]],
                ['1 NOTE van Gogh Rocks!']]]];
            this.place.parseTree(tree, '5.5.1');
            expect(this.place.toString()).to.equal("(Version->5.5.1, Name->Chicago, IL, PlaceForm->City, State, Coordinates->100m by 95h\n(Version->5.5.1, Text->van Gogh Rocks!))");
        });
    });
});