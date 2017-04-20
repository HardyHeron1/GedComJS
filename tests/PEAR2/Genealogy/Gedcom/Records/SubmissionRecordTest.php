<?php
namespace PEAR2\Genealogy\Gedcom\Records;
use PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class SubmissionRecordTest extends \PHPUnit_Framework_TestCase
{
    public function testEmtpyObjectString()
    {
        $a = new SubmissionRecord();
        $expected = "PEAR2\Genealogy\Gedcom\Records\SubmissionRecord(Id->, SubmitterId->, FamilyFileName->, TempleCode->, GenerationsAncestors->, GenerationsDescendants->, OrdinanceProcessFlag->, AutoRecId->, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date-> , Notes->()), Notes->())";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringFull()
    {
        $a = new SubmissionRecord();
        $a->Id = 'S123';
        $a->FamilyFileName = "van Gogh";
        $a->TempleCode = "XXX";
        $a->GenerationsAncestors = 12;
        $a->GenerationsDescendants = 8;
        $a->OrdinanceProcessFlag = 'I';
        $a->AutoRecId = '42';
        $a->SubmitterId = '2222';
        $a->ChangeDate->Date = '2010-03-10 12:00:00EST';
        $a->ChangeDate->Notes[0] = new Structures\Note();
        $a->ChangeDate->Notes[0]->Text = 'I changed the record for testing';
        $a->Notes[0] = new Structures\Note();
        $a->Notes[0]->Text = "My notes not your\nnotes.";
        $expected = "PEAR2\Genealogy\Gedcom\Records\SubmissionRecord(Id->S123, SubmitterId->2222, FamilyFileName->van Gogh, TempleCode->XXX, GenerationsAncestors->12, GenerationsDescendants->8, OrdinanceProcessFlag->I, AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-10 12:00:00EST , Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->I changed the record for testing)))"
        . ", Notes->(\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->My notes not your"
        . "\nnotes.)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new SubmissionRecord();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $a = new SubmissionRecord();
        $tree = array(array('0 @S22XX@ SUBN'));
        $a->parseTree($tree, '5.5.1');
        $expected = "S22XX";
        $this->assertSame($expected, '' . $a->Id);
    }

    public function testParseFull() {
        $a = new SubmissionRecord();
        $tree = array(array('0 @S2222@ SUBN', array(
        array('1 FAMF van Gogh'),
        array('1 TEMP XXX'),
        array('1 ANCE 12'),
        array('1 DESC 7'),
        array('1 ORDI I'),
        array('1 RIN 42'),
        array('1 SUBM @2222@'),
        array('1 CHAN ',array(array('2 DATE 2010-03-2'))),
        array('1 NOTE van Gogh Rocks!')
        )));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Records\SubmissionRecord(Id->S2222, SubmitterId->2222, FamilyFileName->van Gogh, TempleCode->XXX, GenerationsAncestors->12, GenerationsDescendants->7, OrdinanceProcessFlag->I, AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-2 , Notes->()), Notes->(\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcom() {
        $a = new SubmissionRecord();
        $tree = array(array('0 @S22XX@ SUBN'));
        $a->parseTree($tree, '5.5.1');
        $expected = "0 @S22XX@ SUBN";
        $this->assertSame($expected, $a->toGedcom('0', '5.5.1'));
    }
    public function testGedcomFull() {
        $a = new SubmissionRecord();
        $tree = array(array('0 @S2222@ SUBN', array(
        array('1 FAMF van Gogh'),
        array('1 TEMP XXX'),
        array('1 ANCE 12'),
        array('1 DESC 7'),
        array('1 ORDI I'),
        array('1 RIN 42'),
        array('1 SUBM @2222@'),
        array('1 CHAN ',array(array('2 DATE 2010-03-2'))),
        array('1 NOTE van Gogh Rocks!')
        )));
        $a->parseTree($tree, '5.5.1');
        $expected = "0 @S2222@ SUBN\n1 FAMF van Gogh\n1 TEMP XXX\n1 ANCE 12\n1 DESC 7\n1 ORDI I\n1 RIN 42\n1 CHAN\n2 DATE 2010-03-2";
        $this->assertSame($expected, $a->toGedcom('0', '5.5.1'));
    }
}