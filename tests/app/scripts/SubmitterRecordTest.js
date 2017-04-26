/**
 * Created by sahaque on 4/26/2017.
 */
describe('submitterRecord', function() {
    before(function () {
        this.submitterRecord = new SubmitterRecord();
    });
    describe('ToString', function() {
        it('testStringFull', function () {
            this.submitterRecord.id = 'S321';
            this.submitterRecord.name = "Vincent van Gogh";
            this.submitterRecord.address.address = "555 Brown Street\nBrown City, Brownington\n55555";
            this.submitterRecord.address.addressLine1 = '555 Brown Street';
            this.submitterRecord.address.addressLine2 = 'Brown City, Brownington';
            this.submitterRecord.address.addressLine3 = '55555';
            this.submitterRecord.address.city = 'Brown City';
            this.submitterRecord.address.state = 'Brownington';
            this.submitterRecord.address.postalCode = '55555';
            this.submitterRecord.address.country = 'USA';
            this.submitterRecord.address.phone = '555-555-5555';
            this.submitterRecord.address.FAX = '555-555-5555';
            this.submitterRecord.address.WWW = 'www.test.com';
            this.submitterRecord.address.email = 'tester@test.com';
            this.submitterRecord.autoRecId = '42';
            this.submitterRecord.language = 'English';
            this.submitterRecord.submitterRefNbr = '2222';
            this.submitterRecord.changeDate.date = '2010-03-10 12:00:00EST';
            this.submitterRecord.changeDate.notes = [new Note()];
            this.submitterRecord.changeDate.notes[0].text = 'I changed the record for testing';
            this.submitterRecord.notes = [new Note()];
            this.submitterRecord.notes[0].text = "My notes not your\nnotes.";
            this.submitterRecord.mediaLinks = [new MediaLink()];
            this.submitterRecord.mediaLinks[0].id = "O45";
            expect(this.submitterRecord.toString()).to.equal("(Id->S321, Name->Vincent van Gogh, Address->(Version->, Address->555 Brown Street\nBrown City, Brownington\n55555, AddressLine1->555 Brown Street, AddressLine2->Brown City, Brownington, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com)\n(Version->, Id->O45), Language->English, SubmitterRefNbr->2222, AutoRecId->42, ChangeDate->(Date->2010-03-10 12:00:00EST undefined, Notes->(\n(Version->, Text->I changed the record for testing))), Notes->(\n(Version->, Text->My notes not your\nnotes.)))");
        });
    });
    describe('ParseTree', function() {
        it('testParse', function() {
            "use strict";
            this.submitterRecord = new SubmitterRecord();
            var tree = [['0 @S2222@ SUBM']];
            this.submitterRecord.parseTree(tree, '5.5.1');
            expect(this.submitterRecord.id).to.equal("S2222");
        });
        it('testParseFull', function() {
            "use strict";
            this.submitterRecord = new SubmitterRecord();
            var tree = [['0 @S2222@ SUBM', [
                ['1 NAME Vincent van Gogh'],
                ['1 ADDR 555 Brown Street',
                    [['2 CONT Brown City, Brownington'],
                        ['2 CONT 55555'],
                        ['2 ADR1 555 Brown Street'],
                        ['2 ADR2 Brown City, Brownington'],
                        ['2 ADR3 55555'],
                        ['2 CITY Brown City'],
                        ['2 POST 55555'],
                        ['2 STAE Brownington'],
                        ['2 CTRY USA']
                    ]
                ],
                ['1 PHON 555-555-5555'],
                ['1 FAX 555-555-5555'],
                ['1 EMAIL tester@test.com'],
                ['1 WWW www.test.com'],
                ['1 LANG English'],
                ['1 RIN 42'],
                ['1 RFN 2222222'],
                ['1 CHAN ',[['2 DATE 2010-03-2']]],
                ['1 NOTE van Gogh Rocks!'],
                ['1 OBJE @O14@']
            ]]];
            this.submitterRecord.parseTree(tree, '5.5.1');
            expect(this.submitterRecord.toString()).to.equal("(Id->S2222, Name->Vincent van Gogh, Address->(Version->5.5.1, Address->555 Brown Street\nBrown City, Brownington\n55555, AddressLine1->555 Brown Street, AddressLine2->undefined, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com)\n(Version->5.5.1, Id->O14), Language->English, SubmitterRefNbr->2222222, AutoRecId->42, ChangeDate->(Date->2010-03-2 undefined, Notes->()), Notes->(\n(Version->5.5.1, Text->van Gogh Rocks!)))");
        });
    });
    describe('ToGedCom', function() {
        it('testGedcom', function () {
            "use strict";
            this.submitterRecord = new SubmitterRecord();
            var tree = [['0 @S2222@ SUBM']];
            this.submitterRecord.parseTree(tree, '5.5.1');
            expect(this.submitterRecord.toGedcom(0, '5.5.1')).to.equal("0 @S2222@ SUBM");
        });

        it('testGedcomFull', function () {
            "use strict";
            this.submitterRecord = new SubmitterRecord();
            var tree = [['0 @S2222@ SUBM', [
                ['1 NAME Vincent van Gogh'],
                ['1 ADDR 555 Brown Street',
                    [['2 CONT Brown City, Brownington'],
                        ['2 CONT 55555'],
                        ['2 ADR1 555 Brown Street'],
                        ['2 ADR2 Brown City, Brownington'],
                        ['2 ADR3 55555'],
                        ['2 CITY Brown City'],
                        ['2 POST 55555'],
                        ['2 STAE Brownington'],
                        ['2 CTRY USA']
                    ]
                ],
                ['1 PHON 555-555-5555'],
                ['1 FAX 555-555-5555'],
                ['1 EMAIL tester@test.com'],
                ['1 WWW www.test.com'],
                ['1 LANG English'],
                ['1 RIN 42'],
                ['1 RFN 2222222'],
                ['1 CHAN ',[['2 DATE 2010-03-2']]],
                ['1 NOTE van Gogh Rocks!'],
                ['1 OBJE @O14@']
            ]]];
            this.submitterRecord.parseTree(tree, '5.5.1');
            expect(this.submitterRecord.toGedcom(0, '5.5.1')).to.equal("0 @S2222@ SUBM\n1 NAME Vincent van Gogh\n1 ADDR 555 Brown Street\n2 CONT Brown City, Brownington\n2 CONT 55555\n2 ADR1 555 Brown Street\n2 ADR3 55555\n2 CITY Brown City\n2 STAE Brownington\n2 POST 55555\n2 CTRY USA\n1 PHON 555-555-5555\n1 EMAIL tester@test.com\n1 FAX 555-555-5555\n1 WWW www.test.com\n1 OBJE @O14@\n1 RIN 42\n1 CHAN\n2 DATE 2010-03-2\n1 NOTE van Gogh Rocks!");
        });
    });
});