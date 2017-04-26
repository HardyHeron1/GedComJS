/**
 * Created by faiz on 4/24/2017.
 */

function FamilyRecord(id,restriction,husband,wife,countOfChildren,autoRecId) {
    "use strict";
    this.id = id;
    this.restriction = restriction;
    this.events = [];
    this.husband = husband;
    this.wife = wife;
    this.children = [];
    this.countOfChildren = countOfChildren;
    this.ldsSealings = [];
    this.userRefNbrs = [];
    this.submitterLinks = [];
    this.autoRecId = autoRecId;
    this.changeDate = new ChangeDate();
    this.notes = [];
    this.citations = [];
    this.mediaLinks = [];
}

FamilyRecord.inherits(EntityAbstract);

FamilyRecord.method('getEvent',function (tag,offset) {
    if (!offset) offset = 0;
   var events = this.events;
   var idx = 1;
    for(var event in events) {
        if(event.tag === tag
            || (event.tag === 'EVEN'
            && event._TYPES === tag)) {
            if(offset === idx) {
                return event;
            }
            idx++;
        }
    }
    return false;
});

FamilyRecord.method('toGedcom',function (lvl,ver) {
    var gedRec = '';
    if (!ver) {
        ver = this.ver;
    }

    if (ver.indexOf('5.5.1') === 0) {
        gedRec = lvl + ' @' + this.id + '@ ' + Tags.FAMILY;
       var lvl2 = lvl + 1;
        if (this.restriction) {
            gedRec += "\n" + lvl2 + ' '
                + Tags.RESTRICTION +' ' + this.restriction;
        }
        if (this.husband) {
            gedRec += "\n" + lvl2 + ' '
                + Tags.HUSBAND + ' @' + this.husband + '@';
        }
        if (this.wife) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.WIFE +' @' + this.wife + '@';
        }
        for (var i=0; i<this.children.length; i++) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.CHILD + ' @' + this.children[i] + '@';
        }
        if (this.countOfChildren) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.CHILDCNT +' ' + this.countOfChildren;
        }
        for (i=0; i<this.events.length; i++) {
            gedRec += "\n" + this.events[i].toGedcom(lvl2, ver);
        }
        for (i=0; i<this.submitterLinks.length; i++) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.SUBMITTER + ' @' + this.submitterLinks[i] + '@';
        }
        for (i=0; i<this.userRefNbrs.length; i++) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.USERFILE + ' ' + this.userRefNbrs[i]['Nbr'];
            if (this.userRefNbrs[i]['Type']) {
                gedRec += "\n" + (lvl2+1)
                    + ' ' + Tags.TYPE + ' '+ this.userRefNbrs[i]['Type'];
            }
        }
        if (this.autoRecId) {
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
        for (i=0; i<this.mediaLinks.length; i++) {
            gedRec += "\n" + this.mediaLinks[i].toGedcom(lvl2, ver);
        }
        for (i=0; i<this.notes.length; i++) {
            gedRec += "\n" + this.notes[i].toGedcom(lvl2, ver);
        }

    }
    return gedRec;
});

