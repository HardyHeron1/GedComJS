<?php
namespace PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class CorporationTest extends \PHPUnit_Framework_TestCase
{

    public function testEmtpyObjectString()
    {
        $a = new Corporation();
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Corporation(Name->, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->))";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringFull()
    {
        $a = new Corporation();
        $a->Name = "van Gogh Enterprises";
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
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Corporation(Name->van Gogh Enterprises, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->555 Brown Street\nBrown City, Brownington\n55555, AddressLine1->555 Brown Street, AddressLine2->Brown City, Brownington, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com))";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new Corporation();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Corporation(Name->van Gogh Enterprises, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->))";
        $a = new Corporation();
        $a->parseTree(array(array('1 CORP van Gogh Enterprises')), '5.5.1');
        $this->assertSame($expected, '' . $a);
    }

    public function testParseFull() {
        $a = new Corporation();
        $tree = array(array('1 CORP van Gogh Enterprises',
        array(array('2 ADDR 555 Brown Street',
        array(array('3 CONT Brown City, Brownington'),
        array('3 CONT 55555'),
        array('3 ADR1 555 Brown Street'),
        array('3 ADR2 Brown City, Brownington'),
        array('3 ADR3 55555'),
        array('3 CITY Brown City'),
        array('3 POST 55555'),
        array('3 STAE Brownington'),
        array('3 CTRY USA')
        )
        ),
        array('2 PHON 555-555-5555'),
        array('2 FAX 555-555-5555'),
        array('2 EMAIL tester@test.com'),
        array('2 WWW www.test.com')))
        );
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Corporation(Name->van Gogh Enterprises, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->5.5.1, Address->555 Brown Street\nBrown City, Brownington\n55555, AddressLine1->555 Brown Street, AddressLine2->Brown City, Brownington, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com))";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcom() {
        $expected = "1 CORP van Gogh Enterprises";
        $a = new Corporation();
        $a->parseTree(array(array('1 CORP van Gogh Enterprises')), array());
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
    public function testGedcomFull() {
        $expected = "1 CORP van Gogh Enterprises\n2 ADDR 555 Brown Street\n3 CONT Brown City, Brownington\n3 CONT 55555\n3 ADR1 555 Brown Street\n3 ADR2 Brown City, Brownington\n3 ADR3 55555\n3 CITY Brown City\n3 STAE Brownington\n3 POST 55555\n3 CTRY USA\n2 PHON 555-555-5555\n2 EMAIL tester@test.com\n2 FAX 555-555-5555\n2 WWW www.test.com";
        $a = new Corporation();
        $tree = array(array('1 CORP van Gogh Enterprises',
        array(array('2 ADDR 555 Brown Street',
        array(array('3 CONT Brown City, Brownington'),
        array('3 CONT 55555'),
        array('3 ADR1 555 Brown Street'),
        array('3 ADR2 Brown City, Brownington'),
        array('3 ADR3 55555'),
        array('3 CITY Brown City'),
        array('3 POST 55555'),
        array('3 STAE Brownington'),
        array('3 CTRY USA')
        )
        ),
        array('2 PHON 555-555-5555'),
        array('2 FAX 555-555-5555'),
        array('2 EMAIL tester@test.com'),
        array('2 WWW www.test.com')))
        );
        $a->parseTree($tree, '5.5.1');
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
}
?>