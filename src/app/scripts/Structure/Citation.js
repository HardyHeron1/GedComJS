/**
 * Created by sahaque on 4/18/2017.
 */


function Citation(sourceId, page, eventType, roleInEvent, entryDate, quay ) {
    "use strict";
    this.sourceId = sourceId;
    this.page = page;
    this.eventType = eventType;
    this.roleInEvent = roleInEvent;
    this.entryDate = entryDate;
    this.quay = quay;
    this.texts = [];
    this.mediaLinks = [];
    this.notes = [];
}

Citation.inherits(EntityAbstract);

Citation.method('parseTree', function(tree, ver) {
    "use strict";
    this.ver =ver;
    var i1=this.findTag(tree, Tags.SOURCE);
    if (i1!==false) {
        this.sourceId = this.parsePtrId(tree[i1], Tags.SOURCE);
        var sub2 = tree[i1][1];
        var i2=this.findTag(sub2, Tags.PAGE);
        if (i2!==false) {
            this.page = this.parseText(sub2[i2], Tags.PAGE);
        }
        i2=this.findTag(sub2, Tags.QUAY);
        if (i2!==false) {
            this.quay = this.parseText(sub2[i2], Tags.QUAY);
        }
        i2=this.findTag(sub2, Tags.EVENTTYPE);
        if (i2!==false) {
            this.eventType = this.parseText(sub2[i2], Tags.EVENTTYPE);
            if (sub2[i2][1]) {
                var i3=this.findTag(sub2[i2][1], Tags.ROLE);
                if (i3!==false) {
                    this.roleInEvent
                        = this.parseText(sub2[i2][1][i3], Tags.ROLE);
                }
            }
        }
        i2=this.findTag(sub2, Tags.DATA);
        if (i2!==false) {
            var sub3 = sub2[i2][1];
            if (sub3) {
                i3 = this.findTag(sub3, Tags.DATE);
                if (i3!==false) {
                    this.entryDate = this.parseText(sub3[i3], Tags.DATE);
                }
                var off = 0;
                i3=this.findTag(sub3, Tags.TEXT, off);
                while (i3!==false) {
                    this.texts.push(
                        this.parseConTag(sub3[i3], Tags.TEXT));
                    off = i3 + 1;
                    i3 = this.findTag(sub3, Tags.TEXT, off);
                }
            }
        }
        off = 0;
        i2 = this.findTag(sub2, Tags.MEDIA, off);
        while (i2!==false) {
            var tmp = new MediaLink();
            tmp.parseTree([sub2[i2]], ver);
            this.mediaLinks.push(tmp);
            off = i2 + 1;
            i2 = this.findTag(sub2, Tags.MEDIA, off);
        }
        off = 0;
        i2 = this.findTag(sub2, Tags.NOTE, off);
        while (i2!==false) {
            tmp = new Note();
            tmp.parseTree([sub2[i2]], ver);
            this.notes.push(tmp);
            off = i2 + 1;
            i2 = this.findTag(sub2, Tags.NOTE, off);
        }

    }
});

Citation.method('toGedcom', function (lvl, ver) {
    "use strict";
    if (!ver || ver === '') {
        ver = this.ver;
    }
    var gedRec = '';
    if (ver.indexOf('5.5.1') === 0) {
        if (this.sourceId && this.sourceId !== '') {
            gedRec += lvl + ' ' + Tags.CITE + ' @' + this.sourceId + '@';
        }
        var lvl2 = lvl + 1;
        if (this.page && this.page !== '') {
            gedRec += "\n" + lvl2 + ' ' + Tags.PAGE + ' ' + this.page;
        }
        if (this.eventType && this.eventType !== '') {
            gedRec += "\n" + lvl2 + ' '
                + Tags.EVENTTYPE + ' ' + this.eventType;
            if (this.roleInEvent && this.roleInEvent !== '') {
                gedRec += "\n" + (lvl2+1)
                    + ' ' + Tags.ROLE + ' ' + this.roleInEvent;
            }
        }
        if (this.entryDate && this.entryDate !== ''
            || this.texts.length > 0
        ) {
            gedRec += "\n" + lvl2 + ' ' + Tags.DATA;
            var lvl3 = lvl2 + 1;
            if (this.entryDate && this.entryDate !== '') {
                gedRec += "\n"
                    + lvl3 + ' ' + Tags.DATE + ' ' + this.entryDate;
            }
            for (var i=0; i<this.texts.length; i++) {
                gedRec += "\n"
                    + this.toConTag(this.texts[i], Tags.TEXT, lvl3);
            }
        }
        if (this.quay && this.quay !== '') {
            gedRec += "\n" + lvl2 + ' ' + Tags.QUAY + ' ' + this.quay;
        }
        for (i=0; i<this.mediaLinks; i++) {
            gedRec += "\n" + this.mediaLinks[i].toGedcom(lvl2, ver);
        }
        for (i=0; i<this.notes.length; i++) {
            gedRec += "\n" + this.notes[i].toGedcom(lvl2, ver);
        }
    }
    return gedRec;
});


Citation.prototype.toString = function () {
    var str = '(Version->' + this.ver
        + ', SourceId->' + this.sourceId
        + ', Page->' + this.page
        + ', EventType->' + this.eventType
        + ', RoleInEvent->' + this.roleInEvent
        + ', EntryDate->' + this.entryDate
        + ', Texts->(';

    for (var i=0; i<this.texts.length; i++) {
        str += "\nText->(" + this.texts[i] + ')';

    }
    str += '), Quay->' + this.quay
            + ', MediaLinks->(';
    for (i=0; i< this.mediaLinks.length; i++) {
        str += "\n" . this.mediaLinks[i];
    }
    str += '), Notes->(';
    for (i=0; i<this.notes.length; i++) {
        str += "\n" + this.notes[i];
    }

    str += '))';
    return str;
};