/**
 * Created by sahaque on 4/18/2017.
 */

function Name (full, type) {
    "use strict";
    this.full = full;
    this.type = type;
    this.pieces = new NamePieces();
}

Name.inherits(EntityAbstract);

Name.method('parseTree', function (tree, ver, top) {
    "use strict";
    if (!top) top = Tags.FULL;
    this.ver =ver;
    var i1=this.findTag(tree, top);
    if (i1!==false) {
        this.full = this.parseText(tree[i1], top);
        if (tree[i1][1]) {
            var sub2 = tree[i1][1];
            var i2=this.findTag(sub2, Tags.TYPE);
            if (i2!==false) {
                this.type = this.parseText(sub2[i2], Tags.TYPE);
            }

            this.pieces.parseTree(sub2, ver);
        }
    }
});

Name.prototype.toString = function () {
    return '(Version->' + this.ver
            + ', Full->' + this.full
        + ', Type->' + this.type
        + ', Pieces->' + this.pieces
        + ')';
};