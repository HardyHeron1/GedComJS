<?php
namespace PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class RepositoryCitationTest extends \PHPUnit_Framework_TestCase
{
    public function testEmtpyObjectString()
    {
        $a = new RepositoryCitation();
        $expected = "PEAR2\Genealogy\Gedcom\Structures\RepositoryCitation(RepositoryId->, Notes->(), CallNbrs->())";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringFull()
    {
        $a = new RepositoryCitation();
        $a->Ver = '5.5.1';
        $a->RepositoryId = 'R123';
        $a->CallNbrs[0]['Nbr'] = '123456789';
        $a->CallNbrs[0]['Media'] = 'Book';
        $a->CallNbrs[1]['Nbr'] = '999999999';
        $a->CallNbrs[1]['Media'] = 'Book';
        $a->Notes[0] = new Note();
        $a->Notes[0]->Text = 'Yes, Sir.';
        $expected = "PEAR2\Genealogy\Gedcom\Structures\RepositoryCitation(RepositoryId->R123, Notes->(\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->Yes, Sir.)), CallNbrs->((123456789, Book), (999999999, Book)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new RepositoryCitation();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $a = new RepositoryCitation();
        $tree = array(array('1 REPO @R123@', array(array('2 CALN 123456789'))));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\RepositoryCitation(RepositoryId->R123, Notes->(), CallNbrs->((123456789, )))";
        $this->assertSame($expected, '' . $a);
    }

    public function testParseFull() {
        $a = new RepositoryCitation();
        $tree = array(array('1 REPO @R123@', array(
        array('2 CALN 123456789', array(
        array('3 MEDI digital book'))),
        array('2 CALN 999999999'),
        array('2 NOTE van Gogh Rocks!'))));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\RepositoryCitation(RepositoryId->R123, Notes->(\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!)), CallNbrs->((123456789, digital book), (999999999, )))";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcom() {
        $a = new RepositoryCitation();
        $tree = array(array('1 REPO @R123@', array(array('2 CALN 123456789'))));
        $a->parseTree($tree, '5.5.1');
        $expected = "1 REPO @R123@\n2 CALN 123456789";
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
    public function testGedcomFull() {
        $a = new RepositoryCitation();
        $tree = array(array('1 REPO @R123@', array(
        array('2 CALN 123456789', array(
        array('3 MEDI digital book'))),
        array('2 CALN 999999999'),
        array('2 NOTE van Gogh Rocks!'))));
        $a->parseTree($tree, '5.5.1');
        $expected = "1 REPO @R123@\n2 CALN 123456789\n3 MEDI digital book\n2 CALN 999999999\n2 NOTE van Gogh Rocks!";
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
}
?>