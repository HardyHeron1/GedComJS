/**
 * Created by sahaque on 4/19/2017.
 */


describe('Address', function() {
    before(function () {
        this.address = new Address();
    });
    describe('ParseTree', function() {
        it('testParse', function () {
            this.address.parseTree([['1 ADDR Address Line 0']], '5.5.1');
            expect(this.address.toString()).to.equal("(Version->5.5.1, Address->Address Line 0, AddressLine1->undefined, AddressLine2->undefined, AddressLine3->undefined, City->undefined, State->undefined, PostalCode->undefined, Country->undefined, Phone->undefined, Email->undefined, FAX->undefined, WWW->undefined)");
        });

        it('testParseFull', function() {
            "use strict";
            this.address = new Address();
            var tree = [['1 ADDR 555 Brown Street',
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
                ['1 WWW www.test.com']
            ];
            this.address.parseTree(tree, '5.5.1');
            expect(this.address.toString()).to.equal("(Version->5.5.1, Address->555 Brown Street\nBrown City, Brownington\n55555, AddressLine1->555 Brown Street, AddressLine2->undefined, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com)");
        });
    });
});