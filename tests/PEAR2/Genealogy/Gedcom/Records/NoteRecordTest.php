<?php
namespace PEAR2\Genealogy\Gedcom\Records;
use PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class NoteRecordTest extends \PHPUnit_Framework_TestCase
{
    public function testEmtpyObjectString()
    {
        $a = new NoteRecord();
        $expected = "PEAR2\Genealogy\Gedcom\Records\NoteRecord(Id->, Text->, UserRefNbrs->, AutoRecId->, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date-> , Notes->()), Citations->())";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringFull()
    {
        $a = new NoteRecord();
        $a->Ver = '5.5.1';
        $a->Id = 'N111';
        $a->Text = 'Hello Dolly!';
        $a->AutoRecId = '42';
        $a->ChangeDate->Date = '2010-03-10 12:00:00EST';
        $a->UserRefNbrs[0]['Nbr'] = '14';
        $a->UserRefNbrs[0]['Type'] = 'MyType';
        $a->Citations[0] = new Structures\Citation();
        $a->Citations[0]->SourceId = "S45";
        $expected = "PEAR2\Genealogy\Gedcom\Records\NoteRecord(Id->N111, Text->Hello Dolly!, UserRefNbrs->UserRefNbr->14 (MyType), AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-10 12:00:00EST , Notes->()), Citations->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Citation(Version->, SourceId->S45, Page->, EventType->, RoleInEvent->, EntryDate->, Texts->(), Quay->, MediaLinks->(), Notes->())))";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new NoteRecord();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $a = new NoteRecord();
        $a->parseTree(array(array('0 @N111@ NOTE Hello Dolly!')), '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Records\NoteRecord(Id->N111, Text->Hello Dolly!, UserRefNbrs->, AutoRecId->, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date-> , Notes->()), Citations->())";
        $this->assertSame($expected, '' . $a);
    }

    public function testParseFull() {
        $a = new NoteRecord();
        $tree = array(array('0 @N111@ NOTE Hello Dolly!', array(
        array('1 CONT van Gogh Rocks!'),
        array('1 REFN 113',array(
        array('2 TYPE box'))),
        array('1 RIN 42'),
        array('1 CHAN',array(array('2 DATE 2010-03-2'))),
        array('1 SOUR @S33@')
        )));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Records\NoteRecord(Id->N111, Text->Hello Dolly!"
        . "\nvan Gogh Rocks!, UserRefNbrs->UserRefNbr->113 (box), AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-2 , Notes->()), Citations->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Citation(Version->5.5.1, SourceId->S33, Page->, EventType->, RoleInEvent->, EntryDate->, Texts->(), Quay->, MediaLinks->(), Notes->())))";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcom() {
        $a = new NoteRecord();
        $a->parseTree(array(array('0 @N111@ NOTE Hello Dolly!')), '5.5.1');
        $expected = "0 @N111@ NOTE Hello Dolly!";
        $this->assertSame($expected, $a->toGedcom('0', '5.5.1'));
    }
    public function testGedcomFull() {
        $a = new NoteRecord();
        $tree = array(array('0 @N111@ NOTE Hello Dolly!', array(
        array('1 CONT van Gogh Rocks!'),
        array('1 REFN 113',array(
        array('2 TYPE box'))),
        array('1 RIN 42'),
        array('1 CHAN',array(array('2 DATE 2010-03-2'))),
        array('1 SOUR @S33@')
        )));
        $a->parseTree($tree, '5.5.1');
        $expected = "0 @N111@ NOTE Hello Dolly!\n1 CONT van Gogh Rocks!\n1 REFN 113\n2 TYPE box\n1 RIN 42\n1 CHAN\n2 DATE 2010-03-2\n1 SOUR @S33@";
        $this->assertSame($expected, $a->toGedcom('0', '5.5.1'));
    }
}
?>