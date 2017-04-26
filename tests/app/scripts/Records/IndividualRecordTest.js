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
            expect(this.individualRecord.toString()).to.equal("I141");
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
            expect(this.familyRecord.toString()).to.equal("(Id->F001, Restriction->none, Events->(), Husband->I001, Wife->I002, Child->I003, Child->I004, Child->I005, CountOfChildren->14, LdsSealings->(), UserRefNbrs->(UserRefNbr->117 (comic)), AutoRecId->42, ChangeDate->(Date->2010-03-2 , Notes->()), SubmitterLinks->(Submitter->S001), Citations->(\n(Version->5.5.1, SourceId->S33, Page->, EventType->, RoleInEvent->, EntryDate->, Texts->(), Quay->, MediaLinks->(), Notes->())), MediaLinks->(");
        });
    });
    describe('ToGedcom', function () {
        it('toGedcom', function () {
            this.familyRecord.toGedcom([['0 @F001@ FAM']], '5.5.1');
            expect(this.familyRecord.toString()).to.equal("0 @F001@ FAM");
        });

        it('testParseFull', function () {
            "use strict";
            this.familyRecord = new FamilyRecord();
            var tree = [['0 @F001@ FAM',
                [['1 RESN none'],
                    ['1 HUSB @I001@'],
                    ['1 WIFE @I002@'],
                    ['1 CHIL @I003@'],
                    ['1 CHIL @I004@'],
                    ['1 CHIL @I005@'],
                    ['1 NCHI 14'],
                    ['1 SUBM @S001@'],
                    ['1 REFN 117'[['2 TYPE comic']]],
                    ['1 RIN 42'],
                    ['1 CHAN 42'[['2 DATE 2010-03-2']]],
                    ['1 NOTE van Gogh Rocks!'],
                    ['1 SOUR @S33@'],
                    ['1 OBJE @O14@']
                ]]];
            this.individualRecord.parseTree(tree, '5.5.1');
            expect(this.individualRecord.toString()).to.equal("PEAR2\Genealogy\Gedcom\Records\IndividualRecord(Id->I141, Restriction->none, Names->(\nPEAR2\Genealogy\Gedcom\Structures\PersonalName(Version->5.5.1, Name->PEAR2\Genealogy\Gedcom\Structures\Name(Version->5.5.1, Full->Vincent /van Gogh/, Type->, Pieces->PEAR2\Genealogy\Gedcom\Structures\NamePieces(Version->, Prefix->, Given->, NickName->, SurnamePrefix->, Surname->, Suffix->)))), Gender->M, Events->(\nPEAR2\Genealogy\Gedcom\Structures\FactDetail(Version->5.5.1, Tag->BIRT, Description->, Type->, Date->1900-01-05, Place->PEAR2\Genealogy\Gedcom\Structures\Place(Version->5.5.1, Name->, PlaceForm->, Coordinates-> by ), Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->5.5.1, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->), Age->, RespAgency->, ReligiousAffiliation->, Restriction->, Cause->)), Attributes->(\nPEAR2\Genealogy\Gedcom\Structures\FactDetail(Version->5.5.1, Tag->FACT, Description->Tripped, Type->, Date->1910-01-05, Place->PEAR2\Genealogy\Gedcom\Structures\Place(Version->5.5.1, Name->, PlaceForm->, Coordinates-> by ), Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->5.5.1, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->), Age->, RespAgency->, ReligiousAffiliation->, Restriction->, Cause->)), LdsOrdinances->(), ChildFamilyLinks->(PEAR2\Genealogy\Gedcom\Structures\FamilyLink(FamilyId->F00023, Notes->())), SpouseFamilyLinks->(PEAR2\Genealogy\Gedcom\Structures\FamilyLink(FamilyId->F0001, Notes->())), SubmitterLinks->(S001), Associations->(\nPEAR2\Genealogy\Gedcom\Structures\Association(Version->5.5.1, AssociateId->I49, Relationship->, Citations->(), Notes->())), Aliases->(I49), AncestorInterests->(I50), DescendantInterests->(I51), PermRecFileNbr->245, AncFileNbr->21, UserRefNbrs->(UserRefNbr->117 (comic)), AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-2 , Notes->()), Citations->(\nPEAR2\Genealogy\Gedcom\Structures\Citation(Version->5.5.1, SourceId->S33, Page->, EventType->, RoleInEvent->, EntryDate->, Texts->(), Quay->, MediaLinks->(), Notes->())), MediaLinks->(\nPEAR2\Genealogy\Gedcom\Structures\MediaLink(Version->5.5.1, Id->O14)), Notes->(\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!)))");
        });
    });
});