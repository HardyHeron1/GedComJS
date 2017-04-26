/**
 * Created by faiz on 4/26/2017.
 */

function MediaRecord(id,autoRecId){
    "use strict";
    this.id = id;
    this.mediaFiles = [];
    this.userRefNbrs = [];
    this.submitterLinks = [];
    this.autoRecId = autoRecId;
    this.changeDate = new ChangeDate();
    this.notes = [];
    this.citations = [];
}

MediaRecord.inherits(EntityAbstract);

MediaRecord.method('toGedcom',function (lvl, ver) {
     var gedRec = '';
    if (!ver || ver === '') {
        ver = this.ver;
    }

    if (ver.indexOf('5.5.1') === 0) {
        gedRec = lvl + ' @' + this.id + '@ ' + Tags.MEDIA;
        var lvl2 = lvl + 1;

        for (var i=0; i<this.mediaFiles.length; i++) {
            gedRec += "\n" + this.mediaFiles[i].toGedcom(lvl2, ver);
        }
        for (i=0; i<this.userRefNbrs.length; i++) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.USERFILE + ' ' + this.userRefNbrs[i]['Nbr'];
            if (this.userRefNbrs[i]['Type']) {
                gedRec += "\n" + (lvl2+1)
                    + ' ' + Tags.TYPE + ' ' + this.userRefNbrs[i]['Type'];
            }
        }
        if (this.autoRecId && this.autoRecId !== '') {
            gedRec += "\n" + lvl2
                + ' ' + Tags.AUTORECID +' ' + this.autoRecId;
        }
        var tmp = this.changeDate.toGedcom(lvl2, ver);
        if (tmp) {
            gedRec += "\n" + tmp;
        }
        for (i=0; i<this.citations.length; i++) {
            gedRec += "\n" + this.citations[i].toGedcom(lvl2, ver);
        }
        for (i=0; i<this.notes.length; i++) {
            gedRec += "\n" + this.notes[i].toGedcom(lvl2, ver);
        }
    }
    return gedRec;
});

MediaRecord.method('parseTree',function (tree, ver) {
    this.id = this.parseRefId(tree[0], Tags.MEDIA);
    if (tree[0][1]) {
        var sub2 = tree[0][1];
        var off = 0;
        var i1=this.findTag(sub2,Tags.FILE, off);
        while (i1!==false) {
            var tmp = new MediaFile();
            tmp.parseTree([sub2[i1]], ver);
            this.mediaFiles.push(tmp);
            off = i1 + 1;
            i1=this.findTag(sub2,Tags.FILE, off);

        }
        i1 = this.findTag(sub2,Tags.USERFILE);
        if (i1!==false) {
            this.userRefNbrs = [{'Nbr':
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

        off = 0;
        i1 = this.findTag(sub2,Tags.CITE, off);
        while (i1!==false) {
            tmp = new Citation();
            tmp.parseTree([sub2[i1]], ver);
            this.citations.push(tmp);
            off = i1 + 1;
            i1 = this.findTag(sub2,Tags.CITE, off);
        }
        off = 0;
        i1 = this.findTag(sub2,Tags.NOTE, off);
        while (i1!==false) {
            tmp = new Note();
            tmp.parseTree([sub2[i1]], ver);
            this.notes.push(tmp);
            off = i1 + 1;
            i1 = this.findTag(sub2,Tags.NOTE, off);
        }
    }
});

MediaRecord.prototype.toString = function () {
    var str = '(Id->' + this.id
        + ', MediaFiles->(';

    for (var i=0; i<this.mediaFiles.length; i++) {
        str += "MediaFile->" + this.mediaFiles[i];
    }
    str += '), UserRefNbrs->(';
    for (i=0; i<this.userRefNbrs.length; i++) {
        str += "UserRefNbr->"
                + this.userRefNbrs[i]['Nbr']
                + ' (' + this.userRefNbrs[i]['Type'] + ')';
    }
    str += '), AutoRecId->' + this.autoRecId
            + ', ChangeDate->' + this.changeDate
        + ', Citations->(';

    for (i=0; i<this.citations.length; i++) {
        str += "\n" + this.citations[i];
    }
    str += '), Notes->(' ;
    for (i=0; i<this.notes.length; i++) {
        str += "\n" + this.notes[i];
    }
    str += '))';
    return str;
};