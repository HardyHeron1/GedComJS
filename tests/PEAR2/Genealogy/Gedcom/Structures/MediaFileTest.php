<?php
namespace PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class MediaFileTest extends \PHPUnit_Framework_TestCase
{
    public function testEmtpyObjectString()
    {
        $a = new MediaFile();
        $expected = "PEAR2\Genealogy\Gedcom\Structures\MediaFile(RefNbr->, Format->, FormatType->, Title->)";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringFull()
    {
        $a = new MediaFile();
        $a->Ver = '5.5.1';
        $a->RefNbr = 'O393';
        $a->Format = 'JPG';
        $a->FormatType = 'digital';
        $a->Title = 'My Man Vincent';
        $expected = "PEAR2\Genealogy\Gedcom\Structures\MediaFile(RefNbr->O393, Format->JPG, FormatType->digital, Title->My Man Vincent)";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new MediaFile();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $a = new MediaFile();
        $tree = array(array('1 FILE c:\my pictures'));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\MediaFile(RefNbr->c:\my pictures, Format->, FormatType->, Title->)";
        $this->assertSame($expected, '' . $a);
    }

    public function testParseFull() {
        $a = new MediaFile();
        $tree = array(array('1 FILE c:\my pictures', array(
        array('2 FORM JPG', array(
        array('3 TYPE digital'))),
        array('2 TITL My Man Vincent'))));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\MediaFile(RefNbr->c:\my pictures, Format->JPG, FormatType->digital, Title->My Man Vincent)";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcom() {
        $a = new MediaFile();
        $tree = array(array('1 FILE c:\my pictures'));
        $a->parseTree($tree, '5.5.1');
        $expected = "1 FILE c:\my pictures";
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
    public function testGedcomFull() {
        $a = new MediaFile();
        $tree = array(array('1 FILE c:\my pictures', array(
        array('2 FORM JPG', array(
        array('3 TYPE digital'))),
        array('2 TITL My Man Vincent'))));
        $a->parseTree($tree, '5.5.1');
        $expected = "1 FILE c:\my pictures\n2 FORM JPG\n3 TYPE digital\n2 TITL My Man Vincent";
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
}
?>