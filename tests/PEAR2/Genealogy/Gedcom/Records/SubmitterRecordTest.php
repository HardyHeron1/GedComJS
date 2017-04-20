<?php
namespace PEAR2\Genealogy\Gedcom\Records;
use PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class SubmitterRecordTest extends \PHPUnit_Framework_TestCase
{
    public function testEmtpyObjectString()
    {
        $a = new SubmitterRecord();
        $expected = "PEAR2\Genealogy\Gedcom\Records\SubmitterRecord(Id->, Name->, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->), Language->, SubmitterRefNbr->, AutoRecId->, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date-> , Notes->()), Notes->())";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringFull()
    {
        $a = new SubmitterRecord();
        $a->Id = 'S123';
        $a->Name = "Vincent van Gogh";
        $a->Address->Address = "555 Brown Street\nBrown City, Brownington\n55555";
        $a->Address->AddressLine1 = '555 Brown Street';
        $a->Address->AddressLine2 = 'Brown City, Brownington';
        $a->Address->AddressLine3 = '55555';
        $a->Address->City = 'Brown City';
        $a->Address->State = 'Brownington';
        $a->Address->PostalCode = '55555';
        $a->Address->Country = 'USA';
        $a->Address->Phone = '555-555-5555';
        $a->Address->FAX = '555-555-5555';
        $a->Address->WWW = 'www.test.com';
        $a->Address->Email = 'tester@test.com';
        $a->AutoRecId = '42';
        $a->Language = 'English';
        $a->SubmitterRefNbr = '2222';
        $a->ChangeDate->Date = '2010-03-10 12:00:00EST';
        $a->ChangeDate->Notes[0] = new Structures\Note();
        $a->ChangeDate->Notes[0]->Text = 'I changed the record for testing';
        $a->Notes[0] = new Structures\Note();
        $a->Notes[0]->Text = "My notes not your\nnotes.";
        $a->MediaLinks[0] = new Structures\MediaLink();
        $a->MediaLinks[0]->Id = "O45";
        $expected = "PEAR2\Genealogy\Gedcom\Records\SubmitterRecord(Id->S123, Name->Vincent van Gogh, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->555 Brown Street"
        . "\nBrown City, Brownington"
        . "\n55555, AddressLine1->555 Brown Street, AddressLine2->Brown City, Brownington, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com)"
        . "\nPEAR2\Genealogy\Gedcom\Structures\MediaLink(Version->, Id->O45), Language->English, SubmitterRefNbr->2222, AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-10 12:00:00EST , Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->I changed the record for testing))), Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->My notes not your"
        . "\nnotes.)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new SubmitterRecord();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $a = new SubmitterRecord();
        $tree = array(array('0 @S2222@ SUBM'));
        $a->parseTree($tree, '5.5.1');
        $expected = "S2222";
        $this->assertSame($expected, '' . $a->Id);
    }

    public function testParseFull() {
        $a = new SubmitterRecord();
        $tree = array(array('0 @S2222@ SUBM', array(
        array('1 NAME Vincent van Gogh'),
        array('1 ADDR 555 Brown Street',
        array(array('2 CONT Brown City, Brownington'),
        array('2 CONT 55555'),
        array('2 ADR1 555 Brown Street'),
        array('2 ADR2 Brown City, Brownington'),
        array('2 ADR3 55555'),
        array('2 CITY Brown City'),
        array('2 POST 55555'),
        array('2 STAE Brownington'),
        array('2 CTRY USA')
        )
        ),
        array('1 PHON 555-555-5555'),
        array('1 FAX 555-555-5555'),
        array('1 EMAIL tester@test.com'),
        array('1 WWW www.test.com'),
        array('1 LANG English'),
        array('1 RIN 42'),
        array('1 RFN 2222222'),
        array('1 CHAN ',array(array('2 DATE 2010-03-2'))),
        array('1 NOTE van Gogh Rocks!'),
        array('1 OBJE @O14@')
        )));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Records\SubmitterRecord(Id->S2222, Name->Vincent van Gogh, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->5.5.1, Address->555 Brown Street"
        . "\nBrown City, Brownington"
        . "\n55555, AddressLine1->555 Brown Street, AddressLine2->Brown City, Brownington, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com)"
        . "\nPEAR2\Genealogy\Gedcom\Structures\MediaLink(Version->5.5.1, Id->O14), Language->English, SubmitterRefNbr->2222222, AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-2 , Notes->()), Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcom() {
        $a = new SubmitterRecord();
        $tree = array(array('0 @S2222@ SUBM'));
        $a->parseTree($tree, '5.5.1');
        $expected = "0 @S2222@ SUBM";
        $this->assertSame($expected, $a->toGedcom('0', '5.5.1'));
    }
    public function testGedcomFull() {
        $a = new SubmitterRecord();
        $tree = array(array('0 @S2222@ SUBM', array(
        array('1 NAME Vincent van Gogh'),
        array('1 ADDR 555 Brown Street',
        array(array('2 CONT Brown City, Brownington'),
        array('2 CONT 55555'),
        array('2 ADR1 555 Brown Street'),
        array('2 ADR2 Brown City, Brownington'),
        array('2 ADR3 55555'),
        array('2 CITY Brown City'),
        array('2 POST 55555'),
        array('2 STAE Brownington'),
        array('2 CTRY USA')
        )
        ),
        array('1 PHON 555-555-5555'),
        array('1 FAX 555-555-5555'),
        array('1 EMAIL tester@test.com'),
        array('1 WWW www.test.com'),
        array('1 LANG English'),
        array('1 RIN 42'),
        array('1 RFN 2222222'),
        array('1 CHAN ',array(array('2 DATE 2010-03-2'))),
        array('1 NOTE van Gogh Rocks!'),
        array('1 OBJE @O14@')
        )));
        $a->parseTree($tree, '5.5.1');
        $expected = "0 @S2222@ SUBM\n1 NAME Vincent van Gogh\n1 ADDR 555 Brown Street\n2 CONT Brown City, Brownington\n2 CONT 55555"
        . "\n2 ADR1 555 Brown Street\n2 ADR2 Brown City, Brownington\n2 ADR3 55555\n2 CITY Brown City"
        . "\n2 STAE Brownington\n2 POST 55555\n2 CTRY USA\n1 PHON 555-555-5555\n1 EMAIL tester@test.com"
        . "\n1 FAX 555-555-5555\n1 WWW www.test.com\n1 OBJE @O14@\n1 RIN 42\n1 CHAN\n2 DATE 2010-03-2\n1 NOTE van Gogh Rocks!";
        $this->assertSame($expected, $a->toGedcom('0', '5.5.1'));
    }
}