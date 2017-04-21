/**
 * Created by sahaque on 4/18/2017.
 */

function Corporation(name) {
    "use strict";
    this.name = name;
    this.address = new Address();
}

Corporation.inherits(EntityAbstract);

Corporation.method('parseTree', function (tree, ver) {
    this.ver = ver;
    var i1 = this.findTag(tree, Tags.CORP);
    if (i1 !== false) {
        this.name = this.parseText(tree [i1], Tags.CORP);

        var sub2 = tree[i1][1];
        if (sub2) {
            this.address.parseTree(sub2, ver);
        }
    }
});

Corporation.method('toGedcom', function (lvl, ver) {
    "use strict";
    var gedRec = '';
    if (this.name && this.name !== '') {
        gedRec += lvl + ' ' + Tags.CORP + ' ' + this.name;
    }
    var lvl2 = lvl + 1;
    var str = this.address.toGedcom(lvl2, '5.5.1');
    if (str && str !=='') {
        gedRec += "\n" + str;
    }
    return gedRec;
});

Corporation.prototype.toString = function () {
    return '(Name->' + this.name
        + ", Address->" + this.address
        + ')';
};