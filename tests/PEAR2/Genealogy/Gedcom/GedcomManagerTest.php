<?php
namespace PEAR2\Genealogy\Gedcom;
use PEAR2\Genealogy\Gedcom\Records;
use PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';
require_once 'PHPUnit/Framework.php';

class GedcomManagerTest extends \PHPUnit_Framework_TestCase
{
    public function testParseMissingFile() {
        try {
            $g = new GedcomManager();
            $g->parse("Missing.ged");
            $this->fail('Expected exception not thrown.');
        } catch(\Exception $ex) {
            $this->assertTrue(TRUE);
        }
    }

    public function testRecordCounts() {
        $path = dirname(__FILE__) . "/../../../../data/testfiles/";
        $g = new GedcomManager();
        $g->parse($path . "stdExample5.5.1.ged");
        $this->assertEquals(2,$g->getNumberOfFamilies());
        $this->assertEquals(3,$g->getNumberOfIndividuals());
        $this->assertEquals(0,$g->getNumberOfNotes());
        $this->assertEquals(1,$g->getNumberOfSources());
        $this->assertEquals(1,$g->getNumberOfSubmitters());
        $this->assertEquals(1,$g->getNumberOfRepositories());
    }
}