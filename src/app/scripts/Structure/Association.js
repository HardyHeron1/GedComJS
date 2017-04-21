/**
 * Created by sahaque on 4/17/2017.
 */

function Association(associateId, relationship) {
    "use strict";
    this.associateId = associateId;
    this.relationship = relationship;
    this.notes = [];
    this.citations = [];
}

Association.inherits(EntityAbstract);

Association.method('parseTree', function(tree, ver) {
    "use strict";
    this.ver =ver;
    var i1=this.findTag(tree, Tags.ASSOCIATION);
    if (i1!==false) {
        this.associateId = this.parsePtrId(
            tree[i1], Tags.ASSOCIATION
        );
        if (tree[i1][1]) {
            var sub2 = tree[i1][1];
            var i2=this.findTag(sub2, Tags.RELATIONSHIP);
            if (i2!==false) {
                this.relationship
                    = this.parseText(sub2[i2], Tags.RELATIONSHIP);
            }
            var off = 0;
            i1=this.findTag(sub2, Tags.CITE, off);
            while (
            i1!==false
                ) {
                var tmp = new Citation();
                tmp.parseTree([sub2[i1]], ver);
                this.citations.push(tmp);
                off = i1 + 1;
                i1=this.findTag(sub2, Tags.CITE, off);
            }
            off = 0;
            i1=this.findTag(sub2, Tags.NOTE, off);
            while (
            i1!==false
                ) {
                tmp = new Note();
                tmp.parseTree([sub2[i1]], ver);
                this.notes.push(tmp);
                off = i1 + 1;
                i1=this.findTag(sub2, Tags.NOTE, off);
            }
        }
    }
});

Association.method('toGedcom', function (lvl, ver) {
    "use strict";
    if (!ver || ver === '') {
        ver = this.ver;
    }
    var gedRec = '';
    if (ver.indexOf('5.5.1') === 0) {
        if (this.associateId && this.associateId !== '') {
            gedRec += lvl + ' ' + Tags.ASSOCIATION
                + ' @' + this.associateId + '@';

            var lvl2 = lvl+1;
            if (this.relationship && this.relationship !== '') {
                gedRec += "\n" + lvl2 + ' '
                    + Tags.RELATIONSHIP + ' ' + this.relationship;
            }
            for (var i=0; i<this.citations.length; i++) {
                gedRec += "\n" + this.citations[i].toGedcom(lvl2, ver);
            }
            for (i=0; i<this.notes.length; i++) {
                gedRec += "\n" + this.notes[i].toGedcom(lvl2, ver);
            }
        }
    }
    return gedRec;
});

Association.prototype.toString = function () {
    var str =  '(Version->' + this.ver
        + ', AssociateId->' + this.associateId
        + ', Relationship->' + this.relationship
        + ', Citations->(';
    for (var i = 0; i < this.citations.length; i++) {
        str += '\n' + this.citations[i];
    }
    str += '), Notes-> (';
    for (i = 0; i < this.notes.length; i++) {
        str += '\n' + this.notes[i];
    }
    str += '))';
    return str;
};