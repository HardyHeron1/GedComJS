<?php
namespace PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class CharacterSetTest extends \PHPUnit_Framework_TestCase
{

    public function testEmtpyObjectString()
    {
        $a = new CharacterSet();
        $expected = "PEAR2\Genealogy\Gedcom\Structures\CharacterSet(CharacterSet->, VerNbr->)";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringFull()
    {
        $a = new CharacterSet();
        $a->Ver = '5.5.1';
        $a->CharacterSet = "UTF-8";
        $a->VerNbr = '1.0';
        $expected = "PEAR2\Genealogy\Gedcom\Structures\CharacterSet(CharacterSet->UTF-8, VerNbr->1.0)";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new CharacterSet();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $expected = "PEAR2\Genealogy\Gedcom\Structures\CharacterSet(CharacterSet->UTF-8, VerNbr->)";
        $a = new CharacterSet();
        $a->parseTree(array(array('1 CHAR UTF-8')), '5.5.1');
        $this->assertSame($expected, '' . $a);
    }

    public function testParseFull() {
        $a = new CharacterSet();
        $tree = array(array('1 CHAR UTF-8',
        array(array('2 VERS 1.0')))
        );
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\CharacterSet(CharacterSet->UTF-8, VerNbr->1.0)";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcom() {
        $expected = "1 CHAR UTF-8";
        $a = new CharacterSet();
        $a->parseTree(array(array('1 CHAR UTF-8')), '5.5.1');
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
    public function testGedcomFull() {
        $expected = "1 CHAR UTF-8\n2 VERS 1.0";
        $a = new CharacterSet();
        $tree = array(array('1 CHAR UTF-8',
        array(array('2 VERS 1.0')))
        );
        $a->parseTree($tree, '5.5.1');
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
}
?>