<?php
namespace PEAR2\Genealogy\Gedcom;
use PEAR2\Genealogy\Gedcom\Records;
use PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';
require_once 'PHPUnit/Framework.php';

class ParserTest extends \PHPUnit_Framework_TestCase
{
    public function testParseMissingFile() {
        try {
            $p = new Parser();
            $p->parse("Missing.ged");
            $this->fail('Expected exception not thrown.');
        } catch(\Exception $ex) {
            $this->assertTrue(TRUE);
        }
    }

    public function testParseNoHead() {
        $path = dirname(__FILE__) . "/../../../../data/testfiles/";
        $p = new Parser();
        try {
            $p->parse($path . "NoHead.ged");
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\FileException $ex) {
            $this->assertTrue(TRUE);
        }

    }
    public function testParseNoTail() {
        $path = dirname(__FILE__) . "/../../../../data/testfiles/";
        $p = new Parser();
        try {
            $p->parse($path . "NoTail.ged");
            $this->fail('Expected exception not thrown.');
        } catch(Exceptions\FileException $ex) {
            $this->assertTrue(TRUE);
        }
    }
    public function testParseOnlyHeadAndTail() {
        $path = dirname(__FILE__) . "/../../../../data/testfiles/";
        $p = new Parser();
        $p->parse($path . "OnlyHeadAndTail.ged");
        $this->assertTrue($p->gedcomObjects['HeaderRec'] instanceof records\HeaderRecord);
    }
    public function testParseFullHead() {
        $path = dirname(__FILE__) . "/../../../../data/testfiles/";
        $p = new Parser();
        $p->parse($path . "FullHeader.ged");
        $expected = "PEAR2\Genealogy\Gedcom\Records\HeaderRecord(SourceSystem->PEAR2\Genealogy\Gedcom\Structures\\SourceSystem(SystemId->42, VerNbr->1.0, ProductName->FamilyVanGogh, Corporation->PEAR2\Genealogy\Gedcom\Structures\\Corporation(Name->van Gogh Enterprises, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->, Address->555 Brown Street\nBrown City, Brownington\n55555, AddressLine1->555 Brown Street, AddressLine2->Brown City, Brownington, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com)), Data->PEAR2\Genealogy\Gedcom\Structures\\Data(SourceName->Data Source, Date->2010-03-01, Copyright->Line1)), DestinationSystem->My Laptop, TransmissionDateTime->2010-03-01 12:00:00EDT, SubmitterId->S111, SubmissionId->X111, Filename->myged.ged, Copyright->2010 Ed Thompson, Language->English, CharacterSet->PEAR2\Genealogy\Gedcom\Structures\\CharacterSet(CharacterSet->UTF-8, VerNbr->1.0), GedC->PEAR2\Genealogy\Gedcom\Structures\\GedC(VerNbr->5.5.1, Form->LINEAGE-LINKED), PlaceForm->Huh?, Note->PEAR2\Genealogy\Gedcom\Structures\Note(Version->, Text->van Gogh Rocks!))";
        $this->assertSame($expected, '' . $p->gedcomObjects['HeaderRec']);
        $expected = "Gedcom Filename->FullHeader.ged\nGedcom Version->5.5.1";
        $this->assertSame($expected, '' . $p);
        $this->assertSame('5.5.1', $p->gedcomVersion);
    }
    public function testParseFullFamily() {
        $path = dirname(__FILE__) . "/../../../../data/testfiles/";
        $p = new Parser();
        $p->parse($path . "FullFamily.ged");
        $expected = "PEAR2\Genealogy\Gedcom\Records\FamilyRecord(Id->F001, Restriction->none, Events->(), Husband->I001, Wife->I002, Child->I003, Child->I004, Child->I005, CountOfChildren->14, LdsSealings->(), UserRefNbrs->(UserRefNbr->117 (comic)), AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-2 , Notes->()), SubmitterLinks->(Submitter->S001), Citations->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Citation(Version->5.5.1, SourceId->S33, Page->, EventType->, RoleInEvent->, EntryDate->, Texts->(), Quay->, MediaLinks->(), Notes->())), MediaLinks->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\MediaLink(Version->5.5.1, Id->O14)), Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!)))";
        $this->assertSame($expected, '' . $p->gedcomObjects['FamRecs']["F001"]);
    }
    public function testParseFullSubmitter() {
        $path = dirname(__FILE__) . "/../../../../data/testfiles/";
        $p = new Parser();
        $p->parse($path . "FullSubmitter.ged");
        $expected = "PEAR2\Genealogy\Gedcom\Records\SubmitterRecord(Id->S2222, Name->Vincent van Gogh, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->5.5.1, Address->555 Brown Street"
        . "\nBrown City, Brownington"
        . "\n55555, AddressLine1->555 Brown Street, AddressLine2->Brown City, Brownington, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com)"
        . "\nPEAR2\Genealogy\Gedcom\Structures\MediaLink(Version->5.5.1, Id->O14), Language->English, SubmitterRefNbr->2222222, AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-2 , Notes->()), Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!)))";
        $this->assertSame($expected, '' . $p->gedcomObjects['SubmRecs']["S2222"]);
    }
    public function testParseFullSubmission() {
        $path = dirname(__FILE__) . "/../../../../data/testfiles/";
        $p = new Parser();
        $p->parse($path . "FullSubmission.ged");
        $expected = "PEAR2\Genealogy\Gedcom\Records\SubmissionRecord(Id->S2222, SubmitterId->2222, FamilyFileName->van Gogh, TempleCode->XXX, GenerationsAncestors->12, GenerationsDescendants->7, OrdinanceProcessFlag->I, AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-2 , Notes->()), Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!)))";
        $this->assertSame($expected, '' . $p->gedcomObjects['SubnRec']);
    }
    public function testParseFullMedia() {
        $path = dirname(__FILE__) . "/../../../../data/testfiles/";
        $p = new Parser();
        $p->parse($path . "FullMedia.ged");
        $expected = "PEAR2\Genealogy\Gedcom\Records\MediaRecord(Id->O11XX, MediaFiles->(MediaFile->PEAR2\Genealogy\Gedcom\Structures\MediaFile(RefNbr->c:\MyBooks, Format->hardcover book, FormatType->, Title->THE van Gogh)), UserRefNbrs->(UserRefNbr->113 (hardcover book)), AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-2 , Notes->()), Citations->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Citation(Version->5.5.1, SourceId->S33, Page->, EventType->, RoleInEvent->, EntryDate->, Texts->(), Quay->, MediaLinks->(), Notes->())), Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!)))";
        $this->assertSame($expected, '' . $p->gedcomObjects['MediaRecs']['O11XX']);
    }
    public function testParseFullNote() {
        $path = dirname(__FILE__) . "/../../../../data/testfiles/";
        $p = new Parser();
        $p->parse($path . "FullNote.ged");
        $expected = "PEAR2\Genealogy\Gedcom\Records\NoteRecord(Id->N111, Text->Hello Dolly!"
        . "\nvan Gogh Rocks!, UserRefNbrs->UserRefNbr->113 (box), AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-2 , Notes->()), Citations->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Citation(Version->5.5.1, SourceId->S33, Page->, EventType->, RoleInEvent->, EntryDate->, Texts->(), Quay->, MediaLinks->(), Notes->())))";

        $this->assertSame($expected, '' . $p->gedcomObjects['NoteRecs']['N111']);
    }
    public function testParseFullRepository() {
        $path = dirname(__FILE__) . "/../../../../data/testfiles/";
        $p = new Parser();
        $p->parse($path . "FullRepo.ged");
        $expected = "PEAR2\Genealogy\Gedcom\Records\RepositoryRecord(Id->R333, Name->Circular Filing, Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->5.5.1, Address->555 Brown Street"
        . "\nBrown City, Brownington"
        . "\n55555, AddressLine1->555 Brown Street, AddressLine2->Brown City, Brownington, AddressLine3->55555, City->Brown City, State->Brownington, PostalCode->55555, Country->USA, Phone->555-555-5555, Email->tester@test.com, FAX->555-555-5555, WWW->www.test.com), UserRefNbrs->(UserRefNbr->14 (MyType)), AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-2 , Notes->()), Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!)))";
        $this->assertSame($expected, '' . $p->gedcomObjects['RepoRecs']['R333']);
    }
    public function testParseFullIndividual() {
        $path = dirname(__FILE__) . "/../../../../data/testfiles/";
        $p = new Parser();
        $p->parse($path . "FullIndividual.ged");
        $expected = "PEAR2\Genealogy\Gedcom\Records\IndividualRecord(Id->I141, Restriction->none, Names->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\PersonalName(Version->5.5.1, Name->PEAR2\Genealogy\Gedcom\Structures\Name(Version->5.5.1, Full->Vincent /van Gogh/, Type->, Pieces->PEAR2\Genealogy\Gedcom\Structures\NamePieces(Version->, Prefix->, Given->, NickName->, SurnamePrefix->, Surname->, Suffix->)))), Gender->M, Events->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\FactDetail(Version->5.5.1, Tag->BIRT, Description->, Type->, Date->1900-01-05, Place->PEAR2\Genealogy\Gedcom\Structures\Place(Version->5.5.1, Name->, PlaceForm->, Coordinates-> by ), Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->5.5.1, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->), Age->, RespAgency->, ReligiousAffiliation->, Restriction->, Cause->)), Attributes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\FactDetail(Version->5.5.1, Tag->FACT, Description->Tripped, Type->, Date->1910-01-05, Place->PEAR2\Genealogy\Gedcom\Structures\Place(Version->5.5.1, Name->, PlaceForm->, Coordinates-> by ), Address->PEAR2\Genealogy\Gedcom\Structures\Address(Version->5.5.1, Address->, AddressLine1->, AddressLine2->, AddressLine3->, City->, State->, PostalCode->, Country->, Phone->, Email->, FAX->, WWW->), Age->, RespAgency->, ReligiousAffiliation->, Restriction->, Cause->)), LdsOrdinances->(), ChildFamilyLinks->(PEAR2\Genealogy\Gedcom\Structures\FamilyLink(FamilyId->F00023, Notes->())), SpouseFamilyLinks->(PEAR2\Genealogy\Gedcom\Structures\FamilyLink(FamilyId->F0001, Notes->())), SubmitterLinks->(S001), Associations->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Association(Version->5.5.1, AssociateId->I49, Relationship->, Citations->(), Notes->())), Aliases->(I49), AncestorInterests->(I50), DescendantInterests->(I51), PermRecFileNbr->245, AncFileNbr->21, UserRefNbrs->(UserRefNbr->117 (comic)), AutoRecId->42, ChangeDate->PEAR2\Genealogy\Gedcom\Structures\ChangeDate(Date->2010-03-2 , Notes->()), Citations->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Citation(Version->5.5.1, SourceId->S33, Page->, EventType->, RoleInEvent->, EntryDate->, Texts->(), Quay->, MediaLinks->(), Notes->())), MediaLinks->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\MediaLink(Version->5.5.1, Id->O14)), Notes->("
        . "\nPEAR2\Genealogy\Gedcom\Structures\Note(Version->5.5.1, Text->van Gogh Rocks!)))";
        $this->assertSame($expected, '' . $p->gedcomObjects['IndiRecs']['I141']);
    }
}
?>