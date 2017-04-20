/**
 * Created by sahaque on 4/19/2017.
 */


function FactDetail(tag, descr, type, date, age, respAgency, religiousAffiliation, restriction, cause) {
    "use strict";
    this.tag = tag;
    this.descr = descr;
    this.type = type;
    this.date = date;
    this.place = new Place();
    this.address = new Address();
    this.age = age;
    this.respAgency = respAgency;
    this.religiousAffiliation = religiousAffiliation;
    this.restriction = restriction;
    this.cause = cause;
    this.citations = [];
    this.mediaLinks = [];
    this.notes = [];
}

FactDetail.inherits(EntityAbstract);

FactDetail.method('parseTree', function(tree, ver, tag) {
    "use strict";
    if (!tag) tag = Tags.EVENT;
    this.ver =ver;
    var i1=this.findTag(tree, tag);
    if (i1!==false) {
        this.tag = tag;
        this.descr = this.parseText(tree[i1], tag);
        var sub2 = tree[i1][1];
        this.parseTreeDetail(sub2, ver);
    }
});

FactDetail.method('parseTreeDetail', function(tree, ver) {
    "use strict";
    var i1=this.findTag(tree, Tags.TYPE);
    if (i1!==false) {
        this.type = this.parseText(tree[i1], Tags.TYPE);
    }
    i1=this.findTag(tree, Tags.DATE);
    if (i1!==false) {
        this.date = this.parseText(tree[i1], Tags.DATE);
    }
    i1=this.findTag(tree, Tags.ADDRESS);
    if (i1!==false) {
        this.address.parseTree([tree[i1]], ver);
    }
    i1=this.findTag(tree, Tags.PLACE);
    if (i1!==false) {
        this.place.parseTree([tree[i1]], ver);
    }
    i1=this.findTag(tree, Tags.RELIGION);
    if (i1!==false) {
        this.religiousAffiliation
            = this.parseText(tree[i1], Tags.RELIGION);
    }
    i1=this.findTag(tree, Tags.AGENCY);
    if (i1!==false) {
        this.respAgency = this.parseText(tree[i1], Tags.AGENCY);
    }
    i1=this.findTag(tree, Tags.AGE);
    if (i1!==false) {
        this.age = this.parseText(tree[i1], Tags.AGE);
    }
    i1=this.findTag(tree, Tags.RESTRICTION);
    if (i1!==false) {
        this.restriction = this.parseText(tree[i1], Tags.RESTRICTION);
    }
    i1=this.findTag(tree, Tags.CAUSE);
    if (i1!==false) {
        this.cause = this.parseText(tree[i1], Tags.CAUSE);
    }
    this.place.parseTree(tree, ver);
    this.address.parseTree(tree, ver);
    var off = 0;
    i1=this.findTag(tree, Tags.CITE, off);
    while (i1!==false) {
        var tmp = new Citation();
        tmp.parseTree([tree[i1]], ver);
        this.citations.push(tmp);
        off = i1 + 1;
        i1=this.findTag(tree, Tags.CITE, off);
    }
    off = 0;
    i1=this.findTag(tree, Tags.MEDIA, off);
    while (i1!==false) {
        tmp = new MediaLink();
        tmp.parseTree([tree[i1]], ver);
        this.mediaLinks.push(tmp);
        off = i1 + 1;
        i1=this.findTag(tree, Tags.MEDIA, off);
    }
    off = 0;
    i1=this.findTag(tree, Tags.NOTE, off);
    while (i1!==false) {
        tmp = new Note();
        tmp.parseTree(tree[i1], ver);
        this.notes.push(tmp);
        off = i1 + 1;
        i1=this.findTag(tree, Tags.NOTE, off);
    }
});

FactDetail.prototype.toString = function () {
    var str = '(Version->' + this.ver
        + ', Tag->' + this.tag
        + ', Description->' + this.descr
        + ', Type->' + this.type
        + ', Date->' + this.date
        + ', Place->' + this.place
        + ', Address->' + this.address
        + ', Age->' + this.age
        + ', RespAgency->' + this.respAgency
        + ', ReligiousAffiliation->' + this.religiousAffiliation
        + ', Restriction->' + this.restriction
        + ', Cause->' + this.cause;

    for (var i=0; i<this.citations.length; i++) {
        str += "\n" + this.citations[i];
    }
    for (i=0; i<this.mediaLinks.length; i++) {
        str += "\n" + this.mediaLinks[i];
    }
    for (i=0; i<this.notes.length; i++) {
        str += "\n" + this.notes[i];
    }

    str += ')';

    return str;
};