<?php
use PEAR2\Genealogy\Gedcom\GedcomManager;

/**
 * required by a PEAR2 package to load classes
 */
require 'pear2\\Autoload.php';

/**
 * Load and parse a GEDCOM file by creating an instance of
 * the GedcomManager.
 */
$path = dirname(__FILE__) . "/../data/testfiles/";
$g = new GedcomManager();
$g->parse($path . "stdExample5.5.1.ged");

/**
 * Retrieve a specific field from an Individual
 * (the developer way)
 */
$indi = $g->getIndividual('1');
// complex object relationship
echo "\n\nName: " . $indi->Names[0]->Name->Full;
//simple object relationship
echo "\n\nSex: " . $indi->Gender;

/**
 * get a gedcom representation of an Individual
 */
echo "\n\nINDI record:\n" . $indi->toGedcom();

/**
 * get Events
 */

$events = $indi->Events;
foreach($events as $event) {
    $src = "none";
    if(isset($event->Citations[0])) {
        // alternately one could resolve the SourceId
        // to the actually SourceRecord
        $src = "@". $event->Citations[0]->SourceId
            ."@ Page:" . $event->Citations[0]->Page;
    }
    echo "\n\nEvent: " . $event->Tag
        . ", Date: ". $event->Date
        . ", Place: ". $event->Place->Name
        . ", Source: " . $src
        ;
}