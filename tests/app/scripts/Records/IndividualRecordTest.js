/**
 * Created by faiz on 4/26/2017.
 */

describe('IndividualRecord', function() {
    before(function () {
        this.individualRecord = new IndividualRecord();
    });
    describe('ParseTree', function () {
        it('testParse', function () {
            this.individualRecord.parseTree([['0 @I141@ INDI']], '5.5.1');
            expect(this.individualRecord.id).to.equal("I141");
        });

        it('testParseFull', function () {
            "use strict";
            this.individualRecord = new IndividualRecord();
            var tree = [['0 @I141@ INDI',[
                ['1 RESN none'],
                ['1 NAME Vincent /van Gogh/'],
                ['1 SEX M'],
                ['1 ALIA @I49@'],
                ['1 ANCI @I50@'],
                ['1 DESI @I51@'],
                ['1 FAMS @F0001@'],
                ['1 FAMC @F00023@'],
                ['1 RFN 245'],
                ['1 AFN 21'],
                ['1 ASSO @I49@'],
                ['1 BIRT',[
                    ['2 DATE 1900-01-05']]],
                ['1 FACT Tripped',[
                    ['2 DATE 1910-01-05']]],
                ['1 SUBM @S001@'],
                ['1 REFN 117',[
                    ['2 TYPE comic']]],
                ['1 RIN 42'],
                ['1 CHAN 42',[['2 DATE 2010-03-2']]],
                ['1 NOTE van Gogh Rocks!'],
                ['1 SOUR @S33@'],
                ['1 OBJE @O14@']
            ]]];
            this.individualRecord.parseTree(tree, '5.5.1');
            expect(this.individualRecord.toString()).to.equal("(Id->I141, Restriction->none, Names->(\n(Version->5.5.1, Name->(Version->5.5.1, Full->Vincent /van Gogh/, Type->undefined, Pieces->(Version->, Prefix->undefined, Given->undefined, NickName->undefined, SurnamePrefix->undefined, Surname->undefined, Suffix->undefined)))), Gender->M, Events->(\n(Version->5.5.1, Tag->BIRT, Description->, Type->undefined, Date->1900-01-05, Place->(Version->5.5.1, Name->undefined, PlaceForm->undefined, Coordinates-> by ), Address->(Version->5.5.1, Address->undefined, AddressLine1->undefined, AddressLine2->undefined, AddressLine3->undefined, City->undefined, State->undefined, PostalCode->undefined, Country->undefined, Phone->undefined, Email->undefined, FAX->undefined, WWW->undefined), Age->undefined, RespAgency->undefined, ReligiousAffiliation->undefined, Restriction->undefined, Cause->undefined)), Attributes->(\n(Version->5.5.1, Tag->FACT, Description->Tripped, Type->undefined, Date->1910-01-05, Place->(Version->5.5.1, Name->undefined, PlaceForm->undefined, Coordinates-> by ), Address->(Version->5.5.1, Address->undefined, AddressLine1->undefined, AddressLine2->undefined, AddressLine3->undefined, City->undefined, State->undefined, PostalCode->undefined, Country->undefined, Phone->undefined, Email->undefined, FAX->undefined, WWW->undefined), Age->undefined, RespAgency->undefined, ReligiousAffiliation->undefined, Restriction->undefined, Cause->undefined)), LdsOrdinances->(), ChildFamilyLinks->((FamilyId->F00023, Notes->())), SpouseFamilyLinks->((FamilyId->F0001, Notes->())), SubmitterLinks->(S001), Associations->(\n(Version->5.5.1, AssociateId->I49, Relationship->undefined, Citations->(), Notes-> ())), Aliases->(I49), AncestorInterests->(I50), DescendantInterests->(I51), PermRecFileNbr->245, AncFileNbr->21, UserRefNbrs->(UserRefNbr->117 (comic)), AutoRecId->42, ChangeDate->(Date->2010-03-2 undefined, Notes->()), Citations->(\n(Version->5.5.1, SourceId->S33, Page->undefined, EventType->undefined, RoleInEvent->undefined, EntryDate->undefined, Texts->(), Quay->undefined, MediaLinks->(), Notes->())), MediaLinks->(\n(Version->5.5.1, Id->O14)), Notes->(\n(Version->5.5.1, Text->van Gogh Rocks!)))");
        });
    });
    describe('ToGedcom', function () {
        it('toGedcom', function () {
            this.individualRecord = new IndividualRecord();
            this.individualRecord.parseTree([['0 @I141@ INDI']], '5.5.1');
            expect(this.individualRecord.toGedcom(0, '5.5.1')).to.equal("0 @I141@ INDI");
        });

        it('testGedcomFull', function () {
            "use strict";
            this.individualRecord = new IndividualRecord();
            var tree = [['0 @I141@ INDI',[
                ['1 RESN none'],
                ['1 NAME Vincent /van Gogh/'],
                ['1 SEX M'],
                ['1 ALIA @I49@'],
                ['1 ANCI @I50@'],
                ['1 DESI @I51@'],
                ['1 FAMS @F0001@'],
                ['1 FAMC @F00023@'],
                ['1 RFN 245'],
                ['1 AFN 21'],
                ['1 ASSO @I49@'],
                ['1 BIRT',[
                    ['2 DATE 1900-01-05']]],
                ['1 FACT Tripped',[
                    ['2 DATE 1910-01-05']]],
                ['1 SUBM @S001@'],
                ['1 REFN 117',[
                    ['2 TYPE comic']]],
                ['1 RIN 42'],
                ['1 CHAN 42',[['2 DATE 2010-03-2']]],
                ['1 NOTE van Gogh Rocks!'],
                ['1 SOUR @S33@'],
                ['1 OBJE @O14@']
            ]]];
            this.individualRecord.parseTree(tree, '5.5.1');
            expect(this.individualRecord.toGedcom(0, '5.5.1')).to.equal("0 @I141@ INDI\n1 RESN none\n1 NAME Vincent /van Gogh/\n1 SEX M\n1 BIRT\n2 DATE 1900-01-05\n1 FACT Tripped\n2 DATE 1910-01-05\n1 FAMC @F00023@\n1 FAMS @F0001@\n1 SUBM @S001@\n1 ASSO @I49@\n1 ALIA @I49@\n1 ANCI @I50@\n1 DESI @I51@\n1 RFN 245\n1 AFN 21\n1 REFN 117\n2 TYPE comic\n1 RIN 42\n1 CHAN\n2 DATE 2010-03-2\n1 SOUR @S33@\n1 OBJE @O14@\n1 NOTE van Gogh Rocks!");
        });
    });
});