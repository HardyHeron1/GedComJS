<?php
namespace PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class ChangeDateTest extends \PHPUnit_Framework_TestCase
{
    public function testEmtpyObjectString()
    {
        $a = new ChangeDate();
        $expected = "PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date-> , Notes->())";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringFull()
    {
        $a = new ChangeDate();
        $a->Ver = '5.5.1';
        $a->Date = '2010-03-10 12:00:00EST';
        $a->Notes[0] = new Note();
        $a->Notes[0]->Text = 'Yes, Sir.';
        $expected = "PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-10 12:00:00EST , Notes->(\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->Yes, Sir.)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new ChangeDate();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $a = new ChangeDate();
        $tree = array(array('1 CHAN', array(array('2 DATE 2010-03-01'))));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-01 , Notes->())";
        $this->assertSame($expected, '' . $a);
    }

    public function testParseFull() {
        $a = new ChangeDate();
        $tree = array(array('1 CHAN', array(
        array('2 DATE 2010-03-01', array(
        array('3 TIME 12:13:00EST'))),
        array('2 NOTE van Gogh Rocks!'))));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-01 12:13:00EST, Notes->(\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcom() {
        $a = new ChangeDate();
        $tree = array(array('1 CHAN', array(array('2 DATE 2010-03-01'))));
        $a->parseTree($tree, '5.5.1');
        $expected = "1 CHAN\n2 DATE 2010-03-01";
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
    public function testGedcomFull() {
        $a = new ChangeDate();
        $tree = array(array('1 CHAN', array(
        array('2 DATE 2010-03-01', array(
        array('3 TIME 12:13:00EST'))),
        array('2 NOTE van Gogh Rocks!'))));
        $a->parseTree($tree, '5.5.1');
        $expected = "1 CHAN\n2 DATE 2010-03-01\n3 TIME 12:13:00EST\n2 NOTE van Gogh Rocks!";
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
}
?>