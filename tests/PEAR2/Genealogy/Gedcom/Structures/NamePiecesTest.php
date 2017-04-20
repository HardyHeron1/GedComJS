<?php
namespace PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class NamePiecesTest extends \PHPUnit_Framework_TestCase
{

    public function testEmtpyObjectString()
    {
        $a = new NamePieces();
        $expected = "PEAR2\Genealogy\Gedcom\Structures\NamePieces(Version->, Prefix->, Given->, NickName->, SurnamePrefix->, Surname->, Suffix->)";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringNoArray()
    {
        $a = new NamePieces();
        $a->Ver = '5.5.1';
        $a->Prefix = "The Honorable";
        $a->Given = 'Vincent';
        $a->NickName = 'Vince';
        $a->SurnamePrefix = 'van';
        $a->Surname = 'Gogh';
        $a->Suffix = 'III';
        $expected = "PEAR2\Genealogy\Gedcom\Structures\NamePieces(Version->5.5.1, Prefix->The Honorable, Given->Vincent, NickName->Vince, SurnamePrefix->van, Surname->Gogh, Suffix->III)";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new NamePieces();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $expected = "PEAR2\Genealogy\Gedcom\Structures\NamePieces(Version->5.5.1, Prefix->, Given->Vincent, NickName->, SurnamePrefix->, Surname->, Suffix->)";
        $a = new NamePieces();
        $a->parseTree(array(array('2 GIVN Vincent')), '5.5.1');
        $this->assertSame($expected, '' . $a);
    }

    public function testParseFull() {
        $a = new NamePieces();
        $tree = array(array('2 GIVN Vincent'),
        array('2 NPFX The Honorable'),
        array('2 NICK Vince'),
        array('2 SPFX van'),
        array('2 SURN Gogh'),
        array('2 NSFX III')
        );
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\NamePieces(Version->5.5.1, Prefix->The Honorable, Given->Vincent, NickName->Vince, SurnamePrefix->van, Surname->Gogh, Suffix->III)";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcomGivenOnly() {
        $expected = "2 GIVN Vincent";
        $a = new NamePieces();
        $a->parseTree(array(array('2 GIVN Vincent')), '5.5.1');
        $this->assertSame($expected, $a->toGedcom('2', '5.5.1'));
    }
    public function testGedcomFull() {
        $expected = "2 NPFX The Honorable\n2 GIVN Vincent\n2 NICK Vince\n2 SPFX van\n2 SURN Gogh\n2 NSFX III";
        $a = new NamePieces();
        $tree = array(array('2 GIVN Vincent'),
        array('2 NPFX The Honorable'),
        array('2 NICK Vince'),
        array('2 SPFX van'),
        array('2 SURN Gogh'),
        array('2 NSFX III')
        );
        $a->parseTree($tree, '5.5.1');
        $this->assertSame($expected, $a->toGedcom('2', '5.5.1'));
    }
}
?>