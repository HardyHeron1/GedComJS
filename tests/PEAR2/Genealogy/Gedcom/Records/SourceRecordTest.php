<?php
namespace PEAR2\Genealogy\Gedcom\Records;
use PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

//TODO Add tests
class SourceRecordTest extends \PHPUnit_Framework_TestCase
{
    public function testEmtpyObjectString()
    {
        $a = new SourceRecord();
        $expected = "PEAR2\Genealogy\Gedcom\Records\SourceRecord(Id->, Author->, Title->, AbbreviatedTitle->, PublicationFacts->, Text->, SourceData->(), SourceRepositoryCitations->(), UserRefNbrs->(), AutoRecId->, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date-> , Notes->()), MediaLinks->(), Notes->())";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringFull()
    {
        $a = new SourceRecord();
        $a->Id = 'S321';
        $a->SourceData[0] = new Structures\SourceData();
        $a->SourceData[0]->RecordedEvents[0] = array('Types'=>'BIRT', 'Date'=>'2010-03-01', 'Jurisdiction'=>'City of Charlotte');
        $a->SourceData[0]->ResponsibleAgency = 'Dept of Vital Records';
        $a->Author = "van Gogh";
        $a->Title = "XXX";
        $a->AbbreviatedTitle = "X";
        $a->PublicationFacts = "New York City, New York";
        $a->Text = "I was born";
        $a->RepositoryCitations[0] = new Structures\RepositoryCitation();
        $a->RepositoryCitations[0]->RepositoryId = 'R123';
        $a->RepositoryCitations[0]->CallNbrs[0]['Nbr'] = '123456789';
        $a->RepositoryCitations[0]->CallNbrs[0]['Media'] = 'Book';
        $a->UserRefNbrs[0]['Nbr'] = '14';
        $a->UserRefNbrs[0]['Type'] = 'MyType';
        $a->AutoRecId = '42';
        $a->ChangeDate->Date = '2010-03-10 12:00:00EST';
        $a->ChangeDate->Notes[0] = new Structures\Note();
        $a->ChangeDate->Notes[0]->Text = 'I changed the record for testing';
        $a->Notes[0] = new Structures\Note();
        $a->Notes[0]->Text = "Hi";
        $a->MediaLinks[0] = new Structures\MediaLink();
        $a->MediaLinks[0]->Id = "O45";
        $expected = "PEAR2\Genealogy\Gedcom\Records\SourceRecord(Id->S321, Author->van Gogh, Title->XXX, AbbreviatedTitle->X, PublicationFacts->New York City, New York, Text->I was born, SourceData->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\SourceData(RecordedEvents->(RecordedEvent->BIRT 2010-03-01 (City of Charlotte)), ResponsibleAgency->Dept of Vital Records, Notes->())), SourceRepositoryCitations->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\RepositoryCitation(RepositoryId->R123, Notes->(), CallNbrs->((123456789, Book)))), UserRefNbrs->(UserRefNbr->14 (MyType)), AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-10 12:00:00EST , Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->I changed the record for testing))), MediaLinks->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\MediaLink(Version->, Id->O45)), Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->Hi)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new SourceRecord();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $a = new SourceRecord();
        $tree = array(array('0 @S321@ SOUR'));
        $a->parseTree($tree, '5.5.1');
        $expected = "S321";
        $this->assertSame($expected, '' . $a->Id);
    }

    public function testParseFull() {
        $a = new SourceRecord();
        $tree = array(array('0 @S321@ SOUR', array(
        array('1 DATA', array(
        array('2 EVEN BIRT', array(
        array('3 PLAC City of Charlotte'),
        array('3 DATE 2010-03-01'))),
        array('2 AGNC Dept of Vital Records'))),
        array('1 AUTH van Gogh'),
        array('1 TITL XXX'),
        array('1 ABBR X'),
        array('1 TEXT I was born'),
        array('1 PUBL New York City, New York'),
        array('1 REPO @R123@', array(
        array('2 CALN 123456789', array(
        array('3 MEDI Book'))))),
        array('1 REFN 14',array(
        array('2 TYPE MyType'))),
        array('1 RIN 42'),
        array('1 CHAN ',array(array('2 DATE 2010-03-2'))),
        array('1 NOTE Hi'),
        array('1 OBJE @O45@')
        )));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Records\SourceRecord(Id->S321, Author->van Gogh, Title->XXX, AbbreviatedTitle->X, PublicationFacts->New York City, New York, Text->I was born, SourceData->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\SourceData(RecordedEvents->(RecordedEvent->BIRT 2010-03-01 (City of Charlotte)), ResponsibleAgency->Dept of Vital Records, Notes->())), SourceRepositoryCitations->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\RepositoryCitation(RepositoryId->R123, Notes->(), CallNbrs->((123456789, Book)))), UserRefNbrs->(UserRefNbr->14 (MyType)), AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-2 , Notes->()"
        . "), MediaLinks->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\MediaLink(Version->5.5.1, Id->O45)), Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->Hi)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcom() {
        $a = new SourceRecord();
        $tree = array(array('0 @S321@ SOUR'));
        $a->parseTree($tree, '5.5.1');
        $expected = "0 @S321@ SOUR";
        $this->assertSame($expected, $a->toGedcom('0', '5.5.1'));
    }
    public function testGedcomFull() {
        $a = new SourceRecord();
        $tree = array(array('0 @S321@ SOUR', array(
        array('1 DATA', array(
        array('2 EVEN BIRT', array(
        array('3 PLAC City of Charlotte'),
        array('3 DATE 2010-03-01'))),
        array('2 AGNC Dept of Vital Records'))),
        array('1 AUTH van Gogh'),
        array('1 TITL XXX'),
        array('1 ABBR X'),
        array('1 TEXT I was born'),
        array('1 PUBL New York City, New York'),
        array('1 REPO @R123@', array(
        array('2 CALN 123456789', array(
        array('3 MEDI Book'))))),
        array('1 REFN 14',array(
        array('2 TYPE MyType'))),
        array('1 RIN 42'),
        array('1 CHAN ',array(array('2 DATE 2010-03-2'))),
        array('1 NOTE Hi'),
        array('1 OBJE @O45@')
        )));
        $a->parseTree($tree, '5.5.1');
        $expected = "0 @S321@ SOUR\n1 DATA\n2 EVEN BIRT\n3 DATE 2010-03-01\n3 PLAC City of Charlotte"
        . "\n2 AGNC Dept of Vital Records\n1 AUTH van Gogh\n1 TITL XXX\n1 ABBR X"
        . "\n1 PUBL New York City, New York\n1 TEXT I was born\n1 REPO @R123@\n2 CALN 123456789\n3 MEDI Book\n1 REFN 14\n2 TYPE MyType\n1 RIN 42\n1 CHAN\n2 DATE 2010-03-2\n1 NOTE Hi\n1 OBJE @O45@";
        $this->assertSame($expected, $a->toGedcom('0', '5.5.1'));
    }
}