/**
 * Created by sahaque on 4/19/2017.
 */

describe('MediaLink', function() {
    before(function () {
        this.mediaLink = new MediaLink();
    });
    describe('ParseTree', function() {
        it('testParseId', function () {
            var tree = [['1 OBJE @O111@']];
            this.mediaLink.parseTree(tree, '5.5.1');
            expect(this.mediaLink.toString()).to.equal("(Version->5.5.1, Id->O111)");
        });

        it('testParseText', function() {
            "use strict";
            this.mediaLink = new MediaLink();
            var tree = [['1 OBJE', [['2 TITL Mr Bojangles']]]];
            this.mediaLink.parseTree(tree, '5.5.1');
            expect(this.mediaLink.toString()).to.equal("(Version->5.5.1, Title->Mr Bojangles, MediaFiles->())");
        });

        it('testParseFull', function() {
            "use strict";
            this.mediaLink = new MediaLink();
            var tree = [['1 OBJE', [
                ['2 TITL Mr Bojangles'],
                ['2 FILE c:\my pictures', [
                    ['3 FORM JPG', [
                        ['4 TYPE digital']]]]],
                ['2 FILE c:\my music', [
                    ['3 FORM MP3', [
                        ['4 TYPE digital']]]]]
            ]]];
            this.mediaLink.parseTree(tree, '5.5.1');
            expect(this.mediaLink.toString()).to.equal("(Version->5.5.1, Title->Mr Bojangles, MediaFiles->(\n(RefNbr->c:my pictures, Format->JPG, FormatType->digital, Title->undefined)\n(RefNbr->c:my music, Format->MP3, FormatType->digital, Title->undefined)))");
        });
    });
});