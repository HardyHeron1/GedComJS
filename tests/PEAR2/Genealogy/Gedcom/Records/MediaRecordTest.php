<?php
namespace PEAR2\Genealogy\Gedcom\Records;
use PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class MediaRecordTest extends \PHPUnit_Framework_TestCase
{
    public function testEmtpyObjectString()
    {
        $a = new MediaRecord();
        $expected = "PEAR2\Genealogy\Gedcom\Records\MediaRecord(Id->, MediaFiles->(), UserRefNbrs->(), AutoRecId->, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date-> , Notes->()), Citations->(), Notes->())";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringFull()
    {
        $a = new MediaRecord();
        $a->Id = 'O123';
        $a->MediaFiles[0] = new Structures\MediaFile();
        $a->MediaFiles[0]->RefNbr = 'O393';
        $a->MediaFiles[0]->Format = 'JPG';
        $a->MediaFiles[0]->FormatType = 'digital';
        $a->AutoRecId = '42';
        $a->ChangeDate->Date = '2010-03-10 12:00:00EST';
        $a->Notes[0] = new Structures\Note();
        $a->Notes[0]->Text = "My notes not your notes.";
        $a->UserRefNbrs[0]['Nbr'] = '14';
        $a->UserRefNbrs[0]['Type'] = 'MyType';
        $a->Citations[0] = new Structures\Citation();
        $a->Citations[0]->SourceId = "S45";
        $a->Citations[1] = new Structures\Citation();
        $a->Citations[1]->SourceId = "S46";
        $expected = "PEAR2\Genealogy\Gedcom\Records\MediaRecord(Id->O123, MediaFiles->(MediaFile->PEAR2\Genealogy\Gedcom\Structures\MediaFile(RefNbr->O393, Format->JPG, FormatType->digital, Title->)), UserRefNbrs->(UserRefNbr->14 (MyType)), AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-10 12:00:00EST , Notes->()), Citations->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Citation(Version->, SourceId->S45, Page->, EventType->, RoleInEvent->, EntryDate->, Texts->(), Quay->, MediaLinks->(), Notes->())"
        . "\nPEAR2\Genealogy\Gedcom\Structures\Citation(Version->, SourceId->S46, Page->, EventType->, RoleInEvent->, EntryDate->, Texts->(), Quay->, MediaLinks->(), Notes->())), Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->My notes not your notes.)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new MediaRecord();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $a = new MediaRecord();
        $tree = array(array('0 @O11XX@ OBJE'));
        $a->parseTree($tree, '5.5.1');
        $expected = "O11XX";
        $this->assertSame($expected, '' . $a->Id);
    }

    public function testParseFull() {
        $a = new MediaRecord();
        $tree = array(array('0 @O11XX@ OBJE', array(
        array('1 FILE c:\MyBooks',array(
        array('2 FORM hardcover book'),
        array('2 TITL THE van Gogh'))),
        array('1 REFN 113',array(
        array('2 TYPE hardcover book'))),
        array('1 RIN 42'),
        array('1 CHAN',array(array('2 DATE 2010-03-2'))),
        array('1 NOTE van Gogh Rocks!'),
        array('1 SOUR @S33@'),
        )));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Records\MediaRecord(Id->O11XX, MediaFiles->(MediaFile->PEAR2\Genealogy\Gedcom\Structures\MediaFile(RefNbr->c:\MyBooks, Format->hardcover book, FormatType->, Title->THE van Gogh)), UserRefNbrs->(UserRefNbr->113 (hardcover book)), AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-2 , Notes->()), Citations->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Citation(Version->5.5.1, SourceId->S33, Page->, EventType->, RoleInEvent->, EntryDate->, Texts->(), Quay->, MediaLinks->(), Notes->())), Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcom() {
        $a = new MediaRecord();
        $tree = array(array('0 @O11XX@ OBJE'));
        $a->parseTree($tree, '5.5.1');
        $expected = "0 @O11XX@ OBJE";
        $this->assertSame($expected, $a->toGedcom('0', '5.5.1'));
    }
    public function testGedcomFull() {
        $a = new MediaRecord();
        $tree = array(array('0 @O11XX@ OBJE', array(
        array('1 FILE c:\MyBooks',array(
        array('2 FORM hardcover book'),
        array('2 TITL THE van Gogh'))),
        array('1 REFN 113',array(
        array('2 TYPE hardcover book'))),
        array('1 RIN 42'),
        array('1 CHAN 42',array(array('2 DATE 2010-03-2'))),
        array('1 NOTE van Gogh Rocks!'),
        array('1 SOUR @S33@'),
        )));
        $a->parseTree($tree, '5.5.1');
        $expected = "0 @O11XX@ OBJE\n1 FILE c:\MyBooks\n2 FORM hardcover book\n2 TITL THE van Gogh\n1 REFN 113\n2 TYPE hardcover book\n1 RIN 42\n1 CHAN\n2 DATE 2010-03-2\n1 SOUR @S33@\n1 NOTE van Gogh Rocks!";
        $this->assertSame($expected, $a->toGedcom('0', '5.5.1'));
    }
}