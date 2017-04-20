/**
 * Created by sahaque on 4/18/2017.
 */


function MediaFile(refNbr, format, formatType, title) {
    "use strict";
    this.refNbr = refNbr;
    this.format = format;
    this.formatType = formatType;
    this.title = title;
}

MediaFile.inherits(EntityAbstract);

MediaFile.method('parseTree', function (tree, ver) {
    "use strict";
    this.ver =ver;
    var i1=this.findTag(tree, Tags.FILE);
    if (i1!==false) {
        this.refNbr = this.parseText(tree[i1], Tags.FILE);
        if (tree[i1][1]) {
            var sub2 = tree[i1][1];
            var i2=this.findTag(sub2, Tags.FORMAT);
            if (i2!==false) {
                this.format = this.parseText(sub2[i2], Tags.FORMAT);
                if (sub2[i2][1]) {
                    var i3 = this.findTag(sub2[i2][1], Tags.TYPE);
                    if (i3!==false
                    ) {
                        this.formatType
                            = this.parseText(sub2[i2][1][i3], Tags.TYPE);
                    }
                }
            }i2 = this.findTag(sub2, Tags.TITLE);
            if (i2!==false) {
                this.title = this.parseText(sub2[i2], Tags.TITLE);
            }
        }
    }
});

MediaFile.prototype.toString = function () {
    "use strict";
    return '(RefNbr->' + this.refNbr
            + ', Format->' + this.format
        + ', FormatType->' + this.formatType
        + ', Title->' + this.title
        + ')';
};