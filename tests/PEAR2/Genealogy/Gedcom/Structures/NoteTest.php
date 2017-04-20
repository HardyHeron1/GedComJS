<?php
namespace PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class NoteTest extends \PHPUnit_Framework_TestCase
{
    public function testEmtpyObjectString()
    {
        $a = new Note();
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->)";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringIdAndText()
    {
        $a = new Note();
        $a->Ver = '5.5.1';
        $a->Id = '42';
        $a->Text = '2010-03-01';
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Id->42)";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringNoIdAndText()
    {
        $a = new Note();
        $a->Ver = '5.5.1';
        $a->Text = '2010-03-01';
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->2010-03-01)";
        $this->assertSame($expected, '' . $a);
    }
    public function testCustomField()
    {
        $a = new Note();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParseId() {
        $a = new Note();
        $tree = array(array('1 NOTE @N111@'));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Id->N111)";
        $this->assertSame($expected, '' . $a);
    }

    public function testParsetext() {
        $a = new Note();
        $tree = array(array('1 NOTE van Gogh Rocks!'));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!)";
        $this->assertSame($expected, '' . $a);
    }
    public function testGedcomId() {
        $expected = "1 NOTE @N111@";
        $a = new Note();
        $tree = array(array('1 NOTE @N111@'));
        $a->parseTree($tree, '5.5.1');
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
    public function testGedcomText() {
        $expected = "1 NOTE van Gogh Rocks!";
        $a = new Note();
        $tree = array(array('1 NOTE van Gogh Rocks!'));
        $a->parseTree($tree, '5.5.1');
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }

    public function testGedcomFullCONC() {
        $expected = "1 NOTE Note Source\n2 CONT 123456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H123456789I\n2 CONC 123456789J123456789K123456789L123456789M123456789N123456789O123456789P123456789Q123456789R\n2 CONT 123456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H123456789I\n2 CONC 123456789J123456789K123456789L123456789M123456789N123456789O123456789P123456789Q123456789R";
        $a = new Note();
        $tree = array(array('1 NOTE Note Source',
        array(array('2 CONT 123456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H123456789I'),
        array('2 CONC 123456789J123456789K123456789L123456789M123456789N123456789O123456789P123456789Q123456789R'),
        array('2 CONT 123456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H123456789I'),
        array('2 CONC 123456789J123456789K123456789L123456789M123456789N123456789O123456789P123456789Q123456789R'),
        ))
        );
        $a->parseTree($tree, '5.5.1');
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }

    public function testGedcomFullFirstLineCONC() {
        $expected = "1 NOTE Note Source123456789J123456789K123456789L123456789M123456789N123456789O123456789P123456789\n2 CONC Q123456789R\n2 CONT 123456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H123456789I\n2 CONC 123456789J123456789K123456789L123456789M123456789N123456789O123456789P123456789Q123456789R\n2 CONT 123456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H123456789I\n2 CONC 123456789J123456789K123456789L123456789M123456789N123456789O123456789P123456789Q123456789R";
        $a = new Note();
        $tree = array(array('1 NOTE Note Source',
        array(array('2 CONC 123456789J123456789K123456789L123456789M123456789N123456789O123456789P123456789Q123456789R'),
        array('2 CONT 123456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H123456789I'),
        array('2 CONC 123456789J123456789K123456789L123456789M123456789N123456789O123456789P123456789Q123456789R'),
        array('2 CONT 123456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H123456789I'),
        array('2 CONC 123456789J123456789K123456789L123456789M123456789N123456789O123456789P123456789Q123456789R'),
        ))
        );
        $a->parseTree($tree, '5.5.1');
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
}
?>