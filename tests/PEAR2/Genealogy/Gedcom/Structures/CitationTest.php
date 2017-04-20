<?php
namespace PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class CitationTest extends \PHPUnit_Framework_TestCase
{
    public function testEmtpyObjectString()
    {
        $a = new Citation();
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Citation(Version->, SourceId->, Page->, EventType->, RoleInEvent->, EntryDate->, Texts->(), Quay->, MediaLinks->(), Notes->())";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringFull()
    {
        $a = new Citation();
        $a->Ver = '5.5.1';
        $a->SourceId = 'S123';
        $a->Page ='15';
        $a->EventType = "Marriage";
        $a->RoleInEvent = "Husband";
        $a->EntryDate = '1866';
        $a->Texts = array('Text1', 'Text2');
        $a->Quay = '1';
        $a->Notes[0] = new Note();
        $a->Notes[0]->Text = 'Yes, Sir.';
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Citation(Version->5.5.1, SourceId->S123, Page->15, EventType->Marriage, RoleInEvent->Husband, EntryDate->1866, Texts->(\nText->(Text1)\nText->(Text2)), Quay->1, MediaLinks->(), Notes->(\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->Yes, Sir.)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new Citation();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $a = new Citation();
        $tree = array(array('1 SOUR @S123@', array(array('2 PAGE 15'))));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Citation(Version->5.5.1, SourceId->S123, Page->15, EventType->, RoleInEvent->, EntryDate->, Texts->(), Quay->, MediaLinks->(), Notes->())";
        $this->assertSame($expected, '' . $a);
    }

    public function testParseFull() {
        $a = new Citation();
        $tree = array(array('1 SOUR @S123@', array(
        array('2 PAGE 15'),
        array('2 EVEN Marraige', array(
        array('3 ROLE Husband'))),
        array('2 DATA', array(
        array('3 DATE 2010-03-02'),
        array('3 TEXT Text1'),
        array('3 TEXT text2'))),
        array('2 QUAY 7'),
        array('2 NOTE van Gogh Rocks!')
        )));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Citation(Version->5.5.1, SourceId->S123, Page->15, EventType->Marraige, RoleInEvent->Husband, EntryDate->2010-03-02, Texts->(\nText->(Text1)\nText->(text2)), Quay->7, MediaLinks->(), Notes->(\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcom() {
        $a = new Citation();
        $tree = array(array('1 SOUR @S123@', array(array('2 PAGE 15'))));
        $a->parseTree($tree, '5.5.1');
        $expected = "1 SOUR @S123@\n2 PAGE 15";
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
    public function testGedcomFull() {
        $a = new Citation();
        $tree = array(array('1 SOUR @S123@', array(
        array('2 PAGE 15'),
        array('2 EVEN Marraige', array(
        array('3 ROLE Husband'))),
        array('2 DATA', array(
        array('3 DATE 2010-03-02'),
        array('3 TEXT Text1'),
        array('3 TEXT text2'))),
        array('2 QUAY 7'),
        array('1 NOTE van Gogh Rocks!')
        )));
        $a->parseTree($tree, '5.5.1');
        $expected = "1 SOUR @S123@\n2 PAGE 15\n2 EVEN Marraige\n2 DATA\n3 DATE 2010-03-02\n3 TEXT Text1\n3 TEXT text2\n2 QUAY 7\n2 NOTE van Gogh Rocks!";
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
}
?>