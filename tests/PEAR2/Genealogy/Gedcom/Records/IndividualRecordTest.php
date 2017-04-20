<?php
namespace PEAR2\Genealogy\Gedcom\Records;
use PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

//TODO Add tests
class IndividualRecordTest extends \PHPUnit_Framework_TestCase
{
    public function testEmtpyObjectString()
    {
        $a = new IndividualRecord();
        $expected = "PEAR2\Genealogy\Gedcom\Records\IndividualRecord(Id->, Restriction->, Names->(), Gender->, Events->(), Attributes->(), LdsOrdinances->(), ChildFamilyLinks->(), SpouseFamilyLinks->(), SubmitterLinks->(), Associations->(), Aliases->(), AncestorInterests->(), DescendantInterests->(), PermRecFileNbr->, AncFileNbr->, UserRefNbrs->(), AutoRecId->, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date-> , Notes->()), Citations->(), MediaLinks->(), Notes->())";
        $this->assertSame($expected, '' . $a);
    }
    public function testStringFull()
    {
        $a = new IndividualRecord();
        $a->Id = 'I141';
        $a->Restriction = 'none';
        $a->Names[0] = new Structures\PersonalName();
        $a->Names[0]->Name->Full = 'Vincent /van Gogh/';
        $a->Gender = 'M';
        $a->Events[0] = new Structures\Event();
        $a->Events[0]->Tag = 'EVEN';
        $a->Events[0]->Descr = 'Tripped';
        $a->Events[0]->Type = 'Accident';
        $a->Attributes[0] = new Structures\Fact();
        $a->Attributes[0]->Tag = 'FACT';
        $a->Attributes[0]->Descr = 'Missing Ear';
        $a->Aliases[0] = 'I001';
        $a->AncestorInterests[0] = 'I002';
        $a->DescendantInterests[0] = 'I003';
        $a->UserRefNbrs[0]['Nbr'] = '14';
        $a->UserRefNbrs[0]['Type'] = 'MyType';
        $a->AutoRecId = '42';
        $a->ChangeDate->Date = '2010-03-10 12:00:00EST';
        $a->ChangeDate->Notes[0] = new Structures\Note();
        $a->ChangeDate->Notes[0]->Text = 'I changed the record for testing';
        $a->Notes[0] = new Structures\Note();
        $a->Notes[0]->Text = "Hi";
        $a->MediaLinks[0] = new Structures\MediaLink();
        $a->MediaLinks[0]->Id = "O45";
        $a->SubmitterLinks[0] = 'S666';
        $a->Citations[0] = new Structures\Citation();
        $a->Citations[0]->SourceId = "S45";
        $a->PermRecFileNbr = '777';
        $a->AncFileNbr = '888';
        $a->SpouseFamilyLinks[0] = new Structures\FamilyLink();
        $a->SpouseFamilyLinks[0]->FamilyId = 'F191';
        $a->ChildFamilyLinks[0] = new Structures\FamilyLink();
        $a->ChildFamilyLinks[0]->FamilyId = 'F192';
        $a->Associations[0] = new Structures\Association();
        $a->Associations[0]->AssociateId = 'I191';
        $a->Associations[0]->Relationship = 'GodFather';
        $expected = "PEAR2\Genealogy\Gedcom\Records\IndividualRecord(Id->I141, Restriction->none, Names->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\PersonalName(Version->, Name->PEAR2\Genealogy\Gedcom\Structures\Name(Version->, Full->Vincent /van Gogh/, Type->, Pieces->PEAR2\Genealogy\Gedcom\Structures\NamePieces(Version->, Prefix->, Given->, NickName->, SurnamePrefix->, Surname->, Suffix->)))), Gender->M, Events->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\FactDetail(Version->, Tag->EVEN, Description->Tripped, Type->Accident, Date->, Place->PEAR2\Genealogy\Gedcom\Structures\Place(Version->, Name->, PlaceForm->, Coordinates-> by ), Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->), Age->, RespAgency->, ReligiousAffiliation->, Restriction->, Cause->)), Attributes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\FactDetail(Version->, Tag->FACT, Description->Missing Ear, Type->, Date->, Place->PEAR2\Genealogy\Gedcom\Structures\Place(Version->, Name->, PlaceForm->, Coordinates-> by ), Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->), Age->, RespAgency->, ReligiousAffiliation->, Restriction->, Cause->)), LdsOrdinances->(), ChildFamilyLinks->("
        . "PEAR2\Genealogy\Gedcom\Structures\FamilyLink(FamilyId->F192, Notes->())), SpouseFamilyLinks->("
        . "PEAR2\Genealogy\Gedcom\Structures\FamilyLink(FamilyId->F191, Notes->())), SubmitterLinks->("
        . "S666), Associations->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Association(Version->, AssociateId->I191, Relationship->GodFather, Citations->(), Notes->())), Aliases->(I001), AncestorInterests->(I002), DescendantInterests->(I003), PermRecFileNbr->777, AncFileNbr->888, UserRefNbrs->(UserRefNbr->14 (MyType)), AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-10 12:00:00EST , Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->I changed the record for testing))), Citations->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Citation(Version->, SourceId->S45, Page->, EventType->, RoleInEvent->, EntryDate->, Texts->(), Quay->, MediaLinks->(), Notes->())), MediaLinks->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\MediaLink(Version->, Id->O45)), Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->Hi)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new IndividualRecord();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $a = new IndividualRecord();
        $tree = array(array('0 @I141@ INDI'));
        $a->parseTree($tree, '5.5.1');
        $expected = "I141";
        $this->assertSame($expected, '' . $a->Id);
    }

