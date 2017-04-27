/**
 * Created by faiz on 4/26/2017.
 */

describe('MediaRecord', function() {
    before(function () {
        this.mediaRecord = new MediaRecord();
    });
    describe('ParseTree', function () {
        it('testParse', function () {
            this.mediaRecord.parseTree([['0 @O11XX@ OBJE']], '5.5.1');
            expect(this.mediaRecord.toString()).to.equal("O11XX");
        });

        it('testParseFull', function () {
            "use strict";
            this.mediaRecord = new MediaRecord();
            var tree = [['0 @O11XX@ OBJE', [
                ['1 FILE c:\MyBooks',[
                    ['2 FORM hardcover book'],
                    ['2 TITL THE van Gogh']]],
                ['1 REFN 113',[
                    ['2 TYPE hardcover book']]],
                ['1 RIN 42'],
                ['1 CHAN',[['2 DATE 2010-03-2']]],
                ['1 NOTE van Gogh Rocks!'],
                ['1 SOUR @S33@']
            ]]];
            this.mediaRecord.parseTree(tree, '5.5.1');
            expect(this.mediaRecord.toString()).to.equal("PEAR2\Genealogy\Gedcom\Records\MediaRecord(Id->O11XX, MediaFiles->(MediaFile->PEAR2\Genealogy\Gedcom\Structures\MediaFile(RefNbr->c:\MyBooks, Format->hardcover book, FormatType->, Title->THE van Gogh)), UserRefNbrs->(UserRefNbr->113 (hardcover book)), AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-2 , Notes->()), Citations->(\nPEAR2\Genealogy\Gedcom\Structures\Citation(Version->5.5.1, SourceId->S33, Page->, EventType->, RoleInEvent->, EntryDate->, Texts->(), Quay->, MediaLinks->(), Notes->())), Notes->(\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!)))");
        });
    });
    describe('ToGedcom', function () {
        it('toGedcom', function () {
            this.mediaRecord.toGedcom([['0 @O11XX@ OBJE']],'5.5.1');
            expect(this.mediaRecord.toString()).to.equal("0 @O11XX@ OBJE");
        });

        it('testParseFull', function () {
            "use strict";
            this.mediaRecord = new MediaRecord();
            var tree = [['0 @O11XX@ OBJE', [
                ['1 FILE c:\MyBooks',[
                    ['2 FORM hardcover book'],
                    ['2 TITL THE van Gogh']]],
                ['1 REFN 113',[
                    ['2 TYPE hardcover book']]],
                ['1 RIN 42'],
                ['1 CHAN 42',[['2 DATE 2010-03-2']]],
                ['1 NOTE van Gogh Rocks!'],
                ['1 SOUR @S33@']
            ]]];
            this.mediaRecord.parseTree(tree, '5.5.1');
            expect(this.mediaRecord.toString()).to.equal("0 @O11XX@ OBJE\n1 FILE c:\MyBooks\n2 FORM hardcover book\n2 TITL THE van Gogh\n1 REFN 113\n2 TYPE hardcover book\n1 RIN 42\n1 CHAN\n2 DATE 2010-03-2\n1 SOUR @S33@\n1 NOTE van Gogh Rocks!");
        });
    });
});