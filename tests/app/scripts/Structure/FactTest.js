/**
 * Created by sahaque on 4/19/2017.
 */

describe('Fact', function() {
    before(function () {
        this.fact = new Fact();
    });
    describe('ParseTree', function() {
        it('testParse', function () {
            var tree = [['1 FACT Tripped', [['2 TYPE Accident']]]];
            this.fact.parseTree(tree, '5.5.1');
            expect(this.fact.toString()).to.equal("(Version->5.5.1, Tag->undefined, Description->undefined, Type->undefined, Date->undefined, Place->(Version->, Name->undefined, PlaceForm->undefined, Coordinates-> by ), Address->(Version->, Address->undefined, AddressLine1->undefined, AddressLine2->undefined, AddressLine3->undefined, City->undefined, State->undefined, PostalCode->undefined, Country->undefined, Phone->undefined, Email->undefined, FAX->undefined, WWW->undefined), Age->undefined, RespAgency->undefined, ReligiousAffiliation->undefined, Restriction->undefined, Cause->undefined)");
        });

        it('testParseFalse', function() {
            "use strict";
            this.fact = new Fact();
            var tree = [['1 FACT Tripped']];
            this.fact.parseTree(tree, '5.5.1');
            expect(this.fact.toString()).to.equal("(Version->5.5.1, Tag->undefined, Description->undefined, Type->undefined, Date->undefined, Place->(Version->, Name->undefined, PlaceForm->undefined, Coordinates-> by ), Address->(Version->, Address->undefined, AddressLine1->undefined, AddressLine2->undefined, AddressLine3->undefined, City->undefined, State->undefined, PostalCode->undefined, Country->undefined, Phone->undefined, Email->undefined, FAX->undefined, WWW->undefined), Age->undefined, RespAgency->undefined, ReligiousAffiliation->undefined, Restriction->undefined, Cause->undefined)");
        });

        it('testParseAllTypes', function() {
            "use strict";
            this.fact = new Fact();
            var types = this.fact.TYPES;
            var tree = [
                ['1 CAST', [['2 TYPE '+ types['CAST']]]],
                ['1 EDUC', [['2 TYPE '+ types['EDUC']]]],
                ['1 NATI', [['2 TYPE '+ types['NATI']]]],
                ['1 OCCU', [['2 TYPE '+ types['OCCU']]]],
                ['1 PROP', [['2 TYPE '+ types['PROP']]]],
                ['1 RELI', [['2 TYPE '+ types['RELI']]]],
                ['1 RESI', [['2 TYPE '+ types['RESI']]]],
                ['1 TITL', [['2 TYPE '+ types['TITL']]]],
                ['1 SSN', [['2 TYPE '+ types['SSN']]]],
                ['1 FACT Tripped', [['2 TYPE '+ types['FACT']]]]
            ];
            var keys = Object.keys(types);
            for (var i=0;i < keys.length;i++) {
                this.fact = new Fact();
                this.fact.parseTree(tree,'5.5.1', keys[i]);
                expect(this.fact.tag).to.equal(keys[i]);
                expect(types[keys[i]]).to.equal(this.fact.type);
            }
        });

        it('testParseTreeArray', function() {
            "use strict";
            this.fact = new Fact();
            var types = this.fact.TYPES;
            var tree = [
                ['1 CAST', [['2 TYPE '+ types['CAST']]]],
                ['1 EDUC', [['2 TYPE '+ types['EDUC']]]],
                ['1 NATI', [['2 TYPE '+ types['NATI']]]],
                ['1 OCCU', [['2 TYPE '+ types['OCCU']]]],
                ['1 PROP', [['2 TYPE '+ types['PROP']]]],
                ['1 RELI', [['2 TYPE '+ types['RELI']]]],
                ['1 RESI', [['2 TYPE '+ types['RESI']]]],
                ['1 TITL', [['2 TYPE '+ types['TITL']]]],
                ['1 SSN', [['2 TYPE '+ types['SSN']]]],
                ['1 FACT Tripped', [['2 TYPE '+ types['FACT']]]]
            ];
            var result = this.fact.parseTreeToArray(tree, '5.5.1');
            expect(result.length).to.equal(tree.length);

        });
    });

    describe('ToGedcom', function() {
        it('testGedcom', function () {
            this.fact = new Fact();
            var tree = [['1 FACT Tripped', [['2 TYPE Accident']]]];
            this.fact.parseTree(tree, '5.5.1', 'FACT');
            expect(this.fact.toGedcom(1, '5.5.1')).to.equal("1 FACT Tripped\n2 TYPE Accident");
        });
    });
});