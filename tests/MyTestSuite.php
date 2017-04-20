<?php
require 'pear2\\Autoload.php';
require_once 'PHPUnit/Framework.php';
use PEAR2\Genealogy\Gedcom;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Records;

class MyTestSuite
{
    public static function suite()
    {
        $suite = new PHPUnit_Framework_TestSuite('GenealogyGedcom');

        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\SourceDataTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\AddressTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\AssociationTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\ChangeDateTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\CharacterSetTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\CitationTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\CorporationTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\DataTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\EventTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\FactTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\FamilyLinkTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\GedCTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\LdsOrdinanceTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\LdsSealingTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\MediaFileTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\MediaLinkTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\NamePiecesTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\NameTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\NoteTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\PersonalNameTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\PlaceTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\RepositoryCitationTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Structures\SourceSystemTest');

        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Records\HeaderRecordTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Records\FamilyRecordTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Records\IndividualRecordTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Records\MediaRecordTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Records\NoteRecordTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Records\RepositoryRecordTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Records\SourceRecordTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Records\SubmissionRecordTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\Records\SubmitterRecordTest');

        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\ParserTest');
        $suite->addTestSuite('PEAR2\Genealogy\Gedcom\GedcomManagerTest');
        return $suite;
    }
}
?>