/**
 * Created by sahaque on 4/16/2017.
 */

describe('Note', function() {
    before(function () {
        this.note = new Note();
    });
    describe('ParseTree', function() {
        it('testEmtpyObjectString', function () {
            expect(this.note.toString()).to.equal("(Version->, Text->undefined)");
        });

        it('testStringIdAndText', function () {
            this.note.id = '42';
            this.note.ver = '5.5.1';
            this.note.text = '2010-03-01';
            expect(this.note.toString()).to.equal("(Version->5.5.1, Id->42)");
        });

        it('testStringNoIdAndText', function () {
            this.note = new Note();
            this.note.ver = '5.5.1';
            this.note.text = '2010-03-01';
            expect(this.note.toString()).to.equal("(Version->5.5.1, Text->2010-03-01)");
        });

        it('testParseId', function () {
            this.note = new Note();
            var tree = [['1 NOTE @N111@']];
            this.note.parseTree(tree, '5.5.1');
            expect(this.note.toString()).to.equal("(Version->5.5.1, Id->N111)");
        });

        it('testParsetext', function () {
            "use strict";
            this.note = new Note();
            var tree = [['1 NOTE van Gogh Rocks!']];
            this.note.parseTree(tree, '5.5.1');
            expect(this.note.toString()).to.equal("(Version->5.5.1, Text->van Gogh Rocks!)");
        })
    });
    describe('ToGedcom', function() {
        "use strict";
        it('testGedcomId', function() {
            this.note = new Note();
            var tree = [['1 NOTE @N111@']];
            this.note.parseTree(tree, '5.5.1');
            expect(this.note.toGedcom(1, '5.5.1')).to.equal('1 NOTE @N111@');
        });
        it('testGedcomText', function() {
            this.note = new Note();
            var tree = [['1 NOTE van Gogh Rocks!']];
            this.note.parseTree(tree, '5.5.1');
            expect(this.note.toGedcom(1, '5.5.1')).to.equal('1 NOTE van Gogh Rocks!');
        });
        it('testGedcomFullCONC', function() {
            this.note = new Note();
            var tree = [['1 NOTE Note Source',
                [['2 CONT 123456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H123456789I'],
                    ['2 CONC 123456789J123456789K123456789L123456789M123456789N123456789O123456789P123456789Q123456789R'],
                    ['2 CONT 123456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H123456789I'],
                    ['2 CONC 123456789J123456789K123456789L123456789M123456789N123456789O123456789P123456789Q123456789R'],
                ]]
            ];
            this.note.parseTree(tree, '5.5.1');
            expect(this.note.toGedcom(1, '5.5.1')).to.equal('1 NOTE Note Source\n2 CONT 123456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H123456789I\n2 CONC 123456789J123456789K123456789L123456789M123456789N123456789O123456789P123456789Q123456789R\n2 CONT 123456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H123456789I\n2 CONC 123456789J123456789K123456789L123456789M123456789N123456789O123456789P123456789Q123456789R');
        });
        it('testGedcomFullFirstLineCONC', function() {
            this.note = new Note();
            var tree = [['1 NOTE Note Source',
                [['2 CONC 123456789J123456789K123456789L123456789M123456789N123456789O123456789P123456789Q123456789R'],
                    ['2 CONT 123456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H123456789I'],
                    ['2 CONC 123456789J123456789K123456789L123456789M123456789N123456789O123456789P123456789Q123456789R'],
                    ['2 CONT 123456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H123456789I'],
                    ['2 CONC 123456789J123456789K123456789L123456789M123456789N123456789O123456789P123456789Q123456789R'],
                ]]
            ];
            this.note.parseTree(tree, '5.5.1');
            expect(this.note.toGedcom(1, '5.5.1')).to.equal('1 NOTE Note Source123456789J123456789K123456789L123456789M123456789N123456789O123456789P123456789\n2 CONC Q123456789R\n2 CONT 123456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H123456789I\n2 CONC 123456789J123456789K123456789L123456789M123456789N123456789O123456789P123456789Q123456789R\n2 CONT 123456789A123456789B123456789C123456789D123456789E123456789F123456789G123456789H123456789I\n2 CONC 123456789J123456789K123456789L123456789M123456789N123456789O123456789P123456789Q123456789R');
        });
    });
});