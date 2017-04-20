<?php
namespace PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class GedCTest extends \PHPUnit_Framework_TestCase
{

    public function testEmtpyObjectString()
    {
        $a = new GedC();
        $expected = "PEAR2\Genealogy\Gedcom\Structures\GedC(VerNbr->, Form->LINEAGE-LINKED)";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringFull()
    {
        $a = new GedC();
        $a->Ver = '5.5.1';
        $a->VerNbr = '5.5.1';
        $expected = "PEAR2\Genealogy\Gedcom\Structures\GedC(VerNbr->5.5.1, Form->LINEAGE-LINKED)";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new GedC();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $a = new GedC();
        $tree = array(array('1 GEDC',
        array(array('2 VERS 5.5.1')))
        );
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\GedC(VerNbr->5.5.1, Form->LINEAGE-LINKED)";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcom() {
        $expected = "1 GEDC\n2 FORM LINEAGE-LINKED";
        $a = new GedC();
        $a->parseTree(array(array('1 GEDC')), '5.5.1');
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
    public function testGedcomFull() {
        $expected = "1 GEDC\n2 VERS 5.5.1\n2 FORM LINEAGE-LINKED";
        $a = new GedC();
        $tree = array(array('1 GEDC',
        array(array('2 VERS 5.5.1')))
        );
        $a->parseTree($tree, '5.5.1');
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
}
?>