/**
 * Created by sahaque on 4/26/2017.
 */

function SubmitterRecord (id, name, language, submitterRefNbr, autoRecId) {
    "use strict";
    this.id = id;
    this.name = name;
    this.address = new Address();
    this.mediaLinks = [];
    this.language = language;
    this.submitterRefNbr = submitterRefNbr;
    this.autoRecId = autoRecId;
    this.changeDate = new ChangeDate();
    this.notes = [];
}

SubmitterRecord.inherits(EntityAbstract);

SubmitterRecord.method('toGedcom', function(lvl, ver) {
    "use strict";
    var gedRec = '';
    if (!ver) {
        ver = this.ver;
    }

    if (ver.indexOf('5.5.1') === 0) {
        gedRec = lvl + ' @' + this.id + '@ ' + Tags.SUBMITTER;
        var lvl2 = lvl + 1;
        if (this.name) {
            gedRec += "\n" + lvl2 + ' ' + Tags.NAME + ' ' + this.name;
        }
        var tmp = this.address.toGedcom(lvl2, ver);
        if (tmp) {
            gedRec += "\n" + tmp;
        }
        for (var i=0; i<this.mediaLinks.length; i++) {
            gedRec += "\n" + this.mediaLinks[i].toGedcom(lvl2, ver);
        }
        if (this.autoRecId) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.AUTORECID
                +' ' + this.autoRecId;
        }
        tmp = this.changeDate.toGedcom(lvl2, ver);
        if (tmp) {
            gedRec += "\n" + tmp;
        }
        for (i=0; i<this.notes.length; i++) {
            gedRec += "\n" + this.notes[i].toGedcom(lvl2, ver);
        }
    }
    return gedRec;
});

SubmitterRecord.method('parseTree', function(tree, ver){
    "use strict";
    this.id = this.parseRefId(tree[0], Tags.SUBMITTER);
    if (tree[0][1]) {
        var sub2 = tree[0][1];
        var i1=this.findTag(sub2, Tags.NAME);
        if (i1!==false) {
            this.name = this.parseText(sub2 [i1], Tags.NAME);
        }
        this.address.parseTree(sub2, ver);

        var off = 0;
        i1=this.findTag(sub2, Tags.MEDIA, off);
        while (i1!==false) {
            var tmp = new MediaLink();
            tmp.parseTree([sub2[i1]], ver);
            this.mediaLinks.push(tmp);
            off = i1 + 1;
            i1=this.findTag(sub2, Tags.MEDIA, off);
        }
        i1=this.findTag(sub2, Tags.LANGUAGE);
        if (i1!==false) {
            this.language = this.parseText(sub2 [i1], Tags.LANGUAGE);
        }
        i1=this.findTag(sub2, Tags.RFN);
        if (i1!==false) {
            this.submitterRefNbr = this.parseText(sub2 [i1], Tags.RFN);
        }
        i1=this.findTag(sub2, Tags.AUTORECID);
        if (i1!==false) {
            this.autoRecId = this.parseText(sub2 [i1], Tags.AUTORECID);
        }
        i1=this.findTag(sub2, Tags.CHANGEDATE);
        if (i1!==false) {
            this.changeDate.parseTree([sub2[i1]], ver);
        }

        off = 0;
        i1=this.findTag(sub2, Tags.NOTE, off);
        while (i1!==false) {
            tmp = new Note();
            tmp.parseTree([sub2[i1]], ver);
            this.notes.push(tmp);
            off = i1 + 1;
            i1=this.findTag(sub2, Tags.NOTE, off);
        }
    }
});

SubmitterRecord.prototype.toString = function() {
    "use strict";
    var str = '(Id->' + this.id
        + ', Name->' + this.name
        + ', Address->' + this.address;

    for (var i=0; i<this.mediaLinks.length; i++) {
        str += "\n" + this.mediaLinks[i];
    }
    str += ', Language->' + this.language
            + ', SubmitterRefNbr->' + this.submitterRefNbr
        + ', AutoRecId->' + this.autoRecId
        + ', ChangeDate->' + this.changeDate
        + ', Notes->(';

    for (i=0; i<this.notes.length; i++) {
        str += "\n" + this.notes[i];
    }
    str += '))';
    return str;
};