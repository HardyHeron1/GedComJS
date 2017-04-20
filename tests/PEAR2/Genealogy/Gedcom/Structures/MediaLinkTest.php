<?php
namespace PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class MediaLinkTest extends \PHPUnit_Framework_TestCase
{
    public function testEmtpyObjectString()
    {
        $a = new MediaLink();
        $expected = "PEAR2\Genealogy\Gedcom\Structures\MediaLink(Version->, Title->, MediaFiles->())";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringIdAndText()
    {
        $a = new MediaLink();
        $a->Ver = '5.5.1';
        $a->Id = '42';
        $a->Title = 'Mr Bojangles';
        $expected = "PEAR2\Genealogy\Gedcom\Structures\MediaLink(Version->5.5.1, Id->42)";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringNoIdAndText()
    {
        $a = new MediaLink();
        $a->Ver = '5.5.1';
        $a->Title = 'Mr Bojangles';
        $expected = "PEAR2\Genealogy\Gedcom\Structures\MediaLink(Version->5.5.1, Title->Mr Bojangles, MediaFiles->())";
        $this->assertSame($expected, '' . $a);
    }
    public function testCustomField()
    {
        $a = new MediaLink();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParseId() {
        $a = new MediaLink();
        $tree = array(array('1 OBJE @O111@'));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\MediaLink(Version->5.5.1, Id->O111)";
        $this->assertSame($expected, '' . $a);
    }

    public function testParseText() {
        $a = new MediaLink();
        $tree = array(array('1 OBJE', array(array('2 TITL Mr Bojangles'))));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\MediaLink(Version->5.5.1, Title->Mr Bojangles, MediaFiles->())";
        $this->assertSame($expected, '' . $a);
    }
    public function testParseFull() {
        $a = new MediaLink();
        $tree = array(array('1 OBJE', array(
        array('2 TITL Mr Bojangles'),
        array('2 FILE c:\my pictures', array(
        array('3 FORM JPG', array(
        array('4 TYPE digital'))))),
        array('2 FILE c:\my music', array(
        array('3 FORM MP3', array(
        array('4 TYPE digital')))))
        )));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\MediaLink(Version->5.5.1, Title->Mr Bojangles, MediaFiles->(\nPEAR2\Genealogy\Gedcom\Structures\MediaFile(RefNbr->c:\my pictures, Format->JPG, FormatType->digital, Title->)\nPEAR2\Genealogy\Gedcom\Structures\MediaFile(RefNbr->c:\my music, Format->MP3, FormatType->digital, Title->)))";
        $this->assertSame($expected, '' . $a);
    }
    public function testGedcomId() {
        $a = new MediaLink();
        $tree = array(array('1 OBJE @O111@'));
        $a->parseTree($tree, '5.5.1');
        $expected = "1 OBJE @O111@";
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
    public function testGedcomText() {
        $a = new MediaLink();
        $tree = array(array('1 OBJE', array(array('2 TITL Mr Bojangles'))));
        $a->parseTree($tree, '5.5.1');
        $expected = "1 OBJE\n2 TITL Mr Bojangles";
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
    public function testGedcomFull() {
        $a = new MediaLink();
        $tree = array(array('1 OBJE', array(
        array('2 TITL Mr Bojangles'),
        array('2 FILE c:\my pictures', array(
        array('3 FORM JPG', array(
        array('4 TYPE digital'))))),
        array('2 FILE c:\my music', array(
        array('3 FORM MP3', array(
        array('4 TYPE digital')))))
        )));
        $a->parseTree($tree, '5.5.1');
        $expected = "1 OBJE\n2 TITL Mr Bojangles\n2 FILE c:\my pictures\n3 FORM JPG\n4 TYPE digital\n2 FILE c:\my music\n3 FORM MP3\n4 TYPE digital";
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
}
?>