/**
 * Created by faiz on 4/26/2017.
 */

describe('FamilyRecord', function() {
    before(function () {
        this.familyRecord = new FamilyRecord();
    });
    describe('ParseTree', function () {
        it('testParse', function () {
            this.familyRecord.parseTree([['0 @F001@ FAM']], '5.5.1');
            expect(this.familyRecord.toString()).to.equal("F001");
        });

        it('testParseFull', function () {
            "use strict";
            this.familyRecord = new FamilyRecord();
            var tree = [['0 @F001@ FAM',
                [['1 RESN none'],
                    ['1 HUSB @I001@'],
                    ['1 WIFE @I002@'],
                    ['1 CHIL @I003@'],
                    ['1 CHIL @I004@'],
                    ['1 CHIL @I005@'],
                    ['1 NCHI 14'],
                    ['1 SUBM @S001@'],
                    ['1 REFN 117'[['2 TYPE comic']]],
                    ['1 RIN 42'],
                    ['1 CHAN 42'[['2 DATE 2010-03-2']]],
                    ['1 NOTE van Gogh Rocks!'],
                    ['1 SOUR @S33@'],
                    ['1 OBJE @O14@']
                ]]];
            this.familyRecord.parseTree(tree, '5.5.1');
            expect(this.familyRecord.toString()).to.equal("(Id->F001, Restriction->none, Events->(), Husband->I001, Wife->I002, Child->I003, Child->I004, Child->I005, CountOfChildren->14, LdsSealings->(), UserRefNbrs->(UserRefNbr->117 (comic)), AutoRecId->42, ChangeDate->(Date->2010-03-2 , Notes->()), SubmitterLinks->(Submitter->S001), Citations->(\n(Version->5.5.1, SourceId->S33, Page->, EventType->, RoleInEvent->, EntryDate->, Texts->(), Quay->, MediaLinks->(), Notes->())), MediaLinks->(");
        });
    });
    describe('ToGedcom', function () {
        it('toGedcom', function () {
            this.familyRecord.toGedcom([['0 @F001@ FAM']], '5.5.1');
            expect(this.familyRecord.toString()).to.equal("0 @F001@ FAM");
        });

        it('testParseFull', function () {
            "use strict";
            this.familyRecord = new FamilyRecord();
            var tree = [['0 @F001@ FAM',
                [['1 RESN none'],
                    ['1 HUSB @I001@'],
                    ['1 WIFE @I002@'],
                    ['1 CHIL @I003@'],
                    ['1 CHIL @I004@'],
                    ['1 CHIL @I005@'],
                    ['1 NCHI 14'],
                    ['1 SUBM @S001@'],
                    ['1 REFN 117'[['2 TYPE comic']]],
                    ['1 RIN 42'],
                    ['1 CHAN 42'[['2 DATE 2010-03-2']]],
                    ['1 NOTE van Gogh Rocks!'],
                    ['1 SOUR @S33@'],
                    ['1 OBJE @O14@']
                ]]];
            this.familyRecord.parseTree(tree, '5.5.1');
            expect(this.familyRecord.toString()).to.equal("0 @F001@ FAM\n1 RESN none\n1 HUSB @I001@\n1 WIFE @I002@\n1 CHIL @I003@\n1 CHIL @I004@\n1 CHIL @I005@\n1 NCHI 14\n1 SUBM @S001@\n1 REFN 117\n2 TYPE comic\n1 RIN 42\n1 CHAN\n2 DATE 2010-03-2\n1 SOUR @S33@\n1 OBJE @O14@\n1 NOTE van Gogh Rocks!");
        });
    });
});