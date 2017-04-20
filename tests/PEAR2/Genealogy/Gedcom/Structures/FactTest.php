<?php
namespace PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class FactTest extends \PHPUnit_Framework_TestCase
{
    public function testEmtpyObjectString()
    {
        $a = new Fact();
        $expected = "PEAR2\Genealogy\Gedcom\Structures\FactDetail(Version->, Tag->, Description->, Type->, Date->, Place->PEAR2\Genealogy\Gedcom\Structures\Place(Version->, Name->, PlaceForm->, Coordinates-> by ), Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->), Age->, RespAgency->, ReligiousAffiliation->, Restriction->, Cause->)";
        $this->assertSame($expected, '' . $a);
    }

    public function testString()
    {
        $a = new Fact();
        $a->Ver = '5.5.1';
        $a->Tag = 'FACT';
        $a->Descr = 'Tripped';
        $a->Type = 'Accident';
        $a->Date = '2010-03-14';
        $a->Age = '14';
        $a->RespAgency = 'Self';
        $a->ReligiousAffiliation = 'Human';
        $a->Restriction = 'none';
        $a->Cause = 'String across the door.';
        $a->Address->Ver = '5.5.1';
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
        $a->Place->Name = 'Home';
        $expected = "PEAR2\Genealogy\Gedcom\Structures\FactDetail(Version->5.5.1, Tag->FACT, Description->Tripped, Type->Accident, Date->2010-03-14, Place->PEAR2\Genealogy\Gedcom\Structures\Place(Version->, Name->Home, PlaceForm->, Coordinates-> by ), Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->5.5.1, Address->555 Brown Street\nBrown City, Brownington\n55555, AddressLine1->555 Brown Street, AddressLine2->Brown City, Brownington, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com), Age->14, RespAgency->Self, ReligiousAffiliation->Human, Restriction->none, Cause->String across the door.)";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new Fact();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $a = new Fact();
        $tree = array(array('1 FACT Tripped', array(array('2 TYPE Accident'))));
        $a->parseTree($tree, '5.5.1', 'FACT');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\FactDetail(Version->5.5.1, Tag->FACT, Description->Tripped, Type->Accident, Date->, Place->PEAR2\Genealogy\Gedcom\Structures\Place(Version->5.5.1, Name->, PlaceForm->, Coordinates-> by ), Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->5.5.1, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->), Age->, RespAgency->, ReligiousAffiliation->, Restriction->, Cause->)";
        $this->assertSame($expected, '' . $a);
    }

    public function testParseFalse() {
        $a = new Fact();
        $tree = array(array('1 GOGH Art'));
        $a->parseTree($tree, '5.5.1', 'VAN');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\FactDetail(Version->5.5.1, Tag->, Description->, Type->, Date->, Place->PEAR2\Genealogy\Gedcom\Structures\Place(Version->, Name->, PlaceForm->, Coordinates-> by ), Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->), Age->, RespAgency->, ReligiousAffiliation->, Restriction->, Cause->)";
        $this->assertSame($expected, '' . $a);
    }

    public function testParseAllTypes() {
        $a = new Fact();
        $t = $a->getTypes();
        $tree = array(
        array('1 CAST', array(array('2 TYPE '. $t['CAST']))),
        array('1 EDUC', array(array('2 TYPE '. $t['EDUC']))),
        array('1 NATI', array(array('2 TYPE '. $t['NATI']))),
        array('1 OCCU', array(array('2 TYPE '. $t['OCCU']))),
        array('1 PROP', array(array('2 TYPE '. $t['PROP']))),
        array('1 RELI', array(array('2 TYPE '. $t['RELI']))),
        array('1 RESI', array(array('2 TYPE '. $t['RESI']))),
        array('1 TITL', array(array('2 TYPE '. $t['TITL']))),
        array('1 SSN', array(array('2 TYPE '. $t['SSN']))),
        array('1 FACT Tripped', array(array('2 TYPE '. $t['FACT'])))
        );
        $keys = array_keys($t);
        foreach ($keys as $key) {
            $e = new Fact();
            $e->parseTree($tree, '5.5.1', $key);
            $this->assertSame($key, '' . $e->Tag);
            $this->assertSame($t[$key], '' . $e->Type);
        }
    }
    public function testParseTreeArray() {
        $a = new Fact();
        $t = $a->getTypes();
        $tree = array(
        array('1 CAST', array(array('2 TYPE '. $t['CAST']))),
        array('1 EDUC', array(array('2 TYPE '. $t['EDUC']))),
        array('1 NATI', array(array('2 TYPE '. $t['NATI']))),
        array('1 OCCU', array(array('2 TYPE '. $t['OCCU']))),
        array('1 PROP', array(array('2 TYPE '. $t['PROP']))),
        array('1 RELI', array(array('2 TYPE '. $t['RELI']))),
        array('1 RESI', array(array('2 TYPE '. $t['RESI']))),
        array('1 TITL', array(array('2 TYPE '. $t['TITL']))),
        array('1 SSN', array(array('2 TYPE '. $t['SSN']))),
        array('1 FACT Tripped', array(array('2 TYPE '. $t['FACT'])))
        );
        $result = $a->parseTreeToArray($tree, '5.5.1');
        //            for ($i = 0; $i < count($result); $i++)
        //            	var_dump($result[$i]->Tag);
        $this->assertEquals(count($tree), count($result));
    }
    public function testGedcom() {
        $expected = "1 FACT Tripped\n2 TYPE Accident";
        $a = new Fact();
        $tree = array(array('1 FACT Tripped', array(array('2 TYPE Accident'))));
        $a->parseTree($tree, '5.5.1', 'FACT');
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
}
?>