<?php
namespace PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class SourceSystemTest extends \PHPUnit_Framework_TestCase
{

    public function testEmtpyObjectString()
    {
        $a = new SourceSystem();
        $expected = "PEAR2\Genealogy\Gedcom\Structures\SourceSystem(SystemId->, VerNbr->, ProductName->, Corporation->PEAR2\Genealogy\Gedcom\Structures\Corporation(Name->, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->)), Data->PEAR2\Genealogy\Gedcom\Structures\Data(SourceName->, Date->, Copyright->))";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringFull()
    {
        $a = new SourceSystem();
        $expected = "PEAR2\Genealogy\Gedcom\Structures\SourceSystem(SystemId->42, VerNbr->1.0, ProductName->FamilyVanGogh, Corporation->PEAR2\Genealogy\Gedcom\Structures\Corporation(Name->van Gogh Enterprises, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->555 Brown Street\nBrown City, Brownington\n55555, AddressLine1->555 Brown Street, AddressLine2->Brown City, Brownington, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com)), Data->PEAR2\Genealogy\Gedcom\Structures\Data(SourceName->Source Data, Date->2010-03-01, Copyright->2010 Ed Thompson))";
        $a->SystemId = '42';
        $a->VerNbr = "1.0";
        $a->ProductName = 'FamilyVanGogh';
        $a->Corporation->Name = "van Gogh Enterprises";
        $a->Corporation->Address->Address = "555 Brown Street\nBrown City, Brownington\n55555";
        $a->Corporation->Address->AddressLine1 = '555 Brown Street';
        $a->Corporation->Address->AddressLine2 = 'Brown City, Brownington';
        $a->Corporation->Address->AddressLine3 = '55555';
        $a->Corporation->Address->City = 'Brown City';
        $a->Corporation->Address->State = 'Brownington';
        $a->Corporation->Address->PostalCode = '55555';
        $a->Corporation->Address->Country = 'USA';
        $a->Corporation->Address->Phone = '555-555-5555';
        $a->Corporation->Address->FAX = '555-555-5555';
        $a->Corporation->Address->WWW = 'www.test.com';
        $a->Corporation->Address->Email = 'tester@test.com';
        $a->Data->SourceName = 'Source Data';
        $a->Data->Date = '2010-03-01';
        $a->Data->Copyright = "2010 Ed Thompson";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new SourceSystem();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $expected = "PEAR2\Genealogy\Gedcom\Structures\SourceSystem(SystemId->42, VerNbr->1.0, ProductName->FamilyVanGogh, Corporation->PEAR2\Genealogy\Gedcom\Structures\Corporation(Name->, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->)), Data->PEAR2\Genealogy\Gedcom\Structures\Data(SourceName->, Date->, Copyright->))";
        $a = new SourceSystem();
        $a->parseTree(array(array('1 SOUR 42',
        array(array('2 VERS 1.0'),
        array('2 NAME FamilyVanGogh')
        )
        )
        )
        , '5.5.1');
        $this->assertSame($expected, '' . $a);
    }

    public function testParseFull() {
        $a = new SourceSystem();
        $tree = array(array('1 SOUR 42',
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
        )
        );
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\SourceSystem(SystemId->42, VerNbr->1.0, ProductName->FamilyVanGogh, Corporation->PEAR2\Genealogy\Gedcom\Structures\Corporation(Name->van Gogh Enterprises, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->5.5.1, Address->555 Brown Street\nBrown City, Brownington\n55555, AddressLine1->555 Brown Street, AddressLine2->Brown City, Brownington, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com)), Data->PEAR2\Genealogy\Gedcom\Structures\Data(SourceName->Data Source, Date->2010-03-01, Copyright->Line1))";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcom() {
        $expected = "1 SOUR 42\n2 VERS 1.0\n2 NAME FamilyVanGogh";
        $a = new SourceSystem();
        $a->parseTree(array(array('1 SOUR 42',
        array(array('2 VERS 1.0'),
        array('2 NAME FamilyVanGogh')
        )
        )
        )
        , '5.5.1');
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
    public function testGedcomFull() {
        $expected = "1 SOUR 42\n2 VERS 1.0\n2 NAME FamilyVanGogh\n2 CORP van Gogh Enterprises\n3 ADDR 555 Brown Street\n4 CONT Brown City, Brownington\n4 CONT 55555\n4 ADR1 555 Brown Street\n4 ADR2 Brown City, Brownington\n4 ADR3 55555\n4 CITY Brown City\n4 STAE Brownington\n4 POST 55555\n4 CTRY USA\n3 PHON 555-555-5555\n3 EMAIL tester@test.com\n3 FAX 555-555-5555\n3 WWW www.test.com\n2 DATA Data Source\n3 DATE 2010-03-01\n3 COPR Line1";
        $a = new SourceSystem();
        $tree = array(array('1 SOUR 42',
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
        )
        );
        $a->parseTree($tree, '5.5.1');
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
}
?>