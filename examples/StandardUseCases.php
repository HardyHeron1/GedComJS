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
 * Print file stats
 */
echo $g;

/**
 * Retrieve the Header record
 */
echo "\n\nHeader:\n" . $g->getHeader();

/**
 * Retrieve a specific Individual
 */
echo "\n\nIndividual:\n" . $g->getIndividual('1');


