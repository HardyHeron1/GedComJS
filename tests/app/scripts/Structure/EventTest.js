/**
 * Created by sahaque on 4/19/2017.
 */

describe('Event', function() {
    before(function () {
        this.event = new Event();
    });
    describe('ParseTree', function() {
        it('testParse', function () {
            var tree = [['1 EVEN Tripped', [['2 TYPE Accident']]]];
            this.event.parseTree(tree, '5.5.1');
            expect(this.event.toString()).to.equal("(Version->5.5.1, Tag->EVEN, Description->Tripped, Type->Accident, Date->undefined, Place->(Version->5.5.1, Name->undefined, PlaceForm->undefined, Coordinates-> by ), Address->(Version->5.5.1, Address->undefined, AddressLine1->undefined, AddressLine2->undefined, AddressLine3->undefined, City->undefined, State->undefined, PostalCode->undefined, Country->undefined, Phone->undefined, Email->undefined, FAX->undefined, WWW->undefined), Age->undefined, RespAgency->undefined, ReligiousAffiliation->undefined, Restriction->undefined, Cause->undefined)");
        });

        it('testParseFalse', function() {
            "use strict";
            this.event = new Event();
            var tree = [['1 GOGH Art']];
            this.event.parseTree(tree, '5.5.1');
            expect(this.event.toString()).to.equal("(Version->5.5.1, Tag->undefined, Description->undefined, Type->undefined, Date->undefined, Place->(Version->5.5.1, Name->undefined, PlaceForm->undefined, Coordinates-> by ), Address->(Version->5.5.1, Address->undefined, AddressLine1->undefined, AddressLine2->undefined, AddressLine3->undefined, City->undefined, State->undefined, PostalCode->undefined, Country->undefined, Phone->undefined, Email->undefined, FAX->undefined, WWW->undefined), Age->undefined, RespAgency->undefined, ReligiousAffiliation->undefined, Restriction->undefined, Cause->undefined)");
        });

        it('testParseAllTypes', function() {
            "use strict";
            this.event = new Event();
            var types = this.event._TYPES;
            var tree = [
                ['1 ADOP', [['2 TYPE '+ types['ADOP']]]],
                ['1 BIRT', [['2 TYPE '+ types['BIRT']]]],
                ['1 BAPM', [['2 TYPE '+ types['BAPM']]]],
                ['1 BASM', [['2 TYPE '+ types['BASM']]]],
                ['1 BLES', [['2 TYPE '+ types['BLES']]]],
                ['1 BARM', [['2 TYPE '+ types['BARM']]]],
                ['1 BURI', [['2 TYPE '+ types['BURI']]]],
                ['1 CENS', [['2 TYPE '+ types['CENS']]]],
                ['1 CHR', [['2 TYPE '+ types['CHR']]]],
                ['1 CHRA', [['2 TYPE '+ types['CHRA']]]],
                ['1 CONF', [['2 TYPE '+ types['CONF']]]],
                ['1 CREM', [['2 TYPE '+ types['CREM']]]],
                ['1 DEAT', [['2 TYPE '+ types['DEAT']]]],
                ['1 EMIG', [['2 TYPE '+ types['EMIG']]]],
                ['1 FCOM', [['2 TYPE '+ types['FCOM']]]],
                ['1 GRAD', [['2 TYPE '+ types['GRAD']]]],
                ['1 IMMI', [['2 TYPE '+ types['IMMI']]]],
                ['1 NATU', [['2 TYPE '+ types['NATU']]]],
                ['1 ORDN', [['2 TYPE '+ types['ORDN']]]],
                ['1 RETI', [['2 TYPE '+ types['RETI']]]],
                ['1 PROB', [['2 TYPE '+ types['PROB']]]],
                ['1 WILL', [['2 TYPE '+ types['WILL']]]],
                ['1 ANUL', [['2 TYPE '+ types['ANUL']]]],
                ['1 DIV', [['2 TYPE '+ types['DIV']]]],
                ['1 DIVF', [['2 TYPE '+ types['DIVF']]]],
                ['1 ENG', [['2 TYPE '+ types['ENG']]]],
                ['1 MARB', [['2 TYPE '+ types['MARB']]]],
                ['1 MARS', [['2 TYPE '+ types['MARS']]]],
                ['1 MARR', [['2 TYPE '+ types['MARR']]]],
                ['1 MARC', [['2 TYPE '+ types['MARC']]]],
                ['1 MARL', [['2 TYPE '+ types['MARL']]]],
                ['1 RESI', [['2 TYPE '+ types['RESI']]]],
                ['1 EVEN Tripped', [['2 TYPE '+ types['EVEN']]]]
            ];
            var keys = Object.keys(types);
            for (var i=0;i < keys.length;i++) {
                this.event = new Event();
                this.event.parseTree(tree,'5.5.1', keys[i]);
                expect(this.event.tag).to.equal(keys[i]);
                expect(types[keys[i]]).to.equal(this.event.type);
            }
        });

        it('testParseTreeArray', function() {
            "use strict";
            this.event = new Event();
            var types = this.event._TYPES;
            var tree = [
                ['1 ADOP', [['2 TYPE '+ types['ADOP']]]],
                ['1 BIRT', [['2 TYPE '+ types['BIRT']]]],
                ['1 BAPM', [['2 TYPE '+ types['BAPM']]]],
                ['1 BASM', [['2 TYPE '+ types['BASM']]]],
                ['1 BLES', [['2 TYPE '+ types['BLES']]]],
                ['1 BARM', [['2 TYPE '+ types['BARM']]]],
                ['1 BURI', [['2 TYPE '+ types['BURI']]]],
                ['1 CENS', [['2 TYPE '+ types['CENS']]]],
                ['1 CHR', [['2 TYPE '+ types['CHR']]]],
                ['1 CHRA', [['2 TYPE '+ types['CHRA']]]],
                ['1 CONF', [['2 TYPE '+ types['CONF']]]],
                ['1 CREM', [['2 TYPE '+ types['CREM']]]],
                ['1 DEAT', [['2 TYPE '+ types['DEAT']]]],
                ['1 EMIG', [['2 TYPE '+ types['EMIG']]]],
                ['1 FCOM', [['2 TYPE '+ types['FCOM']]]],
                ['1 GRAD', [['2 TYPE '+ types['GRAD']]]],
                ['1 IMMI', [['2 TYPE '+ types['IMMI']]]],
                ['1 NATU', [['2 TYPE '+ types['NATU']]]],
                ['1 ORDN', [['2 TYPE '+ types['ORDN']]]],
                ['1 RETI', [['2 TYPE '+ types['RETI']]]],
                ['1 PROB', [['2 TYPE '+ types['PROB']]]],
                ['1 WILL', [['2 TYPE '+ types['WILL']]]],
                ['1 ANUL', [['2 TYPE '+ types['ANUL']]]],
                ['1 DIV', [['2 TYPE '+ types['DIV']]]],
                ['1 DIVF', [['2 TYPE '+ types['DIVF']]]],
                ['1 ENG', [['2 TYPE '+ types['ENG']]]],
                ['1 MARB', [['2 TYPE '+ types['MARB']]]],
                ['1 MARS', [['2 TYPE '+ types['MARS']]]],
                ['1 MARR', [['2 TYPE '+ types['MARR']]]],
                ['1 MARC', [['2 TYPE '+ types['MARC']]]],
                ['1 MARL', [['2 TYPE '+ types['MARL']]]],
                ['1 RESI', [['2 TYPE '+ types['RESI']]]],
                ['1 EVEN Tripped', [['2 TYPE '+ types['EVEN']]]]
            ];
            var result = this.event.parseTreeToArray(tree, '5.5.1');
            expect(result.length).to.equal(tree.length);

        });
    });
    describe('ToGedcom', function() {
        it('testGedcom', function () {
            this.event = new Event();
            var tree = [['1 EVEN Tripped', [['2 TYPE Accident']]]];
            this.event.parseTree(tree, '5.5.1');
            expect(this.event.toGedcom(1, '5.5.1')).to.equal("1 EVEN Tripped\n2 TYPE Accident");
        });
    });
});