/**
 * Created by sahaque on 4/19/2017.
 */
/**
 * Created by sahaque on 4/19/2017.
 */

describe('ChangeDate', function() {
    before(function () {
        this.changeDate = new ChangeDate();
    });
    describe('ParseTree', function() {
        it('testParse', function () {
            var tree = [['1 CHAN', [['2 DATE 2010-03-01']]]];
            this.changeDate.parseTree(tree, '5.5.1');
            expect(this.changeDate.toString()).to.equal("(Date->2010-03-01 undefined, Notes->())");
        });

        it('testParseFull', function() {
            "use strict";
            this.changeDate = new ChangeDate();
            var tree = [['1 CHAN', [
                ['2 DATE 2010-03-01', [
                    ['3 TIME 12:13:00EST']]],
                ['2 NOTE van Gogh Rocks!']]]];
            this.changeDate.parseTree(tree, '5.5.1');
            expect(this.changeDate.toString()).to.equal("(Date->2010-03-01 12:13:00EST, Notes->(\n(Version->5.5.1, Text->van Gogh Rocks!)))");
        });
    });

    describe('ToGedcom', function() {
        it('testGedcom', function () {
            this.changeDate = new ChangeDate();
            var tree = [['1 CHAN', [['2 DATE 2010-03-01']]]];
            this.changeDate.parseTree(tree, '5.5.1');
            expect(this.changeDate.toGedcom(1,'5.5.1')).to.equal("1 CHAN\n2 DATE 2010-03-01");
        });

        it('testGedcomFull', function() {
            "use strict";
            this.changeDate = new ChangeDate();
            var tree = [['1 CHAN', [
                ['2 DATE 2010-03-01', [
                    ['3 TIME 12:13:00EST']]],
                ['2 NOTE van Gogh Rocks!']]]];
            this.changeDate.parseTree(tree, '5.5.1');
            expect(this.changeDate.toGedcom(1, '5.5.1')).to.equal("1 CHAN\n2 DATE 2010-03-01\n3 TIME 12:13:00EST\n2 NOTE van Gogh Rocks!");
        });
    });
});