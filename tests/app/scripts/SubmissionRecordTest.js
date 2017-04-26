/**
 * Created by sahaque on 4/26/2017.
 */
describe('SubmissionRecord', function() {
    before(function () {
        this.submissionRecord = new SubmissionRecord();
    });
    describe('ToString', function() {
        it('testStringFull', function () {
            this.submissionRecord.id = 'S321';
            this.submissionRecord.familyFileName = "van Gogh";
            this.submissionRecord.templeCode = "XXX";
            this.submissionRecord.generationsAncestors = 12;
            this.submissionRecord.generationsDescendants = 8;
            this.submissionRecord.ordinanceProcessFlag = 'I';
            this.submissionRecord.autoRecId = '42';
            this.submissionRecord.submitterId = '2222';
            this.submissionRecord.changeDate.date = '2010-03-10 12:00:00EST';
            this.submissionRecord.changeDate.notes = [new Note()];
            this.submissionRecord.changeDate.notes[0].text = 'I changed the record for testing';
            this.submissionRecord.notes = [new Note()];
            this.submissionRecord.notes[0].text = "My notes not your\nnotes.";
            expect(this.submissionRecord.toString()).to.equal("(Id->S321, SubmitterId->2222, FamilyFileName->van Gogh, TempleCode->XXX, GenerationsAncestors->12, GenerationsDescendants->8, OrdinanceProcessFlag->I, AutoRecId->42, ChangeDate->(Date->2010-03-10 12:00:00EST undefined, Notes->(\n(Version->, Text->I changed the record for testing))), Notes->(\n(Version->, Text->My notes not your\nnotes.)))");
        });
    });
    describe('ParseTree', function() {
        it('testParse', function() {
            "use strict";
            this.submissionRecord = new SubmissionRecord();
            var tree = [['0 @S22XX@ SUBN']];
            this.submissionRecord.parseTree(tree, '5.5.1');
            expect(this.submissionRecord.id).to.equal("S22XX");
        });
        it('testParseFull', function() {
            "use strict";
            this.submissionRecord = new SubmissionRecord();
            var tree = [['0 @S2222@ SUBN', [
                ['1 FAMF van Gogh'],
                ['1 TEMP XXX'],
                ['1 ANCE 12'],
                ['1 DESC 7'],
                ['1 ORDI I'],
                ['1 RIN 42'],
                ['1 SUBM @2222@'],
                ['1 CHAN ',[['2 DATE 2010-03-2']]],
                ['1 NOTE van Gogh Rocks!']
            ]]];
            this.submissionRecord.parseTree(tree, '5.5.1');
            expect(this.submissionRecord.toString()).to.equal("(Id->S2222, SubmitterId->2222, FamilyFileName->van Gogh, TempleCode->XXX, GenerationsAncestors->12, GenerationsDescendants->7, OrdinanceProcessFlag->I, AutoRecId->42, ChangeDate->(Date->2010-03-2 undefined, Notes->()), Notes->(\n(Version->5.5.1, Text->van Gogh Rocks!)))");
        });
    });
    describe('ToGedCom', function() {
        it('testGedcom', function () {
            "use strict";
            this.submissionRecord = new SubmissionRecord();
            var tree = [['0 @S22XX@ SUBN']];
            this.submissionRecord.parseTree(tree, '5.5.1');
            expect(this.submissionRecord.toGedcom(0, '5.5.1')).to.equal("0 @S22XX@ SUBN");
        });

        it('testGedcomFull', function () {
            "use strict";
            this.submissionRecord = new SubmissionRecord();
            var tree = [['0 @S2222@ SUBN', [
                ['1 FAMF van Gogh'],
                ['1 TEMP XXX'],
                ['1 ANCE 12'],
                ['1 DESC 7'],
                ['1 ORDI I'],
                ['1 RIN 42'],
                ['1 SUBM @2222@'],
                ['1 CHAN ',[['2 DATE 2010-03-2']]],
                ['1 NOTE van Gogh Rocks!']
            ]]];
            this.submissionRecord.parseTree(tree, '5.5.1');
            expect(this.submissionRecord.toGedcom(0, '5.5.1')).to.equal("0 @S2222@ SUBN\n1 FAMF van Gogh\n1 TEMP XXX\n1 ANCE 12\n1 DESC 7\n1 ORDI I\n1 RIN 42\n1 CHAN\n2 DATE 2010-03-2\n1 NOTE van Gogh Rocks!");
        });
    });
});