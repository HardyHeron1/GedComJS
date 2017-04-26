/**
 * Created by sahaque on 4/26/2017.
 */
describe('SourceRecord', function() {
    before(function () {
        this.sourceRecord = new SourceRecord();
    });
    describe('ToString', function() {
        it('testStringFull', function () {
            this.sourceRecord.id = 'S321';
            this.sourceRecord.sourceData = [new SourceData()];
            this.sourceRecord.sourceData[0].recordedEvents = [{
                'Types': 'BIRT',
                'Date': '2010-03-01',
                'Jurisdiction': 'City of Charlotte'
            }];
            this.sourceRecord.sourceData[0].responsibleAgency = 'Dept of Vital Records';
            this.sourceRecord.author = 'van Gogh';
            this.sourceRecord.title = "XXX";
            this.sourceRecord.abbreviatedTitle = "X";
            this.sourceRecord.publicationFacts = "New York City, New York";
            this.sourceRecord.text = "I was born";
            this.sourceRecord.repositoryCitations = [new RepositoryCitation()];
            this.sourceRecord.repositoryCitations[0].repositoryId = 'R123';
            this.sourceRecord.repositoryCitations[0].callNbrs = [{'Nbr': '123456789', 'Media': 'Book'}];
            this.sourceRecord.userRefNbrs = [{'Nbr': '14', 'Type': 'MyType'}];
            this.sourceRecord.autoRecId = '42';
            this.sourceRecord.changeDate.date = '2010-03-10 12:00:00EST';
            this.sourceRecord.changeDate.notes = [new Note()];
            this.sourceRecord.changeDate.notes[0].text = 'I changed the record for testing';
            this.sourceRecord.notes = [new Note()];
            this.sourceRecord.notes[0].text = "Hi";
            this.sourceRecord.mediaLinks = [new MediaLink()];
            this.sourceRecord.mediaLinks[0].id = "O45";
            expect(this.sourceRecord.toString()).to.equal("(Id->S321, Author->van Gogh, Title->XXX, AbbreviatedTitle->X, PublicationFacts->New York City, New York, Text->I was born, SourceData->(\n(RecordedEvents->(RecordedEvent->BIRT 2010-03-01 (City of Charlotte)), ResponsibleAgency->Dept of Vital Records, Notes->())), SourceRepositoryCitations->(\n(RepositoryId->R123, Notes->(), CallNbrs->((123456789, Book)))), UserRefNbrs->(UserRefNbr->14 (MyType)), AutoRecId->42, ChangeDate->(Date->2010-03-10 12:00:00EST undefined, Notes->(\n(Version->, Text->I changed the record for testing))), MediaLinks->(\n(Version->, Id->O45)), Notes->(\n(Version->, Text->Hi)))");
        });
    });
    describe('ParseTree', function() {
        it('testParse', function() {
            "use strict";
            this.sourceRecord = new SourceRecord();
            var tree = [['0 @S321@ SOUR']];
            this.sourceRecord.parseTree(tree, '5.5.1');
            expect(this.sourceRecord.id).to.equal("S321");
        });
        it('testParseFull', function() {
            "use strict";
            this.sourceRecord = new SourceRecord();
            var tree = [['0 @S321@ SOUR', [
                ['1 DATA', [
                    ['2 EVEN BIRT', [
                        ['3 PLAC City of Charlotte'],
                        ['3 DATE 2010-03-01']]],
                    ['2 AGNC Dept of Vital Records']]],
                ['1 AUTH van Gogh'],
                ['1 TITL XXX'],
                ['1 ABBR X'],
                ['1 TEXT I was born'],
                ['1 PUBL New York City, New York'],
                ['1 REPO @R123@', [
                    ['2 CALN 123456789', [
                        ['3 MEDI Book']]]]],
                ['1 REFN 14',[
                    ['2 TYPE MyType']]],
                ['1 RIN 42'],
                ['1 CHAN ',[['2 DATE 2010-03-2']]],
                ['1 NOTE Hi'],
                ['1 OBJE @O45@']
            ]]];
            this.sourceRecord.parseTree(tree, '5.5.1');
            expect(this.sourceRecord.toString()).to.equal("(Id->S321, Author->van Gogh, Title->XXX, AbbreviatedTitle->X, PublicationFacts->New York City, New York, Text->I was born, SourceData->(\n(RecordedEvents->(RecordedEvent->BIRT 2010-03-01 (City of Charlotte)), ResponsibleAgency->Dept of Vital Records, Notes->())), SourceRepositoryCitations->(\n(RepositoryId->R123, Notes->(), CallNbrs->((123456789, Book)))), UserRefNbrs->(UserRefNbr->14 (MyType)), AutoRecId->42, ChangeDate->(Date->2010-03-2 undefined, Notes->()), MediaLinks->(\n(Version->5.5.1, Id->O45)), Notes->(\n(Version->5.5.1, Text->Hi)))");
        });
    });
    describe('ToGedCom', function() {
        it('testGedcom', function () {
            "use strict";
            this.sourceRecord = new SourceRecord();
            var tree = [['0 @S321@ SOUR']];
            this.sourceRecord.parseTree(tree, '5.5.1');
            expect(this.sourceRecord.toGedcom(0, '5.5.1')).to.equal("0 @S321@ SOUR");
        });

        it('testGedcomFull', function () {
            "use strict";
            this.sourceRecord = new SourceRecord();
            var tree = [['0 @S321@ SOUR', [
                ['1 DATA', [
                    ['2 EVEN BIRT', [
                        ['3 PLAC City of Charlotte'],
                        ['3 DATE 2010-03-01']]],
                    ['2 AGNC Dept of Vital Records']]],
                ['1 AUTH van Gogh'],
                ['1 TITL XXX'],
                ['1 ABBR X'],
                ['1 TEXT I was born'],
                ['1 PUBL New York City, New York'],
                ['1 REPO @R123@', [
                    ['2 CALN 123456789', [
                        ['3 MEDI Book']]]]],
                ['1 REFN 14',[
                    ['2 TYPE MyType']]],
                ['1 RIN 42'],
                ['1 CHAN ',[['2 DATE 2010-03-2']]],
                ['1 NOTE Hi'],
                ['1 OBJE @O45@']
            ]]];
            this.sourceRecord.parseTree(tree, '5.5.1');
            expect(this.sourceRecord.toGedcom(0, '5.5.1')).to.equal("0 @S321@ SOUR\n1 DATA\n2 EVEN BIRT\n3 DATE 2010-03-01\n3 PLAC City of Charlotte\n2 AGNC Dept of Vital Records\n1 AUTH van Gogh\n1 TITL XXX\n1 ABBR X\n1 PUBL New York City, New York\n1 TEXT I was born\n1 REPO @(RepositoryId->R123, Notes->(), CallNbrs->((123456789, Book)))@\n2 CALN 123456789\n3 MEDI Book\n1 REFN 14\n2 TYPE MyType\n1 RIN 42\n1 CHAN\n2 DATE 2010-03-2\n1 NOTE Hi\n1 OBJE @O45@");
        });
    });
});