    public function testParseFull() {
        $a = new IndividualRecord();
        $tree = array(array('0 @I141@ INDI',array(
        array('1 RESN none'),
        array('1 NAME Vincent /van Gogh/'),
        array('1 SEX M'),
        array('1 ALIA @I49@'),
        array('1 ANCI @I50@'),
        array('1 DESI @I51@'),
        array('1 FAMS @F0001@'),
        array('1 FAMC @F00023@'),
        array('1 RFN 245'),
        array('1 AFN 21'),
        array('1 ASSO @I49@'),
        array('1 BIRT',array(
        array('2 DATE 1900-01-05'))),
        array('1 FACT Tripped',array(
        array('2 DATE 1910-01-05'))),
        array('1 SUBM @S001@'),
        array('1 REFN 117',array(
        array('2 TYPE comic'))),
        array('1 RIN 42'),
        array('1 CHAN 42',array(array('2 DATE 2010-03-2'))),
        array('1 NOTE van Gogh Rocks!'),
        array('1 SOUR @S33@'),
        array('1 OBJE @O14@')
        )));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Records\IndividualRecord(Id->I141, Restriction->none, Names->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\PersonalName(Version->5.5.1, Name->PEAR2\Genealogy\Gedcom\Structures\Name(Version->5.5.1, Full->Vincent /van Gogh/, Type->, Pieces->PEAR2\Genealogy\Gedcom\Structures\NamePieces(Version->, Prefix->, Given->, NickName->, SurnamePrefix->, Surname->, Suffix->)))), Gender->M, Events->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\FactDetail(Version->5.5.1, Tag->BIRT, Description->, Type->, Date->1900-01-05, Place->PEAR2\Genealogy\Gedcom\Structures\Place(Version->5.5.1, Name->, PlaceForm->, Coordinates-> by ), Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->5.5.1, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->), Age->, RespAgency->, ReligiousAffiliation->, Restriction->, Cause->)), Attributes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\FactDetail(Version->5.5.1, Tag->FACT, Description->Tripped, Type->, Date->1910-01-05, Place->PEAR2\Genealogy\Gedcom\Structures\Place(Version->5.5.1, Name->, PlaceForm->, Coordinates-> by ), Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->5.5.1, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->), Age->, RespAgency->, ReligiousAffiliation->, Restriction->, Cause->)), LdsOrdinances->(), ChildFamilyLinks->(PEAR2\Genealogy\Gedcom\Structures\FamilyLink(FamilyId->F00023, Notes->())), SpouseFamilyLinks->(PEAR2\Genealogy\Gedcom\Structures\FamilyLink(FamilyId->F0001, Notes->())), SubmitterLinks->(S001), Associations->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Association(Version->5.5.1, AssociateId->I49, Relationship->, Citations->(), Notes->())), Aliases->(I49), AncestorInterests->(I50), DescendantInterests->(I51), PermRecFileNbr->245, AncFileNbr->21, UserRefNbrs->(UserRefNbr->117 (comic)), AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-2 , Notes->()), Citations->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Citation(Version->5.5.1, SourceId->S33, Page->, EventType->, RoleInEvent->, EntryDate->, Texts->(), Quay->, MediaLinks->(), Notes->())), MediaLinks->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\MediaLink(Version->5.5.1, Id->O14)), Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcom() {
        $a = new IndividualRecord();
        $tree = array(array('0 @I141@ INDI'));
        $a->parseTree($tree, '5.5.1');
        $expected = "0 @I141@ INDI";
        $this->assertSame($expected, $a->toGedcom('0', '5.5.1'));
    }
    public function testGedcomFull() {
        $a = new IndividualRecord();
        $tree = array(array('0 @I141@ INDI',array(
        array('1 RESN none'),
        array('1 NAME Vincent /van Gogh/'),
        array('1 SEX M'),
        array('1 ALIA @I49@'),
        array('1 ANCI @I50@'),
        array('1 DESI @I51@'),
        array('1 FAMS @F0001@'),
        array('1 FAMC @F00023@'),
        array('1 RFN 245'),
        array('1 AFN 21'),
        array('1 ASSO @I49@'),
        array('1 BIRT',array(
        array('2 DATE 1900-01-05'))),
        array('1 FACT Tripped',array(
        array('2 DATE 1910-01-05'))),
        array('1 SUBM @S001@'),
        array('1 REFN 117',array(
        array('2 TYPE comic'))),
        array('1 RIN 42'),
        array('1 CHAN 42',array(array('2 DATE 2010-03-2'))),
        array('1 NOTE van Gogh Rocks!'),
        array('1 SOUR @S33@'),
        array('1 OBJE @O14@')
        )));
        $a->parseTree($tree, '5.5.1');
        $expected = "0 @I141@ INDI\n1 RESN none\n1 NAME Vincent /van Gogh/\n1 SEX M\n1 BIRT\n2 DATE 1900-01-05\n1 FACT Tripped\n2 DATE 1910-01-05\n1 FAMC @F00023@\n1 FAMS @F0001@\n1 SUBM @S001@\n1 ASSO @I49@\n1 ALIA @I49@\n1 ANCI @I50@\n1 DESI @I51@\n1 RFN 245\n1 AFN 21\n1 REFN 117\n2 TYPE comic\n1 RIN 42\n1 CHAN\n2 DATE 2010-03-2\n1 SOUR @S33@\n1 OBJE @O14@\n1 NOTE van Gogh Rocks!";
        $this->assertSame($expected, $a->toGedcom('0', '5.5.1'));
    }
}