/**
 * Created by faiz on 4/26/2017.
 */

function NoteRecord(id,text,autoRecId){
    "use strict";
    this.id = id;
    this.text = text;
    this.userRefNbrs = [];
    this.autoRecId = autoRecId;
    this.changeDate = new ChangeDate();
    this.citations = [];
}

NoteRecord.inherits(EntityAbstract);

NoteRecord.method('toGedcom',function (lvl, ver) {
    var gedRec = '';
    if (!ver) {
        ver = this.ver;
    }

    if (ver.indexOf('5.5.1') === 0) {
        gedRec = lvl + ' @'  + this.id + '@ ' + Tags.NOTE;
        if (this.text && this.text !== '') {
            gedRec += ' ' + this.toConTag(this.text, null, lvl);
        }
        var lvl2 = lvl + 1;

        for (var i=0; i<this.userRefNbrs.length; i++) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.USERFILE
                + ' ' + this.userRefNbrs[i]['Nbr'];
            if (this.userRefNbrs[i]['Type']) {
                gedRec += "\n" + (lvl2+1)
                    + ' ' + Tags.TYPE + ' ' + this.userRefNbrs[i]['Type'];
            }
        }
        if (this.autoRecId ) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.AUTORECID + ' ' + this.autoRecId;
        }
        var tmp = this.changeDate.toGedcom(lvl2, ver);
        if (tmp) {
            gedRec += "\n" + tmp;
        }
        for (i=0; i<this.citations.length; i++) {
            gedRec += "\n" + this.citations[i].toGedcom(lvl2, ver);
        }
    }
    return gedRec;
});

NoteRecord.method('parseTree',function (tree, ver) {
    this.id = this.parseRefId(tree[0], Tags.NOTE);
    this.text = this.parseConTag(tree[0], Tags.NOTE);
    if (tree[0][1]) {
        var sub2 = tree[0][1];

        var i1 = this.findTag(sub2,Tags.USERFILE);
        if (i1!==false) {
            this.userRefNbrs= [{'Nbr':
            this.parseText(sub2 [i1], Tags.USERFILE)}];
            if (sub2[i1][1]) {
                var i2 = this.findTag(sub2,Tags.TYPE);
                if (i2 !== false) {
                    this.userRefNbrs[this.userRefNbrs.length-1]['Type']
                        = this.parseText(sub2 [i1][1][i2], Tags.TYPE);
                }
            }
        }
        i1 = this.findTag(sub2,Tags.AUTORECID);
        if (i1!==false) {
            this.autoRecId = this.parseText(sub2 [i1], Tags.AUTORECID);
        }

        i1 = this.findTag(sub2,Tags.CHANGEDATE);
        if (i1!==false) {
            this.changeDate.parseTree([sub2[i1]], ver);
        }

        var off = 0;
        i1 = this.findTag(sub2,Tags.CITE, off);
        while (i1!==false) {
            var tmp = new Citation();
            tmp.parseTree([sub2[i1]], ver);
            this.citations.push(tmp);
            off = i1 + 1;
            i1 = this.findTag(sub2,Tags.CITE, off);
        }
    }
});

NoteRecord.prototype.toString = function () {
    var str = '(Id->' + this.id
        + ', Text->' + this.text;

    str += ', UserRefNbrs->';
    for (var i=0; i<this.userRefNbrs.length; i++) {
        str += "UserRefNbr->"
                + this.userRefNbrs[i]['Nbr']
                + ' (' + this.userRefNbrs[i]['Type'] + ')';
    }
    str += ', AutoRecId->' + this.autoRecId
            + ', ChangeDate->' + this.changeDate
        + ', Citations->(';

    for (i=0; i<this.citations.length; i++) {
        str += "\n" + this.citations[i];
    }
    str += '))';
    return str;
};