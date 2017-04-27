/**
 * Created by sahaque on 4/26/2017.
 */

function RepositoryRecord (id,name,autoRecId) {
    "use strict";
    this.id = id;
    this.name = name;
    this.userRefNbrs = [];
    this.address = new Address();
    this.autoRecId = autoRecId;
    this.changeDate = new ChangeDate();
    this.notes = [];
}

RepositoryRecord.inherits(EntityAbstract);

RepositoryRecord.method('toGedcom', function(lvl, ver) {
    "use strict";
    var gedRec = '';
    if (!ver) {
        ver = this.ver;
    }

    if (ver.indexOf('5.5.1') === 0) {
        gedRec = lvl + ' @' + this.id + '@ ' + Tags.REPOSITORY;
        var lvl2 = lvl + 1;
        if (this.name) {
            gedRec += "\n" + lvl2 + ' ' + Tags.NAME + ' ' + this.name;
        }
        var str = this.address.toGedcom(lvl2, ver);
        if (str) {
            gedRec += "\n" + str;
        }
        for (var i=0; i<this.userRefNbrs.length; i++) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.USERFILE
                + ' ' + this.userRefNbrs[i]['Nbr'];
            if (this.userRefNbrs[i]['Type']) {
                gedRec += "\n" + (lvl2+1)
                    + ' ' + Tags.TYPE
                    + ' ' + this.userRefNbrs[i]['Type'];
            }
        }
        if (this.autoRecId) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.AUTORECID + ' ' + this.autoRecId;
        }
        var tmp = this.changeDate.toGedcom(lvl2, ver);
        if (tmp) {
            gedRec += "\n" + tmp;
        }
        for (i=0; i<this.notes.length; i++) {
            gedRec += "\n" + this.notes[i].toGedcom(lvl2, ver);
        }
    }
    return gedRec;
});

RepositoryRecord.method('parseTree', function (tree, ver) {
    this.id = this.parseRefId(tree[0], Tags.REPOSITORY);
    if (tree[0][1]) {
        var sub2 = tree[0][1];
        var i1=this.findTag(sub2, Tags.NAME);
        if (i1!==false) {
            this.name = this.parseText(sub2 [i1], Tags.NAME);
        }
        this.address.parseTree(sub2, ver);
        i1=this.findTag(sub2, Tags.USERFILE);
        if (i1!==false) {
            this.userRefNbrs = [{'Nbr':
                this.parseText(sub2 [i1], Tags.USERFILE)}];
            if (sub2[i1][1]) {
                var i2=this.findTag(sub2[i1][1], Tags.TYPE);
                if (i2 !== false) {
                    this.userRefNbrs[this.userRefNbrs.length-1]['Type']
                        = this.parseText(sub2 [i1][1][i2], Tags.TYPE);
                }
            }
        }
        i1=this.findTag(sub2, Tags.AUTORECID);
        if (i1!==false) {
            this.autoRecId = this.parseText(sub2 [i1], Tags.AUTORECID);
        }
        i1=this.findTag(sub2, Tags.CHANGEDATE);
        if (i1!==false) {
            this.changeDate.parseTree([sub2[i1]], ver);
        }

        var off = 0;
        i1=this.findTag(sub2, Tags.NOTE, off);
        while (i1!==false) {
            var tmp = new Note();
            tmp.parseTree([sub2[i1]], ver);
            this.notes.push(tmp);
            off = i1 + 1;
            i1=this.findTag(sub2, Tags.NOTE, off);
        }
    }
});

RepositoryRecord.prototype.toString = function () {
    var str = '(Id.' + this.id
        + ', Name.' + this.name
        + ', Address.' + this.address;

    str += ', UserRefNbrs.(';
    for (var i=0; i<this.userRefNbrs.length; i++) {
        str += "UserRefNbr."
                + this.userRefNbrs[i]['Nbr']
                + ' (' + this.userRefNbrs[i]['Type'] + ')';
    }
    str += '), AutoRecId.' + this.autoRecId
            + ', ChangeDate.' + this.changeDate
        + ', Notes.(';

    for (i=0; i<this.notes.length; i++) {
        str += "\n" + this.notes[i];
    }
    str += '))';
    return str;
};