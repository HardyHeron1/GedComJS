<?php
namespace PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class AddressTest extends \PHPUnit_Framework_TestCase
{

    public function testEmtpyObjectString()
    {
        $a = new Address();
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->)";
        $this->assertSame($expected, '' . $a);
    }

    public function testString()
    {
        $a = new Address();
        $a->Ver = '5.5.1';
        $a->Address = "555 Brown Street\nBrown City, Brownington\n55555";
        $a->AddressLine1 = '555 Brown Street';
        $a->AddressLine2 = 'Brown City, Brownington';
        $a->AddressLine3 = '55555';
        $a->City = 'Brown City';
        $a->State = 'Brownington';
        $a->PostalCode = '55555';
        $a->Country = 'USA';
        $a->Phone = '555-555-5555';
        $a->FAX = '555-555-5555';
        $a->WWW = 'www.test.com';
        $a->Email = 'tester@test.com';
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Address(Version->5.5.1, Address->555 Brown Street\nBrown City, Brownington\n55555, AddressLine1->555 Brown Street, AddressLine2->Brown City, Brownington, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com)";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new Address();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Address(Version->5.5.1, Address->Address Line 0, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->)";
        $a = new Address();
        $a->parseTree(array(array('1 ADDR Address Line 0')), '5.5.1');
        $this->assertSame($expected, '' . $a);
    }

    public function testParseFull() {
        $a = new Address();
        $tree = array(array('1 ADDR 555 Brown Street',
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
        array('1 WWW www.test.com')
        );
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\Address(Version->5.5.1, Address->555 Brown Street\nBrown City, Brownington\n55555, AddressLine1->555 Brown Street, AddressLine2->Brown City, Brownington, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com)";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcomAddrOnly() {
        $expected = "1 ADDR Address Line 0";
        $a = new Address();
        $a->parseTree(array(array('1 ADDR Address Line 0')), '5.5.1');
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
    public function testGedcomFull() {
        $expected = "1 ADDR 555 Brown Street\n2 CONT Brown City, Brownington\n2 CONT 55555\n2 ADR1 555 Brown Street\n2 ADR2 Brown City, Brownington\n2 ADR3 55555\n2 CITY Brown City\n2 STAE Brownington\n2 POST 55555\n2 CTRY USA\n1 PHON 555-555-5555\n1 EMAIL tester@test.com\n1 FAX 555-555-5555\n1 WWW www.test.com";
        $a = new Address();
        $tree = array(array('1 ADDR 555 Brown Street',
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
        array('1 WWW www.test.com')
        );
        $a->parseTree($tree, '5.5.1');
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
}
//$a = new AddressTest();
//$a->testParseFull();
?>