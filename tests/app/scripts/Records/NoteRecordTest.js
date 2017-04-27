/**
 * Created by faiz on 4/26/2017.
 */

describe('NoteRecord', function() {
    before(function () {
        this.noteRecord = new NoteRecord();
    });
    describe('ParseTree', function () {
        it('testParse', function () {
            this.noteRecord.parseTree([['0 @N111@ NOTE Hello Dolly!']], '5.5.1');
            expect(this.noteRecord.toString()).to.equal("PEAR2\Genealogy\Gedcom\Records\NoteRecord(Id->N111, Text->Hello Dolly!, UserRefNbrs->, AutoRecId->, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date-> , Notes->()), Citations->())");
        });

        it('testParseFull', function () {
            "use strict";
            this.noteRecord = new NoteRecord();
            var tree = [['0 @N111@ NOTE Hello Dolly!', [
                ['1 CONT van Gogh Rocks!'],
                ['1 REFN 113',[
                    ['2 TYPE box']]],
                ['1 RIN 42'],
                ['1 CHAN',[['2 DATE 2010-03-2']]],
                ['1 SOUR @S33@']
            ]]];
            this.noteRecord.parseTree(tree, '5.5.1');
            expect(this.noteRecord.toString()).to.equal("PEAR2\Genealogy\Gedcom\Records\NoteRecord(Id->N111, Text->Hello Dolly!\nvan Gogh Rocks!, UserRefNbrs->UserRefNbr->113 (box), AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-2 , Notes->()), Citations->(\nPEAR2\Genealogy\Gedcom\Structures\Citation(Version->5.5.1, SourceId->S33, Page->, EventType->, RoleInEvent->, EntryDate->, Texts->(), Quay->, MediaLinks->(), Notes->())))");
        });
    });
    describe('ToGedcom', function () {
        it('toGedcom', function () {
            this.noteRecord.toGedcom([['0 @N111@ NOTE Hello Dolly!']],'5.5.1');
            expect(this.noteRecord.toString()).to.equal("0 @N111@ NOTE Hello Dolly!");
        });

        it('testParseFull', function () {
            "use strict";
            this.noteRecord = new NoteRecord();
            var tree = [['0 @N111@ NOTE Hello Dolly!', [
                ['1 CONT van Gogh Rocks!'],
                ['1 REFN 113',[
                    ['2 TYPE box']]],
                ['1 RIN 42'],
                ['1 CHAN',[['2 DATE 2010-03-2']]],
                ['1 SOUR @S33@']
            ]]];
            this.noteRecord.parseTree(tree, '5.5.1');
            expect(this.noteRecord.toString()).to.equal("0 @N111@ NOTE Hello Dolly!\n1 CONT van Gogh Rocks!\n1 REFN 113\n2 TYPE box\n1 RIN 42\n1 CHAN\n2 DATE 2010-03-2\n1 SOUR @S33@");
        });
    });
});