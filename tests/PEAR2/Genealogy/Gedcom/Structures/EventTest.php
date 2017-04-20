<?php
namespace PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class EventTest extends \PHPUnit_Framework_TestCase
{
    public function testEmtpyObjectString()
    {
        $a = new Event();
        $expected = "PEAR2\Genealogy\Gedcom\Structures\FactDetail(Version->, Tag->, Description->, Type->, Date->, Place->PEAR2\Genealogy\Gedcom\Structures\Place(Version->, Name->, PlaceForm->, Coordinates-> by ), Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->), Age->, RespAgency->, ReligiousAffiliation->, Restriction->, Cause->)";
        $this->assertSame($expected, '' . $a);
    }

    public function testString()
    {
        $a = new Event();
        $a->Ver = '5.5.1';
        $a->Tag = 'EVEN';
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
        $expected = "PEAR2\Genealogy\Gedcom\Structures\FactDetail(Version->5.5.1, Tag->EVEN, Description->Tripped, Type->Accident, Date->2010-03-14, Place->PEAR2\Genealogy\Gedcom\Structures\Place(Version->, Name->Home, PlaceForm->, Coordinates-> by ), Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->5.5.1, Address->555 Brown Street\nBrown City, Brownington\n55555, AddressLine1->555 Brown Street, AddressLine2->Brown City, Brownington, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com), Age->14, RespAgency->Self, ReligiousAffiliation->Human, Restriction->none, Cause->String across the door.)";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new Event();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $a = new Event();
        $tree = array(array('1 EVEN Tripped', array(array('2 TYPE Accident'))));
        $a->parseTree($tree, '5.5.1', 'EVEN');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\FactDetail(Version->5.5.1, Tag->EVEN, Description->Tripped, Type->Accident, Date->, Place->PEAR2\Genealogy\Gedcom\Structures\Place(Version->5.5.1, Name->, PlaceForm->, Coordinates-> by ), Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->5.5.1, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->), Age->, RespAgency->, ReligiousAffiliation->, Restriction->, Cause->)";
        $this->assertSame($expected, '' . $a);
    }

    public function testParseFalse() {
        $a = new Event();
        $tree = array(array('1 GOGH Art'));
        $a->parseTree($tree, '5.5.1', 'VAN');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\FactDetail(Version->5.5.1, Tag->, Description->, Type->, Date->, Place->PEAR2\Genealogy\Gedcom\Structures\Place(Version->, Name->, PlaceForm->, Coordinates-> by ), Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->), Age->, RespAgency->, ReligiousAffiliation->, Restriction->, Cause->)";
        $this->assertSame($expected, '' . $a);
    }

    public function testParseAllTypes() {
        $a = new Event();
        $t = $a->getTypes();
        $tree = array(
        array('1 ADOP', array(array('2 TYPE '. $t['ADOP']))),
        array('1 BIRT', array(array('2 TYPE '. $t['BIRT']))),
        array('1 BAPM', array(array('2 TYPE '. $t['BAPM']))),
        array('1 BASM', array(array('2 TYPE '. $t['BASM']))),
        array('1 BLES', array(array('2 TYPE '. $t['BLES']))),
        array('1 BARM', array(array('2 TYPE '. $t['BARM']))),
        array('1 BURI', array(array('2 TYPE '. $t['BURI']))),
        array('1 CENS', array(array('2 TYPE '. $t['CENS']))),
        array('1 CHR', array(array('2 TYPE '. $t['CHR']))),
        array('1 CHRA', array(array('2 TYPE '. $t['CHRA']))),
        array('1 CONF', array(array('2 TYPE '. $t['CONF']))),
        array('1 CREM', array(array('2 TYPE '. $t['CREM']))),
        array('1 DEAT', array(array('2 TYPE '. $t['DEAT']))),
        array('1 EMIG', array(array('2 TYPE '. $t['EMIG']))),
        array('1 FCOM', array(array('2 TYPE '. $t['FCOM']))),
        array('1 GRAD', array(array('2 TYPE '. $t['GRAD']))),
        array('1 IMMI', array(array('2 TYPE '. $t['IMMI']))),
        array('1 NATU', array(array('2 TYPE '. $t['NATU']))),
        array('1 ORDN', array(array('2 TYPE '. $t['ORDN']))),
        array('1 RETI', array(array('2 TYPE '. $t['RETI']))),
        array('1 PROB', array(array('2 TYPE '. $t['PROB']))),
        array('1 WILL', array(array('2 TYPE '. $t['WILL']))),
        array('1 ANUL', array(array('2 TYPE '. $t['ANUL']))),
        array('1 DIV', array(array('2 TYPE '. $t['DIV']))),
        array('1 DIVF', array(array('2 TYPE '. $t['DIVF']))),
        array('1 ENG', array(array('2 TYPE '. $t['ENG']))),
        array('1 MARB', array(array('2 TYPE '. $t['MARB']))),
        array('1 MARS', array(array('2 TYPE '. $t['MARS']))),
        array('1 MARR', array(array('2 TYPE '. $t['MARR']))),
        array('1 MARC', array(array('2 TYPE '. $t['MARC']))),
        array('1 MARL', array(array('2 TYPE '. $t['MARL']))),
        array('1 RESI', array(array('2 TYPE '. $t['RESI']))),
        array('1 EVEN Tripped', array(array('2 TYPE '. $t['EVEN'])))
        );
        $keys = array_keys($t);
        foreach ($keys as $key) {
            $e = new Event();
            $e->parseTree($tree, '5.5.1', $key);
            $this->assertSame($key, '' . $e->Tag);
            $this->assertSame($t[$key], '' . $e->Type);
        }
    }

    public function testParseTreeArray() {
        $a = new Event();
        $t = $a->getTypes();
        $tree = array(
        array('1 ADOP', array(array('2 TYPE '. $t['ADOP']))),
        array('1 BIRT', array(array('2 TYPE '. $t['BIRT']))),
        array('1 BAPM', array(array('2 TYPE '. $t['BAPM']))),
        array('1 BASM', array(array('2 TYPE '. $t['BASM']))),
        array('1 BLES', array(array('2 TYPE '. $t['BLES']))),
        array('1 BARM', array(array('2 TYPE '. $t['BARM']))),
        array('1 BURI', array(array('2 TYPE '. $t['BURI']))),
        array('1 CENS', array(array('2 TYPE '. $t['CENS']))),
        array('1 CHR', array(array('2 TYPE '. $t['CHR']))),
        array('1 CHRA', array(array('2 TYPE '. $t['CHRA']))),
        array('1 CONF', array(array('2 TYPE '. $t['CONF']))),
        array('1 CREM', array(array('2 TYPE '. $t['CREM']))),
        array('1 DEAT', array(array('2 TYPE '. $t['DEAT']))),
        array('1 EMIG', array(array('2 TYPE '. $t['EMIG']))),
        array('1 FCOM', array(array('2 TYPE '. $t['FCOM']))),
        array('1 GRAD', array(array('2 TYPE '. $t['GRAD']))),
        array('1 IMMI', array(array('2 TYPE '. $t['IMMI']))),
        array('1 NATU', array(array('2 TYPE '. $t['NATU']))),
        array('1 ORDN', array(array('2 TYPE '. $t['ORDN']))),
        array('1 RETI', array(array('2 TYPE '. $t['RETI']))),
        array('1 PROB', array(array('2 TYPE '. $t['PROB']))),
        array('1 WILL', array(array('2 TYPE '. $t['WILL']))),
        array('1 ANUL', array(array('2 TYPE '. $t['ANUL']))),
        array('1 DIV', array(array('2 TYPE '. $t['DIV']))),
        array('1 DIVF', array(array('2 TYPE '. $t['DIVF']))),
        array('1 ENG', array(array('2 TYPE '. $t['ENG']))),
        array('1 MARB', array(array('2 TYPE '. $t['MARB']))),
        array('1 MARS', array(array('2 TYPE '. $t['MARS']))),
        array('1 MARR', array(array('2 TYPE '. $t['MARR']))),
        array('1 MARC', array(array('2 TYPE '. $t['MARC']))),
        array('1 MARL', array(array('2 TYPE '. $t['MARL']))),
        array('1 RESI', array(array('2 TYPE '. $t['RESI']))),
        array('1 EVEN Tripped', array(array('2 TYPE '. $t['EVEN'])))
        );
        $e = new Event();
        $result = $e->parseTreeToArray($tree, '5.5.1');
        //            for ($i = 0; $i < count($result); $i++)
        //            	var_dump($result[$i]->Tag);
        $this->assertEquals(count($tree), count($result));
    }
    public function testGedcom() {
        $expected = "1 EVEN Tripped\n2 TYPE Accident";
        $a = new Event();
        $tree = array(array('1 EVEN Tripped', array(array('2 TYPE Accident'))));
        $a->parseTree($tree, '5.5.1', 'EVEN');
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
}
//$tmp = new EventTest();
//$tmp->testParseTreeArray();
?>