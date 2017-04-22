/**
 * Created by sahaque on 4/19/2017.
 */

function SourceSystem (systemId,verNbr, productName) {
    "use strict";
    this.systemId = systemId;
    this.verNbr = verNbr;
    this.productName = productName;
    this.corporation = new Corporation();
    this.data = new Data();
}

SourceSystem.inherits(EntityAbstract);

SourceSystem.method('parseTree', function(tree, ver) {
    "use strict";
    var i1=this.findTag(tree, Tags.SOURCE);
    if (i1!== false) {
        this.systemId = this.parseText(tree[i1], Tags.SOURCE);
        if (tree[i1][1]) {
            var sub2 = tree [i1][1];
            var i2 = this.findTag(sub2, Tags.VERSION);
            if (i2 !== false) {
                this.verNbr = this.parseText(sub2 [i2], Tags.VERSION);
            }
            i2 = this.findTag(sub2, Tags.NAME);
            if (i2 !== false) {
                this.productName = this.parseText(sub2 [i2], Tags.NAME);
            }
            this.corporation.parseTree(sub2, ver);
            this.data.parseTree(sub2, ver);
        }
    }
});

SourceSystem.method('toGedcom',function (lvl,ver) {
    var gedRec = '';
    if (this.systemId && this.systemId !== '') {
        gedRec += lvl + ' ' + Tags.SOURCE + ' ' + this.systemId;
    }
    var lvl2 = lvl + 1;
    if (this.verNbr && this.verNbr !== '') {
        gedRec += "\n" + lvl2 + ' ' + Tags.VERSION + ' ' + this.verNbr;
    }
    if (this.productName && this.productName !== '') {
        gedRec += "\n" + lvl2 + ' ' + Tags.NAME + ' ' + this.productName;
    }
   var str = this.corporation.toGedcom(lvl2,ver- null);
    if (str && str !=='') {
        gedRec += "\n" + gedRec;
    }
    str = this.data.toGedcom(lvl2,ver- null);
    if (gedRec && gedRec !=='') {
        gedRec += "\n" + str;
    }
    return gedRec;

});

SourceSystem.prototype.toString = function () {
    "use strict";
    return '(SystemId.' + this.systemId
        + ', VerNbr.' + this.verNbr
        + ', ProductName.' + this.productName
        + ', Corporation.' + this.corporation
        + ', Data.' + this.data
        + ')';
};