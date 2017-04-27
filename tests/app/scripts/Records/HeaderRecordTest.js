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
            expect(this.headerRecord.toString()).to.equal("(SourceSystem->(SystemId.42, VerNbr.undefined, ProductName.undefined, Corporation.(Name->undefined, Address->(Version->, Address->undefined, AddressLine1->undefined, AddressLine2->undefined, AddressLine3->undefined, City->undefined, State->undefined, PostalCode->undefined, Country->undefined, Phone->undefined, Email->undefined, FAX->undefined, WWW->undefined)), Data.(SourceName->undefined, Date->undefined, Copyright->undefined)), DestinationSystem->My Laptop, TransmissionDateTime->undefined, SubmitterId->undefined, SubmissionId->undefined, Filename->undefined, Copyright->undefined, Language->undefined, CharacterSet->(CharacterSet->undefined, VerNbr->undefined), GedC->(VerNbr->undefined, Form->LINEAGE-LINKED), PlaceForm->undefined, Note->(Version->5.5.1, Text->undefined))");
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
                                    ['4 STAE Brownington'],
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
            expect(this.headerRecord.toString()).to.equal("(SourceSystem->(SystemId.42, VerNbr.1.0, ProductName.FamilyVanGogh, Corporation.(Name->van Gogh Enterprises, Address->(Version->5.5.1, Address->555 Brown Street\nBrown City, Brownington\n55555, AddressLine1->555 Brown Street, AddressLine2->undefined, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com)), Data.(SourceName->Data Source, Date->2010-03-01, Copyright->Line1)), DestinationSystem->My Laptop, TransmissionDateTime->2010-03-01 12:00:00EDT, SubmitterId->S111, SubmissionId->X111, Filename->myged.ged, Copyright->2010 Ed Thompson, Language->English, CharacterSet->(CharacterSet->UTF-8, VerNbr->1.0), GedC->(VerNbr->5.5.1, Form->LINEAGE-LINKED), PlaceForm->undefined, Note->(Version->5.5.1, Text->van Gogh Rocks!))");
        });
    });
    describe('ToGedcom', function() {
        "use strict";
        it('toGedcom', function(){
            this.headerRecord = new HeaderRecord();
            this.headerRecord.parseTree([['0 HEAD',[['1 SOUR 42']]]], '5.5.1');
            expect(this.headerRecord.toGedcom(0, '5.5.1')).to.equal("0 HEAD\n1 SOUR 42");
        });

        it('toGedcomfull', function(){
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
                                    ['4 STAE Brownington'],
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
            expect(this.headerRecord.toGedcom(0, '5.5.1')).to.equal("0 HEAD\n1 SOUR 42\n2 VERS 1.0\n2 NAME FamilyVanGogh\n2 CORP van Gogh Enterprises\n3 ADDR 555 Brown Street\n4 CONT Brown City, Brownington\n4 CONT 55555\n4 ADR1 555 Brown Street\n4 ADR3 55555\n4 CITY Brown City\n4 STAE Brownington\n4 POST 55555\n4 CTRY USA\n3 PHON 555-555-5555\n3 EMAIL tester@test.com\n3 FAX 555-555-5555\n3 WWW www.test.com\n2 DATA Data Source\n3 DATE 2010-03-01\n3 COPR Line1\n1 DEST My Laptop\n1 DATE 2010-03-01\n1 TIME 12:00:00EDT\n1 SUBM @S111@\n1 SUBN @X111@\n1 FILE myged.ged\n1 COPR 2010 Ed Thompson\n1 GEDC\n2 VERS 5.5.1\n2 FORM LINEAGE-LINKED\n1 CHAR UTF-8\n2 VERS 1.0\n1 LANG English\n1 NOTE van Gogh Rocks!");
        });
    });
});