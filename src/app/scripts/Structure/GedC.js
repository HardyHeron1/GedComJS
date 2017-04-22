/**
 * Created by sahaque on 4/18/2017.
 */


function GedC(verNbr) {
    "use strict";
    this.verNbr = verNbr;
    this.Form = 'LINEAGE-LINKED';
}

GedC.inherits(EntityAbstract);

GedC.method('parseTree', function (tree, ver) {
    "use strict";
    this.ver = ver;
    var i1=this.findTag(tree, Tags.GEDC);
    if (i1!==false)
        if (tree [i1] [1]) {
            var sub2 = tree [i1] [1];
            var i2=this.findTag(sub2, Tags.VERSION);
            if (i2 !== false) {
                this.verNbr = this.parseText(sub2 [i2], Tags.VERSION);
            }i2 = this.findTag(sub2, Tags.FORM);
            if (i2 !== false) {
                this.Form = this.parseText(sub2 [i2], Tags.FORM);
            }
        }
});

GedC.method('toGedcom', function(lvl, ver) {
    "use strict";
    var gedRec = lvl + ' ' + Tags.GEDC;
    var lvl2 = lvl + 1;
    if (this.verNbr) {
        gedRec += "\n" + lvl2 + ' ' + Tags.VERSION + ' ' + this.verNbr;
    }
    if (this.Form) {
        gedRec += "\n" + lvl2 + ' ' + Tags.FORM + ' ' + this.Form;
    }
    return gedRec;
});

GedC.prototype.toString = function () {
    "use strict";
    return '(VerNbr->' + this.verNbr
            + ', Form->' + this.Form + ')';
};