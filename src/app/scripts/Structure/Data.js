/**
 * Created by sahaque on 4/18/2017.
 */

function Data(sourceName, date, copyRight) {
    this.sourceName = sourceName;
    this.date = date;
    this.copyright = copyRight;
}

Data.inherits(EntityAbstract);

Data.method('parseTree', function(tree, ver) {
    "use strict";
    var i1 = this.findTag(tree, Tags.DATA);
    if (i1 !== false) {
        this.sourceName = this.parseText(tree [i1], Tags.DATA);
        if (tree [i1] [1]) {
            var sub2 = tree [i1] [1];
            var i2 = this.findTag(sub2, Tags.DATE);
            if (i2 !== false) {
                if (this.date) {
                    this.date += this.parseText(sub2 [i2], Tags.DATE);
                }
                else
                    this.date = this.parseText(sub2 [i2], Tags.DATE);
            }
            i2 = this.findTag(sub2, Tags.COPYRIGHT);
            if (i2 !== false) {
                if(this.copyright) {
                    this.copyright += this.parseConTag(sub2 [i2], Tags.COPYRIGHT);
                }else
                    this.copyright = this.parseConTag(sub2 [i2], Tags.COPYRIGHT);
            }
        }
    }
});

Data.method('toGedcom', function (lvl, ver) {
    "use strict";
    var gedRec = '';
    if (this.sourceName && this.sourceName !== '') {
        gedRec += lvl + ' ' + Tags.DATA + ' ' + this.sourceName;
    }

    var lvl2 = lvl + 1;
    if (this.date && this.date !== '') {
        if (gedRec !== '') {
            gedRec += "\n";
        }
        gedRec += lvl2 + ' ' + Tags.DATE + ' ' + this.date;
    }
    if (this.copyright && this.copyright !== '') {
        gedRec += "\n"
            + this.toConTag(this.copyright, Tags.COPYRIGHT, lvl2);
    }
    return gedRec;
});

Data.prototype.toString = function() {
    "use strict";
    return '(SourceName->' + this.sourceName
            + ', Date->' + this.date
        + ', Copyright->' + this.copyright + ')';
}