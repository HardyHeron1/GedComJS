<?php
namespace PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class FamilyLinkTest extends \PHPUnit_Framework_TestCase
{
    public function testEmtpyObjectString()
    {
        $a = new FamilyLink();
        $expected = "PEAR2\Genealogy\Gedcom\Structures\FamilyLink(FamilyId->, Notes->())";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringFullFamS()
    {
        $a = new FamilyLink();
        $a->Ver = '5.5.1';
        $a->FamilyId = 'F191';
        $a->Notes[0] = new Note();
        $a->Notes[0]->Text = 'Yes, Sir.';
        $expected = "PEAR2\Genealogy\Gedcom\Structures\FamilyLink(FamilyId->F191, Notes->(\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->Yes, Sir.)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringFullFamC()
    {
        $a = new FamilyLink();
        $a->Ver = '5.5.1';
        $a->FamilyId = 'F191';
        $a->Notes[0] = new Note();
        $a->Notes[0]->Text = 'Yes, Sir.';
        $a->LinkageType = 'foster';
        $a->LinkageStatus = 'proven';
        $expected = "PEAR2\Genealogy\Gedcom\Structures\FamilyLink(FamilyId->F191, LinkageType->foster, LinkageStatus->proven, Notes->(\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->Yes, Sir.)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new FamilyLink();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParseFamC() {
        $a = new FamilyLink();
        $tree = array(array('1 FAMC @F191@'));
        $a->parseTree($tree, '5.5.1', 'FAMC');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\FamilyLink(FamilyId->F191, Notes->())";
        $this->assertSame($expected, '' . $a);
    }

    public function testParseFamS() {
        $a = new FamilyLink();
        $tree = array(array('1 FAMS @F191@'));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\FamilyLink(FamilyId->F191, Notes->())";
        $this->assertSame($expected, '' . $a);
    }

    public function testParseFullFamC() {
        $a = new FamilyLink();
        $tree = array(array('1 FAMC @F191@', array(
        array('2 NOTE van Gogh Rocks!'),
        array('2 PEDI foster'),
        array('2 STAT proven'))
        ));
        $a->parseTree($tree, '5.5.1', 'FAMC');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\FamilyLink(FamilyId->F191, LinkageType->foster, LinkageStatus->proven, Notes->(\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testParseFullFamS() {
        $a = new FamilyLink();
        $tree = array(array('1 FAMS @F191@', array(
        array('2 NOTE van Gogh Rocks!'))
        ));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\FamilyLink(FamilyId->F191, Notes->(\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcomFamC() {
        $a = new FamilyLink();
        $tree = array(array('1 FAMC @F191@'));
        $a->parseTree($tree, '5.5.1', 'FAMC');
        $expected = "1 FAMC @F191@";
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1', 'FAMC'));
    }
    public function testGedcomFamS() {
        $a = new FamilyLink();
        $tree = array(array('1 FAMS @F191@'));
        $a->parseTree($tree, '5.5.1');
        $expected = "1 FAMS @F191@";
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
    public function testGedcomFullFamC() {
        $a = new FamilyLink();
        $tree = array(array('1 FAMC @F191@', array(
        array('2 NOTE van Gogh Rocks!'),
        array('2 PEDI foster'),
        array('2 STAT proven'))
        ));
        $a->parseTree($tree, '5.5.1', 'FAMC');
        $expected = "1 FAMC @F191@\n2 PEDI foster\n2 STAT proven\n2 NOTE van Gogh Rocks!";
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1', 'FAMC'));
    }
    public function testGedcomFullFamS() {
        $a = new FamilyLink();
        $tree = array(array('1 FAMS @F191@', array(
        array('2 NOTE van Gogh Rocks!'))
        ));
        $a->parseTree($tree, '5.5.1');
        $expected = "1 FAMS @F191@\n2 NOTE van Gogh Rocks!";
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
}
?>