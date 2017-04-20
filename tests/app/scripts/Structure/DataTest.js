/**
 * Created by sahaque on 4/19/2017.
 */

describe('Data', function() {
    before(function () {
        this.data = new Data();
    });
    describe('ParseTree', function() {
        it('testParse', function () {
            var tree = [['1 DATA Data Source']];
            this.data.parseTree(tree, '5.5.1');
            expect(this.data.toString()).to.equal("(SourceName->Data Source, Date->undefined, Copyright->undefined)");
        });

        it('testParseFull', function() {
            "use strict";
            this.data = new Data();
            var tree = [['1 DATA Data Source',
                [['2 DATE 2010-03-01', []],
                    ['2 COPR Line1',
                        [['3 CONT 123456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H123456789I'],
                            ['3 CONC ROGER THAT GOES HERE']]]]]
            ];
            this.data.parseTree(tree, '5.5.1');
            expect(this.data.toString()).to.equal("(SourceName->Data Source, Date->2010-03-01, Copyright->Line1\n123456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H123456789I\nROGER THAT GOES HERE)");
        });
    });
});