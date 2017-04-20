<?php
namespace PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class PlaceTest extends \PHPUnit_Framework_TestCase
{
    //TODO add romanized and phonetic tag tests
    public function testEmtpyObjectString()
    {
        $a = new Place();
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Place(Version->, Name->, PlaceForm->, Coordinates-> by )";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringAll()
    {
        $a = new Place();
        $a->Ver = '5.5.1';
        $a->Name = 'Chicago, IL';
        $a->PlaceForm = 'City, State';
        $a->Coordinates['Latitude'] = '14m';
        $a->Coordinates['Longitude'] = '138m';
        $a->Notes[0] = new Note();
        $a->Notes[0]->Text = 'Yes, Sir.';
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Place(Version->5.5.1, Name->Chicago, IL, PlaceForm->City, State, Coordinates->14m by 138m\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->Yes, Sir.))";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new Place();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $a = new Place();
        $tree = array(array('2 PLAC Chicago, IL'));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Place(Version->5.5.1, Name->Chicago, IL, PlaceForm->, Coordinates-> by )";
        $this->assertSame($expected, '' . $a);
    }

    public function testParseFull() {
        $a = new Place();
        $tree = array(array('2 PLAC Chicago, IL', array(
        array('3 FORM City, State'),
        array('3 MAP',array(
        array('4 LATI 100m'),
        array('4 LONG 95h'))),
        array('1 NOTE van Gogh Rocks!'))));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Place(Version->5.5.1, Name->Chicago, IL, PlaceForm->City, State, Coordinates->100m by 95h\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!))";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcom() {
        $a = new Place();
        $tree = array(array('2 PLAC Chicago, IL'));
        $a->parseTree($tree, '5.5.1');
        $expected = "2 PLAC Chicago, IL";
        $this->assertSame($expected, $a->toGedcom('2', '5.5.1'));
    }

    public function testGedcomFull() {
        $a = new Place();
        $tree = array(array('2 PLAC Chicago, IL', array(
        array('3 FORM City, State'),
        array('3 MAP',array(
        array('4 LATI 100m'),
        array('4 LONG 95h'))),
        array('1 NOTE van Gogh Rocks!'))));
        $a->parseTree($tree, '5.5.1');
        $expected = "2 PLAC Chicago, IL\n3 FORM City, State\n3 MAP\n4 LATI 100m\n4 LONG 95h\n3 NOTE van Gogh Rocks!";
        $this->assertSame($expected, $a->toGedcom('2', '5.5.1'));
    }
}
?>