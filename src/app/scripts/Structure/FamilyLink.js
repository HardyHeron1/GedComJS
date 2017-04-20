/**
 * Created by sahaque on 4/18/2017.
 */

function FamilyLink(familyId, linkageType, linkageStatus) {
    "use strict";
    this.familyId = familyId;
    this.linkageType = linkageType;
    this.linkageStatus = linkageStatus;
    this.notes = [];
}

FamilyLink.inherits(EntityAbstract);

FamilyLink.method('parseTree', function (tree, ver, tag) {
    "use strict";
    if (!tag) tag = Tags.SPOUSEFAMILY;
    this.ver =ver;
    var i1 = this.findTag(tree, tag);
    if (i1!==false) {
        this.familyId = this.parsePtrId(tree[i1], tag);
        if(tree[i1][1]) {
            var sub2 = tree[i1][1];
            var off = 0;
            var i2=this.findTag(sub2, Tags.NOTE, off);
            while (i2!==false) {
                var tmp = new Note();
                tmp.parseTree([sub2[i2]], ver);
                this.notes.push(tmp);
                off = i2 + 1;
                i2=this.findTag(sub2, Tags.NOTE, off);
            }
            if (tag===Tags.CHILDFAMILY) {
                i2=this.findTag(sub2, Tags.LINKTYPE);
                if (i2!==false) {
                    this.linkageType
                        = this.parseText(sub2[i2], Tags.LINKTYPE);
                }
                i2=this.findTag(sub2, Tags.LINKSTATUS);
                if (i2!==false) {
                    this.linkageStatus
                        = this.parseText(sub2[i2], Tags.LINKSTATUS);
                }
            }
        }
    }

});

FamilyLink.prototype.toString = function () {
    var str = '(FamilyId->' + this.familyId;
    if (this.linkageType && this.linkageType !== '') {
        str += ', LinkageType->' + this.linkageType;
    }
    if (this.linkageStatus && this.linkageStatus !== '') {
        str += ', LinkageStatus->' + this.linkageStatus;
    }

    str += ', Notes->(';

    for (var i=0; i<this.notes.length; i++) {
        str += "\n" + this.notes[i];
    }

    str += '))';

    return str;
};