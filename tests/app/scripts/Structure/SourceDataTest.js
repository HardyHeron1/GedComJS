/**
 * Created by sahaque on 4/19/2017.
 */

describe('SourceData', function() {
    before(function () {
        this.sourceData = new SourceData();
    });
    describe('ParseTree', function() {
        it('testParse', function () {
            var tree = [['1 DATA', [['2 EVEN BIRT']]]];
            this.sourceData.parseTree(tree, '5.5.1');
            expect(this.sourceData.toString()).to.equal("(RecordedEvents->(RecordedEvent->BIRT  ()), ResponsibleAgency->undefined, Notes->())");
        });

        it('testParseFull', function() {
            "use strict";
            this.sourceData = new SourceData();
            var tree = [['1 DATA', [
                ['2 EVEN BIRT', [
                    ['3 DATE 2010-03-01'],
                    ['3 PLAC City of Charlotte']]],
                ['2 EVEN DEAT', [
                    ['3 DATE 2011-03-01'],
                    ['3 PLAC City of Chicago']]],
                ['2 AGNC Dept of Vital Records'],
                ['2 NOTE van Gogh Rocks!']]]];
            this.sourceData.parseTree(tree, '5.5.1');
            expect(this.sourceData.toString()).to.equal("(RecordedEvents->(RecordedEvent->BIRT 2010-03-01 (City of Charlotte), RecordedEvent->DEAT 2011-03-01 (City of Chicago)), ResponsibleAgency->Dept of Vital Records, Notes->(\n(Version->5.5.1, Text->van Gogh Rocks!)))");
        });
    });
    describe('ToGedcom', function() {
        it('testGedcom', function () {
            this.sourceData =  new SourceData();
            var tree = [['1 DATA', [['2 EVEN BIRT']]]];
            this.sourceData.parseTree(tree, '5.5.1');
            expect(this.sourceData.toGedcom(1,'5.5.1')).to.equal("1 DATA\n2 EVEN BIRT");
        });

        it('testGedcomFull', function() {
            "use strict";
            this.sourceData = new SourceData();
            var tree = [['1 DATA', [
                ['2 EVEN BIRT', [
                    ['3 DATE 2010-03-01'],
                    ['3 PLAC City of Charlotte']]],
                ['2 EVEN DEAT', [
                    ['3 DATE 2011-03-01'],
                    ['3 PLAC City of Chicago']]],
                ['2 AGNC Dept of Vital Records'],
                ['2 NOTE van Gogh Rocks!']]]];
            this.sourceData.parseTree(tree, '5.5.1');
            expect(this.sourceData.toGedcom(1,'5.5.1')).to.equal("1 DATA\n2 EVEN BIRT\n3 DATE 2010-03-01\n3 PLAC City of Charlotte\n2 EVEN DEAT\n3 DATE 2011-03-01\n3 PLAC City of Chicago\n2 AGNC Dept of Vital Records\n2 NOTE van Gogh Rocks!");
        });
    });
});