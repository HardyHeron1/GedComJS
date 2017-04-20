<?php
namespace PEAR2\Genealogy\Gedcom\Records;
use PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class RepositoryRecordTest extends \PHPUnit_Framework_TestCase
{
    public function testEmtpyObjectString()
    {
        $a = new RepositoryRecord();
        $expected = "PEAR2\Genealogy\Gedcom\Records\RepositoryRecord(Id->, Name->, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->), UserRefNbrs->(), AutoRecId->, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date-> , Notes->()), Notes->())";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringFull()
    {
        $a = new RepositoryRecord();
        $a->Id = 'R333';
        $a->Name = 'Circular Filing';
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
        $a->ChangeDate->Date = '2010-03-10 12:00:00EST';
        $a->Notes[0] = new Structures\Note();
        $a->Notes[0]->Text = "My notes not your notes.";
        $a->UserRefNbrs[0]['Nbr'] = '14';
        $a->UserRefNbrs[0]['Type'] = 'MyType';
        $expected = "PEAR2\Genealogy\Gedcom\Records\RepositoryRecord(Id->R333, Name->Circular Filing, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->555 Brown Street"
        . "\nBrown City, Brownington"
        . "\n55555, AddressLine1->555 Brown Street, AddressLine2->Brown City, Brownington, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com), UserRefNbrs->(UserRefNbr->14 (MyType)), AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-10 12:00:00EST , Notes->()), Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->My notes not your notes.)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new RepositoryRecord();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $a = new RepositoryRecord();
        $tree = array(array('0 @R11XX@ REPO'));
        $a->parseTree($tree, '5.5.1');
        $expected = "R11XX";
        $this->assertSame($expected, '' . $a->Id);
    }

    public function testParseFull() {
        $a = new RepositoryRecord();
        $tree = array(array('0 @R333@ REPO', array(
        array('1 NAME Circular Filing'),
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
        array('1 REFN 14',array(
        array('2 TYPE MyType'))),
        array('1 RIN 42'),
        array('1 CHAN',array(array('2 DATE 2010-03-2'))),
        array('1 NOTE van Gogh Rocks!'),
        )));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Records\RepositoryRecord(Id->R333, Name->Circular Filing, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->5.5.1, Address->555 Brown Street"
        . "\nBrown City, Brownington"
        . "\n55555, AddressLine1->555 Brown Street, AddressLine2->Brown City, Brownington, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com), UserRefNbrs->(UserRefNbr->14 (MyType)), AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-2 , Notes->()), Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcom() {
        $a = new RepositoryRecord();
        $tree = array(array('0 @R11XX@ REPO'));
        $a->parseTree($tree, '5.5.1');
        $expected = "0 @R11XX@ REPO";
        $this->assertSame($expected, $a->toGedcom('0', '5.5.1'));
    }
    public function testGedcomFull() {
        $a = new RepositoryRecord();
        $tree = array(array('0 @R333@ REPO', array(
        array('1 NAME Circular Filing'),
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
        array('1 REFN 14',array(
        array('2 TYPE MyType'))),
        array('1 RIN 42'),
        array('1 CHAN',array(array('2 DATE 2010-03-2'))),
        array('1 NOTE van Gogh Rocks!'),
        )));
        $a->parseTree($tree, '5.5.1');
        $expected = "0 @R333@ REPO\n1 NAME Circular Filing\n1 ADDR 555 Brown Street\n2 CONT Brown City, Brownington\n2 CONT 55555\n2 ADR1 555 Brown Street"
        . "\n2 ADR2 Brown City, Brownington\n2 ADR3 55555\n2 CITY Brown City\n2 STAE Brownington\n2 POST 55555\n2 CTRY USA\n1 PHON 555-555-5555"
        . "\n1 EMAIL tester@test.com\n1 FAX 555-555-5555\n1 WWW www.test.com\n1 REFN 14\n2 TYPE MyType\n1 RIN 42\n1 CHAN\n2 DATE 2010-03-2\n1 NOTE van Gogh Rocks!";
        $this->assertSame($expected, $a->toGedcom('0', '5.5.1'));
    }
}