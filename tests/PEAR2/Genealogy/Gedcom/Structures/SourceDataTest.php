<?php
namespace PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

class SourceDataTest extends \PHPUnit_Framework_TestCase
{
    public function testEmtpyObjectString()
    {
        $a = new SourceData();
        $expected = "PEAR2\Genealogy\Gedcom\Structures\SourceData(RecordedEvents->(), ResponsibleAgency->, Notes->())";
        $this->assertSame($expected, '' . $a);
    }

    public function testStringFull()
    {
        $a = new SourceData();
        $a->Ver = '5.5.1';
        $a->RecordedEvents[0] = array('Types'=>'BIRT', 'Date'=>'2010-03-01', 'Jurisdiction'=>'City of Charlotte');
        $a->RecordedEvents[1] = array('Types'=>'DEAT', 'Date'=>'2011-03-01', 'Jurisdiction'=>'City of Chicago');
        $a->ResponsibleAgency = 'Dept of Vital Records';
        $a->Notes[0] = new Note();
        $a->Notes[0]->Text = 'Yes, Sir.';
        $expected = "PEAR2\Genealogy\Gedcom\Structures\SourceData(RecordedEvents->("
        . "RecordedEvent->BIRT 2010-03-01 (City of Charlotte),"
        . " RecordedEvent->DEAT 2011-03-01 (City of Chicago)), ResponsibleAgency->Dept of Vital Records, Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->Yes, Sir.)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testCustomField()
    {
        $a = new SourceData();
        try {
            $a->customField = 'test';
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\InvalidFieldException $expected) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParse() {
        $a = new SourceData();
        $tree = array(array('1 DATA', array(array('2 EVEN BIRT'))));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\SourceData(RecordedEvents->(RecordedEvent->BIRT  ()), ResponsibleAgency->, Notes->())";
        $this->assertSame($expected, '' . $a);
    }

    public function testParseFull() {
        $a = new SourceData();
        $tree = array(array('1 DATA', array(
        array('2 EVEN BIRT', array(
        array('3 DATE 2010-03-01'),
        array('3 PLAC City of Charlotte'))),
        array('2 EVEN DEAT', array(
        array('3 DATE 2011-03-01'),
        array('3 PLAC City of Chicago'))),
        array('2 AGNC Dept of Vital Records'),
        array('2 NOTE van Gogh Rocks!'),)));
        $a->parseTree($tree, '5.5.1');
        $expected = "PEAR2\Genealogy\Gedcom\Structures\SourceData(RecordedEvents->("
        . "RecordedEvent->BIRT 2010-03-01 (City of Charlotte),"
        . " RecordedEvent->DEAT 2011-03-01 (City of Chicago)), ResponsibleAgency->Dept of Vital Records, Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!)))";
        $this->assertSame($expected, '' . $a);
    }

    public function testGedcom() {
        $a = new SourceData();
        $tree = array(array('1 DATA', array(array('2 EVEN BIRT'))));
        $a->parseTree($tree, '5.5.1');
        $expected = "1 DATA\n2 EVEN BIRT";
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
    public function testGedcomFull() {
        $a = new SourceData();
        $tree = array(array('1 DATA', array(
        array('2 EVEN BIRT', array(
        array('3 DATE 2010-03-01'),
        array('3 PLAC City of Charlotte'))),
        array('2 EVEN DEAT', array(
        array('3 DATE 2011-03-01'),
        array('3 PLAC City of Chicago'))),
        array('2 AGNC Dept of Vital Records'),
        array('2 NOTE van Gogh Rocks!'),)));
        $a->parseTree($tree, '5.5.1');
        $expected = "1 DATA\n2 EVEN BIRT\n3 DATE 2010-03-01\n3 PLAC City of Charlotte\n2 EVEN DEAT\n3 DATE 2011-03-01\n3 PLAC City of Chicago\n2 AGNC Dept of Vital Records\n2 NOTE van Gogh Rocks!";
        $this->assertSame($expected, $a->toGedcom('1', '5.5.1'));
    }
}
?>