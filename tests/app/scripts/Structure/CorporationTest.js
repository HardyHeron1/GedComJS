/**
 * Created by sahaque on 4/19/2017.
 */

/**
 * Created by sahaque on 4/19/2017.
 */

describe('Corporation', function() {
    before(function () {
        this.corporation = new Corporation();
    });
    describe('ParseTree', function() {
        it('testParse', function () {
            var tree = [['1 CORP van Gogh Enterprises']];
            this.corporation.parseTree(tree, '5.5.1');
            expect(this.corporation.toString()).to.equal("(Name->van Gogh Enterprises, Address->(Version->, Address->undefined, AddressLine1->undefined, AddressLine2->undefined, AddressLine3->undefined, City->undefined, State->undefined, PostalCode->undefined, Country->undefined, Phone->undefined, Email->undefined, FAX->undefined, WWW->undefined))");
        });

        it('testParseFull', function() {
            "use strict";
            this.corporation = new Corporation();
            var tree = [['1 CORP van Gogh Enterprises',
                [['2 ADDR 555 Brown Street',
                    [['3 CONT Brown City, Brownington'],
                        ['3 CONT 55555'],
                        ['3 ADR1 555 Brown Street'],
                        ['3 ADR2 Brown City, Brownington'],
                        ['3 ADR3 55555'],
                        ['3 CITY Brown City'],
                        ['3 POST 55555'],
                        ['3 STAE Brownington'],
                        ['3 CTRY USA']
                    ]
                    ],
                    ['2 PHON 555-555-5555'],
                    ['2 FAX 555-555-5555'],
                    ['2 EMAIL tester@test.com'],
                    ['2 WWW www.test.com']]]
            ];
            this.corporation.parseTree(tree, '5.5.1');
            expect(this.corporation.toString()).to.equal("(Name->van Gogh Enterprises, Address->(Version->5.5.1, Address->555 Brown Street\nBrown City, Brownington\n55555, AddressLine1->555 Brown Street, AddressLine2->undefined, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com))");
        });
    });

    describe('ToGedcom', function() {
        it('testGedcom', function () {
            this.corporation = new Corporation();
            var tree = [['1 CORP van Gogh Enterprises']];
            this.corporation.parseTree(tree, '5.5.1');
            expect(this.corporation.toGedcom(1, '5.5.1')).to.equal("1 CORP van Gogh Enterprises");
        });

        it('testGedcomFull', function() {
            "use strict";
            this.corporation = new Corporation();
            var tree = [['1 CORP van Gogh Enterprises',
                [['2 ADDR 555 Brown Street',
                    [['3 CONT Brown City, Brownington'],
                        ['3 CONT 55555'],
                        ['3 ADR1 555 Brown Street'],
                        ['3 ADR2 Brown City, Brownington'],
                        ['3 ADR3 55555'],
                        ['3 CITY Brown City'],
                        ['3 POST 55555'],
                        ['3 STAE Brownington'],
                        ['3 CTRY USA']
                    ]
                ],
                    ['2 PHON 555-555-5555'],
                    ['2 FAX 555-555-5555'],
                    ['2 EMAIL tester@test.com'],
                    ['2 WWW www.test.com']]]
            ];
            this.corporation.parseTree(tree, '5.5.1');
            expect(this.corporation.toGedcom(1, '5.5.1')).to.equal("1 CORP van Gogh Enterprises\n2 ADDR 555 Brown Street\n3 CONT Brown City, Brownington\n3 CONT 55555\n3 ADR1 555 Brown Street\n3 ADR3 55555\n3 CITY Brown City\n3 STAE Brownington\n3 POST 55555\n3 CTRY USA\n2 PHON 555-555-5555\n2 EMAIL tester@test.com\n2 FAX 555-555-5555\n2 WWW www.test.com");
        });
    });
});