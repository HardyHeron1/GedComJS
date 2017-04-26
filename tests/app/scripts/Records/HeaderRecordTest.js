/**
 * Created by faiz on 4/26/2017.
 */

describe('HeaderRecord', function() {
    before(function () {
        this.headerRecord = new HeaderRecord();
    });
    describe('ParseTree', function () {
        it('testParse', function () {
            this.headerRecord.parseTree([['0 HEAD',
                [['1 SOUR 42'], ['2 DEST My Laptop']]]], '5.5.1');
            expect(this.familyRecord.toString()).to.equal("PEAR2\Genealogy\Gedcom\Records\HeaderRecord(SourceSystem->PEAR2\Genealogy\Gedcom\Structures\SourceSystem(SystemId->42, VerNbr->, ProductName->, Corporation->PEAR2\Genealogy\Gedcom\Structures\Corporation(Name->, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->)), Data->PEAR2\Genealogy\Gedcom\Structures\Data(SourceName->, Date->, Copyright->)), DestinationSystem->My Laptop, TransmissionDateTime->, SubmitterId->, SubmissionId->, Filename->, Copyright->, Language->, CharacterSet->PEAR2\Genealogy\Gedcom\Structures\CharacterSet(CharacterSet->, VerNbr->), GedC->PEAR2\Genealogy\Gedcom\Structures\GedC(VerNbr->, Form->LINEAGE-LINKED), PlaceForm->, Note->PEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->))");
        });

        it('testParseFull', function () {
            "use strict";
            this.headerRecord = new HeaderRecord();
            var tree = [['0 HEAD',
                [['1 SOUR 42',
                    [['2 VERS 1.0'],
                        ['2 NAME FamilyVanGogh'],
                        ['2 CORP van Gogh Enterprises',
                            [['3 ADDR 555 Brown Street',
                                [['4 CONT Brown City, Brownington'],
                                    ['4 CONT 55555'],
                                    ['4 ADR1 555 Brown Street'],
                                    ['4 ADR2 Brown City, Brownington'],
                                    ['4 ADR3 55555'],
                                    ['4 CITY Brown City'],
                                    ['4 POST 55555'],
                                    ['4 STAE Brownington']
                                        ['4 CTRY USA']
                                ]
                            ],
                                ['3 PHON 555-555-5555'],
                                ['3 FAX 555-555-5555'],
                                ['3 EMAIL tester@test.com'],
                                ['3 WWW www.test.com']
                            ]
                        ],
                        ['2 DATA Data Source',
                            [['3 DATE 2010-03-01', []],
                                ['3 COPR Line1']]]
                    ]
                ],
                    ['1 DEST My Laptop'],
                    ['1 DATE 2010-03-01', [['2 TIME 12:00:00EDT']]],
                    ['1 LANG English'],
                    ['1 FILE myged.ged'],
                    ['1 SUBM @S111@'],
                    ['1 SUBN @X111@'],
                    ['1 COPR 2010 Ed Thompson'],
                    ['1 PLAC', [['2 FORM Huh?']]],
                    ['1 GEDC', [['2 VERS 5.5.1']]],
                    ['1 CHAR UTF-8', [['2 VERS 1.0']]],
                    ['1 NOTE van Gogh Rocks!']
                ]]];
            this.headerRecord.parseTree(tree, '5.5.1');
            expect(this.familyRecord.toString()).to.equal("PEAR2\Genealogy\Gedcom\Records\HeaderRecord(SourceSystem->PEAR2\Genealogy\Gedcom\Structures\SourceSystem(SystemId->42, VerNbr->1.0, ProductName->FamilyVanGogh, Corporation->PEAR2\Genealogy\Gedcom\Structures\Corporation(Name->van Gogh Enterprises, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->555 Brown Street\nBrown City, Brownington\n55555, AddressLine1->555 Brown Street, AddressLine2->Brown City, Brownington, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com)), Data->PEAR2\Genealogy\Gedcom\Structures\Data(SourceName->Data Source, Date->2010-03-01, Copyright->Line1)), DestinationSystem->My Laptop, TransmissionDateTime->2010-03-01 12:00:00EDT, SubmitterId->S111, SubmissionId->X111, Filename->myged.ged, Copyright->2010 Ed Thompson, Language->English, CharacterSet->PEAR2\Genealogy\Gedcom\Structures\CharacterSet(CharacterSet->UTF-8, VerNbr->1.0), GedC->PEAR2\Genealogy\Gedcom\Structures\GedC(VerNbr->5.5.1, Form->LINEAGE-LINKED), PlaceForm->Huh?, Note->PEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->van Gogh Rocks!)");
        });
    });
});