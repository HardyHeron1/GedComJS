<?php
namespace PEAR2\Genealogy\Gedcom\Structures;
use PEAR2\Genealogy\Gedcom\Exceptions;
use PHPUnit;
require 'pear2\\Autoload.php';

//TODO Add tests
class LdsSealingTest extends \PHPUnit_Framework_TestCase
{
    public function testEmtpyObjectString()
    {
        $a = new LdsSealing();
        $expected = "";
        //$this->assertSame($expected, '' . $a);
    }
}