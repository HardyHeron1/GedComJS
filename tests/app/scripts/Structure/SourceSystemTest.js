/**
 * Created by sahaque on 4/19/2017.
 */

describe('SourceSystem', function() {
    before(function () {
        this.sourceSystem = new SourceSystem();
    });
    describe('ParseTree', function() {
        it('testParse', function () {
            var tree = [['1 SOUR 42',
                [['2 VERS 1.0'],
                    ['2 NAME FamilyVanGogh']]]];
            this.sourceSystem.parseTree(tree, '5.5.1');
            expect(this.sourceSystem.toString()).to.equal("(SystemId.42, VerNbr.1.0, ProductName.FamilyVanGogh, Corporation.(Name->undefined, Address->(Version->, Address->undefined, AddressLine1->undefined, AddressLine2->undefined, AddressLine3->undefined, City->undefined, State->undefined, PostalCode->undefined, Country->undefined, Phone->undefined, Email->undefined, FAX->undefined, WWW->undefined)), Data.(SourceName->undefined, Date->undefined, Copyright->undefined))");
        });

        it('testParseFull', function() {
            "use strict";
            this.sourceSystem = new SourceSystem();
            var tree = [['1 SOUR 42',
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
            ]
            ];
            this.sourceSystem.parseTree(tree, '5.5.1');
            expect(this.sourceSystem.toString()).to.equal("(SystemId.42, VerNbr.1.0, ProductName.FamilyVanGogh, Corporation.(Name->van Gogh Enterprises, Address->(Version->5.5.1, Address->555 Brown Street\nBrown City, Brownington\n55555, AddressLine1->555 Brown Street, AddressLine2->undefined, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com)), Data.(SourceName->Data Source, Date->2010-03-01, Copyright->Line1))");
        });
    });
    describe('ToGedcom', function() {
        it('testGedcom', function () {
            this.sourceSystem = new SourceSystem();
            var tree = [['1 SOUR 42',
                [['2 VERS 1.0'],
                    ['2 NAME FamilyVanGogh']]]];
            this.sourceSystem.parseTree(tree, '5.5.1');
            expect(this.sourceSystem.toGedcom(1,'5.5.1')).to.equal("1 SOUR 42\n2 VERS 1.0\n2 NAME FamilyVanGogh\n");
        });

        it('testGedcomFull', function() {
            "use strict";
            this.sourceSystem = new SourceSystem();
            var tree = [['1 SOUR 42',
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
            ]
            ];
            this.sourceSystem.parseTree(tree, '5.5.1');
            expect(this.sourceSystem.toGedcom(1,'5.5.1')).to.equal("1 SOUR 42\n2 VERS 1.0\n2 NAME FamilyVanGogh\n1 SOUR 42\n2 VERS 1.0\n2 NAME FamilyVanGogh\n2 DATA Data Source\n3 DATE 2010-03-01\n3 COPR Line1");
        });
    });
});