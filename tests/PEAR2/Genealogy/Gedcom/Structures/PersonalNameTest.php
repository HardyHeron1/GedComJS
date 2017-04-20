<?php
namespace PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';
require_once 'PHPUnit/Framework.php';

class PersonalNameTest extends \PHPUnit_Framework_TestCase
{
    public function testEmtpyObjectString()
    {
        $a = new PersonalName();
        $expected = "PEAR2\Genealogy\Gedcom\Structures\PersonalName(Version->, Name->"
        . "PEAR2\Genealogy\Gedcom\Structures\Name(Version->, Full->, Type->, Pieces->"
        . "PEAR2\Genealogy\Gedcom\Structures\NamePieces(Version->, Prefix->, Given->, NickName->, SurnamePrefix->, Surname->, Suffix->)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringNoArray()
    {
        $a = new PersonalName();
        $a->Ver = '5.5.1';
        $a->Name->Full = 'Vincent /van Gogh/';
        $a->Name->Type = 'Birth';
        $expected = "PEAR2\Genealogy\Gedcom\Structures\PersonalName(Version->5.5.1, Name->"
        . "PEAR2\Genealogy\Gedcom\Structures\Name(Version->, Full->Vincent /van Gogh/, Type->Birth, Pieces->"
        . "PEAR2\Genealogy\Gedcom\Structures\NamePieces(Version->, Prefix->, Given->, NickName->, SurnamePrefix->, Surname->, Suffix->)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new PersonalName();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $expected = "PEAR2\Genealogy\Gedcom\Structures\PersonalName(Version->5.5.1, Name->"
        . "PEAR2\Genealogy\Gedcom\Structures\Name(Version->5.5.1, Full->Vincent /van Gogh/, Type->, Pieces->"
        . "PEAR2\Genealogy\Gedcom\Structures\NamePieces(Version->, Prefix->, Given->, NickName->, SurnamePrefix->, Surname->, Suffix->)))";
        $a = new PersonalName();
        $a->parseTree(array(array('2 NAME Vincent /van Gogh/')), '5.5.1');
        $this->assertSame($expected, '' . $a);
    }

    public function testParseFull() {
        $a = new PersonalName();
        $tree = array(array('2 NAME Vincent /van Gogh/',
        array(
        array('3 TYPE Birthname'),
        array('3 GIVN Vincent'),
        array('3 NPFX The Artist'),
        array('3 GIVN Vincent'),
        array('3 SPFX van'),
        array('3 SURN Gogh'),
        array('3 NSFX III')
        ))
        );
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\PersonalName(Version->5.5.1, Name->"
        . "PEAR2\Genealogy\Gedcom\Structures\Name(Version->5.5.1, Full->Vincent /van Gogh/, Type->Birthname, Pieces->"
        . "PEAR2\Genealogy\Gedcom\Structures\NamePieces(Version->5.5.1, Prefix->The Artist, Given->Vincent, NickName->, SurnamePrefix->van, Surname->Gogh, Suffix->III)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcomNameOnly() {
        $expected = "2 NAME Vincent /van Gogh/";
        $a = new PersonalName();
        $a->parseTree(array(array('2 NAME Vincent /van Gogh/')), '5.5.1');
        $this->assertSame($expected, $a->toGedcom('2', '5.5.1'));
    }

    public function testGedcomFull() {
        $expected = "2 NAME Vincent /van Gogh/\n3 TYPE Birthname\n3 NPFX The Artist\n3 GIVN Vincent\n3 SPFX van\n3 SURN Gogh\n3 NSFX III";
        $a = new PersonalName();
        $tree = array(array('2 NAME Vincent /van Gogh/',
        array(
        array('3 TYPE Birthname'),
        array('3 GIVN Vincent'),
        array('3 NPFX The Artist'),
        array('3 GIVN Vincent'),
        array('3 SPFX van'),
        array('3 SURN Gogh'),
        array('3 NSFX III')
        ))
        );
        $a->parseTree($tree, '5.5.1');
        $this->assertSame($expected, $a->toGedcom('2', '5.5.1'));
    }
}
?>