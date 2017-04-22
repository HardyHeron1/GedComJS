/**
 * Created by sahaque on 4/19/2017.
 */

describe('MediaFile', function() {
    before(function () {
        this.mediaFile = new MediaFile();
    });
    describe('ParseTree', function() {
        it('testParse', function () {
            var tree = [['1 FILE c:\my pictures']];
            this.mediaFile.parseTree(tree, '5.5.1');
            expect(this.mediaFile.toString()).to.equal("(RefNbr->c:my pictures, Format->undefined, FormatType->undefined, Title->undefined)");
        });

        it('testParseFull', function() {
            "use strict";
            this.mediaFile = new MediaFile();
            var tree = [['1 FILE c:\my pictures', [
                ['2 FORM JPG', [
                    ['3 TYPE digital']]],
                ['2 TITL My Man Vincent']]]];
            this.mediaFile.parseTree(tree, '5.5.1');
            expect(this.mediaFile.toString()).to.equal("(RefNbr->c:my pictures, Format->JPG, FormatType->digital, Title->My Man Vincent)");
        });
    });

    describe('ToGedcom', function() {
        it('testGedcom', function () {
            this.mediaFile = new MediaFile();
            var tree = [['1 FILE c:\my pictures']];
            this.mediaFile.parseTree(tree, '5.5.1');
            expect(this.mediaFile.toGedcom(1, '5.5.1')).to.equal("1 FILE c:\my pictures");
        });

        it('testGedcomFull', function() {
            "use strict";
            this.mediaFile = new MediaFile();
            var tree = [['1 FILE c:\my pictures', [
                ['2 FORM JPG', [
                    ['3 TYPE digital']]],
                ['2 TITL My Man Vincent']]]];
            this.mediaFile.parseTree(tree, '5.5.1');
            expect(this.mediaFile.toGedcom(1, '5.5.1')).to.equal("1 FILE c:\my pictures\n2 FORM JPG\n3 TYPE digital\n2 TITL My Man Vincent");
        });
    });
});