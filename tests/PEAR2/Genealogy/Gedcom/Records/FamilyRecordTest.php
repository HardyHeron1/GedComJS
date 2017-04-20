<?php
namespace PEAR2\Genealogy\Gedcom\Records;
use PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class FamilyRecordTest extends \PHPUnit_Framework_TestCase
{
    public function testEmtpyObjectString()
    {
        $a = new FamilyRecord();
        $expected = "PEAR2\Genealogy\Gedcom\Records\FamilyRecord(Id->, Restriction->, Events->(), Husband->, Wife->, CountOfChildren->, LdsSealings->(), UserRefNbrs->(), AutoRecId->, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date-> , Notes->()), SubmitterLinks->(), Citations->(), MediaLinks->(), Notes->())";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringFull()
    {
        $a = new FamilyRecord();
        $a->Id = 'F123';
        $a->Restriction = "none";
        $a->Husband = "I001";
        $a->Wife = 'I002';
        $a->Children[0] = 'I888';
        $a->Children[1] = 'I777';
        $a->CountOfChildren = 7;
        $a->AutoRecId = '42';
        $a->ChangeDate->Date = '2010-03-10 12:00:00EST';
        $a->ChangeDate->Notes[0] = new Structures\Note();
        $a->ChangeDate->Notes[0]->Text = 'I changed the record for testing';
        $a->Events[0] = new Structures\Event();
        $a->Events[0]->Tag = 'EVEN';
        $a->Events[0]->Descr = 'Tripped';
        $a->Events[0]->Type = 'Accident';
        $a->Events[0]->Date = '2010-03-14';
        $a->Events[0]->Age = '14';
        $a->Events[0]->RespAgency = 'Self';
        $a->SubmitterLinks[0] = 'S666';
        $a->SubmitterLinks[1] = 'S8910';
        $a->Notes[0] = new Structures\Note();
        $a->Notes[0]->Text = "My notes not your\nnotes.";
        $a->MediaLinks[0] = new Structures\MediaLink();
        $a->MediaLinks[0]->Id = "O45";
        $a->Citations[0] = new Structures\Citation();
        $a->Citations[0]->SourceId = "S45";
        $expected = "PEAR2\Genealogy\Gedcom\Records\FamilyRecord(Id->F123, Restriction->none, Events->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\FactDetail(Version->, Tag->EVEN, Description->Tripped, Type->Accident, Date->2010-03-14, Place->PEAR2\Genealogy\Gedcom\Structures\Place(Version->, Name->, PlaceForm->, Coordinates-> by ), Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->), Age->14, RespAgency->Self, ReligiousAffiliation->, Restriction->, Cause->)), Husband->I001, Wife->I002, Child->I888, Child->I777, CountOfChildren->7, LdsSealings->(), UserRefNbrs->(), AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-10 12:00:00EST , Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->I changed the record for testing))), SubmitterLinks->(Submitter->S666, Submitter->S8910), Citations->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Citation(Version->, SourceId->S45, Page->, EventType->, RoleInEvent->, EntryDate->, Texts->(), Quay->, MediaLinks->(), Notes->())), MediaLinks->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\MediaLink(Version->, Id->O45)), Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->My notes not your"
        . "\nnotes.)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new FamilyRecord();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $a = new FamilyRecord();
        $tree = array(array('0 @F001@ FAM'));
        $a->parseTree($tree, '5.5.1');
        $expected = "F001";
        $this->assertSame($expected, '' . $a->Id);
    }

    public function testParseFull() {
        $a = new FamilyRecord();
        $tree = array(array('0 @F001@ FAM', array(
        array('1 RESN none'),
        array('1 HUSB @I001@'),
        array('1 WIFE @I002@'),
        array('1 CHIL @I003@'),
        array('1 CHIL @I004@'),
        array('1 CHIL @I005@'),
        array('1 NCHI 14'),
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
        $expected = "PEAR2\Genealogy\Gedcom\Records\FamilyRecord(Id->F001, Restriction->none, Events->(), Husband->I001, Wife->I002, Child->I003, Child->I004, Child->I005, CountOfChildren->14, LdsSealings->(), UserRefNbrs->(UserRefNbr->117 (comic)), AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-2 , Notes->()), SubmitterLinks->(Submitter->S001), Citations->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Citation(Version->5.5.1, SourceId->S33, Page->, EventType->, RoleInEvent->, EntryDate->, Texts->(), Quay->, MediaLinks->(), Notes->())), MediaLinks->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\MediaLink(Version->5.5.1, Id->O14)), Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcom() {
        $a = new FamilyRecord();
        $tree = array(array('0 @F001@ FAM'));
        $a->parseTree($tree, '5.5.1');
        $expected = "0 @F001@ FAM";
        $this->assertSame($expected, $a->toGedcom('0', '5.5.1'));
    }
    public function testGedcomFull() {
        $a = new FamilyRecord();
        $tree = array(array('0 @F001@ FAM', array(
        array('1 RESN none'),
        array('1 HUSB @I001@'),
        array('1 WIFE @I002@'),
        array('1 CHIL @I003@'),
        array('1 CHIL @I004@'),
        array('1 CHIL @I005@'),
        array('1 NCHI 14'),
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
        $expected = "0 @F001@ FAM\n1 RESN none\n1 HUSB @I001@\n1 WIFE @I002@\n1 CHIL @I003@\n1 CHIL @I004@"
        . "\n1 CHIL @I005@\n1 NCHI 14\n1 SUBM @S001@\n1 REFN 117\n2 TYPE comic\n1 RIN 42"
        . "\n1 CHAN\n2 DATE 2010-03-2\n1 SOUR @S33@\n1 OBJE @O14@\n1 NOTE van Gogh Rocks!";
        $this->assertSame($expected, $a->toGedcom('0', '5.5.1'));
    }
}
?>