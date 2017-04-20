<?php
namespace PEAR2\Genealogy\Gedcom\Records;
use PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class HeaderRecordTest extends \PHPUnit_Framework_TestCase
{

    public function testEmtpyObjectString()
    {
        $a = new HeaderRecord();
        $expected = "PEAR2\Genealogy\Gedcom\Records\HeaderRecord(SourceSystem->PEAR2\Genealogy\Gedcom\Structures\\SourceSystem(SystemId->, VerNbr->, ProductName->, Corporation->PEAR2\Genealogy\Gedcom\Structures\\Corporation(Name->, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->)), Data->PEAR2\Genealogy\Gedcom\Structures\\Data(SourceName->, Date->, Copyright->)), DestinationSystem->, TransmissionDateTime->, SubmitterId->, SubmissionId->, Filename->, Copyright->, Language->, CharacterSet->PEAR2\Genealogy\Gedcom\Structures\\CharacterSet(CharacterSet->, VerNbr->), GedC->PEAR2\Genealogy\Gedcom\Structures\GedC(VerNbr->, Form->LINEAGE-LINKED), PlaceForm->, Note->PEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->))";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringFull()
    {
        $a = new HeaderRecord();
        $expected = "PEAR2\Genealogy\Gedcom\Records\HeaderRecord(SourceSystem->PEAR2\Genealogy\Gedcom\Structures\\SourceSystem(SystemId->42, VerNbr->1.0, ProductName->FamilyVanGogh, Corporation->PEAR2\Genealogy\Gedcom\Structures\\Corporation(Name->van Gogh Enterprises, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->555 Brown Street\nBrown City, Brownington\n55555, AddressLine1->555 Brown Street, AddressLine2->Brown City, Brownington, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com)), Data->PEAR2\Genealogy\Gedcom\Structures\\Data(SourceName->Source Data, Date->2010-03-01, Copyright->2010 Ed Thompson)), DestinationSystem->My Laptop, TransmissionDateTime->2010-03-01 12:00:00EDT, SubmitterId->S111, SubmissionId->X111, Filename->myged.ged, Copyright->2010 Ed Thompson, Language->English, CharacterSet->PEAR2\Genealogy\Gedcom\Structures\\CharacterSet(CharacterSet->UTF-8, VerNbr->1.0), GedC->PEAR2\Genealogy\Gedcom\Structures\\GedC(VerNbr->5.5.1, Form->LINEAGE-LINKED), PlaceForm->Huh?, Note->My notes not your\nnotes.)";
        $a->SourceSystem->SystemId = '42';
        $a->SourceSystem->VerNbr = "1.0";
        $a->SourceSystem->ProductName = 'FamilyVanGogh';
        $a->SourceSystem->Corporation->Name = "van Gogh Enterprises";
        $a->SourceSystem->Corporation->Address->Address = "555 Brown Street\nBrown City, Brownington\n55555";
        $a->SourceSystem->Corporation->Address->AddressLine1 = '555 Brown Street';
        $a->SourceSystem->Corporation->Address->AddressLine2 = 'Brown City, Brownington';
        $a->SourceSystem->Corporation->Address->AddressLine3 = '55555';
        $a->SourceSystem->Corporation->Address->City = 'Brown City';
        $a->SourceSystem->Corporation->Address->State = 'Brownington';
        $a->SourceSystem->Corporation->Address->PostalCode = '55555';
        $a->SourceSystem->Corporation->Address->Country = 'USA';
        $a->SourceSystem->Corporation->Address->Phone = '555-555-5555';
        $a->SourceSystem->Corporation->Address->FAX = '555-555-5555';
        $a->SourceSystem->Corporation->Address->WWW = 'www.test.com';
        $a->SourceSystem->Corporation->Address->Email = 'tester@test.com';
        $a->SourceSystem->Data->SourceName = 'Source Data';
        $a->SourceSystem->Data->Date = '2010-03-01';
        $a->SourceSystem->Data->Copyright = "2010 Ed Thompson";
        $a->DestinationSystem = 'My Laptop';
        $a->TransmissionDateTime = '2010-03-01 12:00:00EDT';
        $a->SubmitterId = 'S111';
        $a->SubmissionId = 'X111';
        $a->Filename = 'myged.ged';
        $a->Copyright = "2010 Ed Thompson";
        $a->Language = "English";
        $a->PlaceForm = "Huh?";
        $a->GedC->VerNbr = '5.5.1';
        $a->CharacterSet->CharacterSet = "UTF-8";
        $a->CharacterSet->VerNbr = '1.0';
        $a->Note = "My notes not your\nnotes.";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new HeaderRecord();
        try {
            $a->SourceSystem->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $expected = "PEAR2\Genealogy\Gedcom\Records\HeaderRecord(SourceSystem->PEAR2\Genealogy\Gedcom\Structures\SourceSystem(SystemId->42, VerNbr->, ProductName->, Corporation->PEAR2\Genealogy\Gedcom\Structures\Corporation(Name->, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->)), Data->PEAR2\Genealogy\Gedcom\Structures\Data(SourceName->, Date->, Copyright->)), DestinationSystem->My Laptop, TransmissionDateTime->, SubmitterId->, SubmissionId->, Filename->, Copyright->, Language->, CharacterSet->PEAR2\Genealogy\Gedcom\Structures\CharacterSet(CharacterSet->, VerNbr->), GedC->PEAR2\Genealogy\Gedcom\Structures\GedC(VerNbr->, Form->LINEAGE-LINKED), PlaceForm->, Note->PEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->))";
        $a = new HeaderRecord();
        $a->parseTree(array(array('0 HEAD',
        array(array('1 SOUR 42'),
        array('2 DEST My Laptop')
        )
        )
        )
        , '5.5.1');
        $this->assertSame($expected, '' . $a);
    }

    public function testParseFull() {
        $a = new HeaderRecord();
        $tree = array(array('0 HEAD',
        array(array('1 SOUR 42',
        array(array('2 VERS 1.0'),
        array('2 NAME FamilyVanGogh'),
        array('2 CORP van Gogh Enterprises',
        array(array('3 ADDR 555 Brown Street',
        array(array('4 CONT Brown City, Brownington'),
        array('4 CONT 55555'),
        array('4 ADR1 555 Brown Street'),
        array('4 ADR2 Brown City, Brownington'),
        array('4 ADR3 55555'),
        array('4 CITY Brown City'),
        array('4 POST 55555'),
        array('4 STAE Brownington'),
        array('4 CTRY USA')
        )
        ),
        array('3 PHON 555-555-5555'),
        array('3 FAX 555-555-5555'),
        array('3 EMAIL tester@test.com'),
        array('3 WWW www.test.com')
        )
        ),
        array('2 DATA Data Source',
        array(array('3 DATE 2010-03-01', array()),
        array('3 COPR Line1')))
        )
        ),
        array('1 DEST My Laptop'),
        array('1 DATE 2010-03-01', array(array('2 TIME 12:00:00EDT'))),
        array('1 LANG English'),
        array('1 FILE myged.ged'),
        array('1 SUBM @S111@'),
        array('1 SUBN @X111@'),
        array('1 COPR 2010 Ed Thompson'),
        array('1 PLAC', array(array('2 FORM Huh?'))),
        array('1 GEDC', array(array('2 VERS 5.5.1'))),
        array('1 CHAR UTF-8', array(array('2 VERS 1.0'))),
        array('1 NOTE van Gogh Rocks!')
        )));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Records\HeaderRecord(SourceSystem->PEAR2\Genealogy\Gedcom\Structures\SourceSystem(SystemId->42, VerNbr->1.0, ProductName->FamilyVanGogh, Corporation->PEAR2\Genealogy\Gedcom\Structures\Corporation(Name->van Gogh Enterprises, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->555 Brown Street\nBrown City, Brownington\n55555, AddressLine1->555 Brown Street, AddressLine2->Brown City, Brownington, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com)), Data->PEAR2\Genealogy\Gedcom\Structures\Data(SourceName->Data Source, Date->2010-03-01, Copyright->Line1)), DestinationSystem->My Laptop, TransmissionDateTime->2010-03-01 12:00:00EDT, SubmitterId->S111, SubmissionId->X111, Filename->myged.ged, Copyright->2010 Ed Thompson, Language->English, CharacterSet->PEAR2\Genealogy\Gedcom\Structures\CharacterSet(CharacterSet->UTF-8, VerNbr->1.0), GedC->PEAR2\Genealogy\Gedcom\Structures\GedC(VerNbr->5.5.1, Form->LINEAGE-LINKED), PlaceForm->Huh?, Note->PEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->van Gogh Rocks!))";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcom() {
        $expected = "0 HEAD\n1 SOUR 42";
        $a = new HeaderRecord();
        $a->parseTree(array(array('0 HEAD',
        array(array('1 SOUR 42'))
        )
        )
        , '5.5.1');
        $this->assertSame($expected, $a->toGedcom('0', '5.5.1'));
    }
    public function testGedcomFull() {
        $expected = "0 HEAD\n1 SOUR 42\n2 VERS 1.0\n2 NAME FamilyVanGogh\n2 CORP van Gogh Enterprises\n3 ADDR 555 Brown Street\n4 CONT Brown City, Brownington\n4 CONT 55555\n4 ADR1 555 Brown Street\n4 ADR2 Brown City, Brownington\n4 ADR3 55555\n4 CITY Brown City\n4 STAE Brownington\n4 POST 55555\n4 CTRY USA\n3 PHON 555-555-5555\n3 EMAIL tester@test.com\n3 FAX 555-555-5555\n3 WWW www.test.com\n2 DATA Data Source\n3 DATE 2010-03-01\n3 COPR Line1\n1 DEST My Laptop\n1 DATE 2010-03-01\n1 TIME 12:00:00EDT\n1 SUBM @S111@\n1 SUBN @X111@\n1 FILE myged.ged\n1 COPR 2010 Ed Thompson\n1 GEDC\n2 VERS 5.5.1\n2 FORM LINEAGE-LINKED\n1 CHAR UTF-8\n2 VERS 1.0\n1 LANG English\n1 PLAC\n2 FORM Huh?\n1 NOTE van Gogh Rocks!";
        $a = new HeaderRecord();
        $tree = array(array('0 HEAD',
        array(array('1 SOUR 42',
        array(array('2 VERS 1.0'),
        array('2 NAME FamilyVanGogh'),
        array('2 CORP van Gogh Enterprises',
        array(array('3 ADDR 555 Brown Street',
        array(array('4 CONT Brown City, Brownington'),
        array('4 CONT 55555'),
        array('4 ADR1 555 Brown Street'),
        array('4 ADR2 Brown City, Brownington'),
        array('4 ADR3 55555'),
        array('4 CITY Brown City'),
        array('4 POST 55555'),
        array('4 STAE Brownington'),
        array('4 CTRY USA')
        )
        ),
        array('3 PHON 555-555-5555'),
        array('3 FAX 555-555-5555'),
        array('3 EMAIL tester@test.com'),
        array('3 WWW www.test.com')
        )
        ),
        array('2 DATA Data Source',
        array(array('3 DATE 2010-03-01', array()),
        array('3 COPR Line1')))
        )
        ),
        array('1 DEST My Laptop'),
        array('1 DATE 2010-03-01', array(array('2 TIME 12:00:00EDT'))),
        array('1 LANG English'),
        array('1 FILE myged.ged'),
        array('1 SUBM @S111@'),
        array('1 SUBN @X111@'),
        array('1 COPR 2010 Ed Thompson'),
        array('1 PLAC', array(array('2 FORM Huh?'))),
        array('1 GEDC', array(array('2 VERS 5.5.1'))),
        array('1 CHAR UTF-8', array(array('2 VERS 1.0'))),
        array('1 NOTE van Gogh Rocks!')
        )));
        $a->parseTree($tree, '5.5.1');
        $this->assertSame($expected, $a->toGedcom('0', '5.5.1'));
    }
}
?>