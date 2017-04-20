<?php
namespace PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class AssociationTest extends \PHPUnit_Framework_TestCase
{
    public function testEmtpyObjectString()
    {
        $a = new Association();
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Association(Version->, AssociateId->, Relationship->, Citations->(), Notes->())";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringFull()
    {
        $a = new Association();
        $a->Ver = '5.5.1';
        $a->AssociateId = 'I191';
        $a->Relationship = 'GodFather';
        $a->Citations[0] = new Citation();
        $a->Citations[0]->SourceId = 'S123';
        $a->Notes[0] = new Note();
        $a->Notes[0]->Text = 'Yes, Sir.';
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Association(Version->5.5.1, AssociateId->I191, Relationship->GodFather, Citations->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Citation(Version->, SourceId->S123, Page->, EventType->, RoleInEvent->, EntryDate->, Texts->(), Quay->, MediaLinks->(), Notes->())), Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->Yes, Sir.)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new Association();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $a = new Association();
        $tree = array(array('1 ASSO @I191@', array(array('2 RELA GodFather'))));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Association(Version->5.5.1, AssociateId->I191, Relationship->GodFather, Citations->(), Notes->())";
        $this->assertSame($expected, '' . $a);
    }

    public function testParseFull() {
        $a = new Association();
        $tree = array(array('1 ASSO @I191@', array(
        array('2 RELA GodFather'),
        array('2 NOTE van Gogh Rocks!'),
        array('2 SOUR @S123@'))
        ));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Association(Version->5.5.1, AssociateId->I191, Relationship->GodFather, Citations->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Citation(Version->5.5.1, SourceId->S123, Page->, EventType->, RoleInEvent->, EntryDate->, Texts->(), Quay->, MediaLinks->(), Notes->())), Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcom() {
        $a = new Association();
        $tree = array(array('1 ASSO @I191@', array(array('2 RELA GodFather'))));
        $a->parseTree($tree, '5.5.1');
        $expected = "1 ASSO @I191@\n2 RELA GodFather";
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
    public function testGedcomFull() {
        $a = new Association();
        $tree = array(array('1 ASSO @I191@', array(
        array('2 RELA GodFather'),
        array('2 NOTE van Gogh Rocks!'),
        array('2 SOUR @S123@'))
        ));
        $a->parseTree($tree, '5.5.1');
        $expected = "1 ASSO @I191@\n2 RELA GodFather\n2 SOUR @S123@\n2 NOTE van Gogh Rocks!";
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
}
?>