FamilyRecord.method('parseTree',function (tree,ver) {
    "use strict";
    this.id = this.parseRefId(tree[0], Tags.FAMILY);
    if (tree[0][1]) {
       var sub2 = tree[0][1];
        var i1=this.findTag(sub2,Tags.RESTRICTION);
        if (i1!==false) {
            this.restriction
                = this.parseText(sub2 [i1], Tags.RESTRICTION);
        }
       var tmp = new Event();
        this.events = tmp.parseTreeToArray(sub2, ver);
        i1=this.findTag(sub2,Tags.HUSBAND);
        if (i1!==false) {
            this.husband = this.parsePtrId(sub2 [i1], Tags.HUSBAND);
        }
        i1=this.findTag(sub2,Tags.WIFE);
        if (i1!==false) {
            this.wife = this.parsePtrId(sub2 [i1], Tags.WIFE);
        }
        var off = 0;
        i1=this.findTag(sub2,Tags.CHILD, off);
        while (i1!==false) {
            this.children.push(this.parsePtrId(sub2 [i1], Tags.CHILD));
            off = i1 + 1;
            i1=this.findTag(sub2,Tags.CHILD, off);
        }
        i1=this.findTag(sub2,Tags.CHILDCNT);
        if (i1!==false) {
            this.countOfChildren
                = this.parseText(sub2 [i1], Tags.CHILDCNT);
        }
        off = 0;
        i1=this.findTag(sub2,Tags.SUBMITTER, off);
        while (i1!==false) {
            this.submitterLinks.push(this.parsePtrId(sub2 [i1], Tags.SUBMITTER));
            off = i1 + 1;
            i1=this.findTag(sub2,Tags.SUBMITTER, off);
        }
        i1=this.findTag(sub2,Tags.USERFILE);
        if (i1!==false) {
            this.userRefNbrs = [{'Nbr':
                this.parseText(sub2 [i1], Tags.USERFILE)}];
            if (sub2[i1][1]) {
                var i2=this.findTag(sub2,Tags.TYPE);
                if (i2!== false) {
                    this.userRefNbrs[this.userRefNbrs.length-1]['Type']
                        = this.parseText(sub2 [i1][1][i2], Tags.TYPE);
                }
            }
        }
        i1=this.findTag(sub2,Tags.AUTORECID);
        if (i1!==false) {
            this.autoRecId = this.parseText(sub2 [i1], Tags.AUTORECID);
        }
        i1=this.findTag(sub2,Tags.CHANGEDATE);
        if (i1!==false) {
            this.changeDate.parseTree([sub2[i1]], ver);
        }

        off = 0;
        i1=this.findTag(sub2,Tags.CITE, off);
        while (i1!==false) {
            tmp = new Citation();
            tmp.parseTree([sub2[i1]], ver);
            this.citations.push(tmp);
            off = i1 + 1;
            i1=this.findTag(sub2,Tags.CITE, off);
        }
        off = 0;
        i1=this.findTag(sub2,Tags.MEDIA, off);
        while (i1!==false) {
            tmp = new MediaLink();
            tmp.parseTree([sub2[i1]], ver);
            this.mediaLinks.push(tmp);
            off = i1 + 1;
            i1=this.findTag(sub2,Tags.MEDIA, off);
        }
        off = 0;
        i1=this.findTag(sub2,Tags.NOTE, off);
        while (i1!==false) {
            tmp = new Note();
            tmp.parseTree([sub2[i1]], ver);
            this.notes.push(tmp);
            off = i1 + 1;
            i1=this.findTag(sub2,Tags.NOTE, off);
        }
    }
});

FamilyRecord.prototype.toString = function () {
    var str = '(Id->' + this.id
        + ', Restriction->' + this.restriction
        + ', Events->(';

    for (var i=0; i<this.events.length; i++) {
        str += "\n" + this.events[i];
    }
    str += '), Husband->' + this.husband
            + ', Wife->' + this.wife;

    for (i=0; i<this.children.length; i++) {
        str += ", Child->" + this.children[i];
    }

    str += ', CountOfChildren->' + this.countOfChildren;
    str += ', LdsSealings->(';
    for (i=0; i<this.ldsSealings.length; i++) {
        str += "\n" + this.ldsSealings[i];
    }
    str += '), UserRefNbrs->(';
    for (i=0; i<this.userRefNbrs.length; i++) {
        str += "UserRefNbr->" + this.userRefNbrs[i]['Nbr']
                + ' (' + this.userRefNbrs[i]['Type'] + ')';
    }
    str += '), AutoRecId->' + this.autoRecId
            + ', ChangeDate->' + this.changeDate
        + ', SubmitterLinks->(';
    for (i=0; i<this.submitterLinks.length; i++) {
        if (i > 0) {
            str += ', ';
        }
        str += "Submitter->" + this.submitterLinks[i];
    }
    str += '), Citations->(';
    for (i=0; i<this.citations; i++) {
        str += "\n" + this.citations[i];
    }
    str += '), MediaLinks->(';
    for (i=0; i<this.mediaLinks.length; i++) {
        str += "\n" + this.mediaLinks[i];
    }
    str += '), Notes->(';
    for (i=0; i<this.notes.length; i++) {
        str += "\n" + this.notes[i];
    }
    str += '))';
    return str;
};