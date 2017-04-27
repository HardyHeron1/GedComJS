/**
 * Created by faiz on 4/25/2017.
 */

function IndividualRecord(id,restriction,gender,permRecFileNbr,ancFileNbr,autoRecId) {
    "use strict";
    this.id = id;
    this.restriction = restriction;
    this.names = [];
    this.gender = gender;
    this.events = [];
    this.attributes = [];
    this.ldsOrdinances = [];
    this.childFamilyLinks = [];
    this.spouseFamilyLinks = [];
    this.submitterLinks = [];
    this.associations = [];
    this.aliases = [];
    this.ancestorInterests = [];
    this.descendantInterests = [];
    this.permRecFileNbr = permRecFileNbr;
    this.ancFileNbr = ancFileNbr;
    this.userRefNbrs = [];
    this.autoRecId = autoRecId;
    this.changeDate = new ChangeDate();
    this.notes = [];
    this.citations = [];
    this.mediaLinks = [];
}

IndividualRecord.inherits(EntityAbstract);

IndividualRecord.method('getFullName',function () {
    if(this.names[0].name.full)
        return this.names[0].name.full;
});

IndividualRecord.method('getEvent',function (tag, offset) {
    if (!offset) offset = 0;
    var events = this.events;
    var idx = 1;
    for (var event in events) {
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

IndividualRecord.method('toGedcom',function (lvl, ver) {
    if(!lvl) lvl = 0;
    var gedRec = '';
    if (!ver) {
        ver = this.ver;
    }

    if (ver.indexOf('5.5.1') === 0) {
        gedRec = lvl + ' @' + this.id + '@ ' + Tags.INDIVIDUAL;
        var lvl2 = lvl + 1;
        if (this.restriction) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.RESTRICTION +' ' + this.restriction;
        }
        for (var i=0; i<this.names.length; i++) {
            gedRec += "\n" + this.names[i].toGedcom(lvl2, ver);
        }
        if (this.gender) {
            gedRec += "\n" + lvl2 + ' ' + Tags.GENDER + ' ' + this.gender;
        }
        for (i=0; i<this.events.length; i++) {
            gedRec += "\n" + this.events[i].toGedcom(lvl2, ver);
        }
        if (this.attributes) {
            for (i = 0; i < this.attributes.length; i++) {
                gedRec += "\n" + this.attributes[i].toGedcom(lvl2, ver);
            }
        }
        for (i=0; i<this.childFamilyLinks.length; i++) {
            gedRec += "\n"
                    + this.childFamilyLinks[i]
                    .toGedcom(lvl2, ver, Tags.CHILDFAMILY);
        }
        for (i=0; i<this.spouseFamilyLinks.length; i++) {
            gedRec += "\n"
                    + this.spouseFamilyLinks[i]
                    .toGedcom(lvl2, ver, Tags.SPOUSEFAMILY);
        }
        for (i=0; i<this.submitterLinks.length; i++) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.SUBMITTER + ' @' + this.submitterLinks[i] + '@';
        }
        for (i=0; i<this.associations.length; i++) {
            gedRec += "\n" + this.associations[i].toGedcom(lvl2, ver);
        }
        for (i=0; i<this.aliases.length; i++) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.ALIAS + ' @' + this.aliases[i] + '@';
        }
        for (i=0; i<this.ancestorInterests.length; i++) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.ANCI + ' @' + this.ancestorInterests[i] + '@';
        }
        for (i=0; i<this.descendantInterests.length; i++) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.DESI + ' @' + this.descendantInterests[i] + '@';
        }
        if (this.permRecFileNbr) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.PERMFILE +' ' + this.permRecFileNbr;
        }
        if (this.ancFileNbr) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.ANCFILE +' ' + this.ancFileNbr;
        }
        for (i=0; i<this.userRefNbrs.length; i++) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.USERFILE + ' ' + this.userRefNbrs[i]['Nbr'];
            if (this.userRefNbrs[i]['Type']) {
                gedRec += "\n" + (lvl2+1)
                    + ' ' + Tags.TYPE + ' ' + this.userRefNbrs[i]['Type'];
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

IndividualRecord.method('parseTree',function (tree,ver) {
    this.ver = ver;
    this.id = this.parseRefId(tree[0], Tags.INDIVIDUAL);
    if (tree[0][1]) {
        var sub2 = tree[0][1];
        var i1 = this.findTag(sub2, Tags.RESTRICTION);
        if (i1 !== false) {
            this.restriction
                = this.parseText(sub2 [i1], Tags.RESTRICTION);
        }

        var off = 0;
        i1 = this.findTag(sub2, Tags.FULL, off);
        while (i1!== false) {
            var tmp = new PersonalName();
            tmp.parseTree([sub2[i1]], ver);
            this.names.push(tmp);
            off = i1 + 1;
            i1 = this.findTag(sub2, Tags.FULL, off);
        }

        i1 = this.findTag(sub2, Tags.GENDER);
        if (i1 !== false) {
            this.gender = this.parseText(sub2 [i1], Tags.GENDER);
        }

        tmp = new Event();
        this.events = tmp.parseTreeToArray(sub2, ver);
        tmp = new Fact();
        this.attributes = tmp.parseTreeToArray(sub2, ver);

        off = 0;
        i1 = this.findTag(sub2, Tags.CHILDFAMILY, off);
        while (i1 !== false) {
            tmp = new FamilyLink();
            tmp.parseTree([sub2[i1]], ver, Tags.CHILDFAMILY);
            this.childFamilyLinks.push(tmp);
            off = i1 + 1;
            i1 = this.findTag(sub2, Tags.CHILDFAMILY, off);
        }
        off = 0;
        i1 = this.findTag(sub2, Tags.SPOUSEFAMILY, off);
        while (i1!== false) {
            tmp = new FamilyLink();
            tmp.parseTree(([sub2[i1]]), ver, Tags.SPOUSEFAMILY);
            this.spouseFamilyLinks.push(tmp);
            off = i1 + 1;
            i1 = this.findTag(sub2, Tags.SPOUSEFAMILY, off);
        }
        off = 0;
        i1 = this.findTag(sub2, Tags.SUBMITTER, off);
        while (i1!== false) {
            this.submitterLinks.push(this.parsePtrId(sub2 [i1], Tags.SUBMITTER));
            off = i1 + 1;
            i1 = this.findTag(sub2, Tags.SUBMITTER, off);
        }
        off = 0;
        i1 = this.findTag(sub2, Tags.ASSOCIATION, off);
        while (i1!== false) {
            tmp = new Association();
            tmp.parseTree([sub2[i1]], ver);
            this.associations.push(tmp);
            off = i1 + 1;
            i1 = this.findTag(sub2, Tags.ASSOCIATION, off);
        }
        off = 0;
        i1 = this.findTag(sub2, Tags.ALIAS, off);
        while (i1!== false) {
            this.aliases.push(this.parsePtrId(sub2 [i1], Tags.ALIAS));
            off = i1 + 1;
            i1 = this.findTag(sub2, Tags.ALIAS, off);
        }
        off = 0;
        i1 = this.findTag(sub2, Tags.ANCI, off);
        while (i1!== false) {
            this.ancestorInterests.push(this.parsePtrId(sub2 [i1], Tags.ANCI));
            off = i1 + 1;
            i1 = this.findTag(sub2, Tags.ALIAS, off);
        }
        off = 0;
        i1 = this.findTag(sub2, Tags.DESI, off);
        while (i1!== false) {
            this.descendantInterests.push(this.parsePtrId(sub2 [i1], Tags.DESI));
            off = i1 + 1;
            i1 = this.findTag(sub2, Tags.DESI, off);
        }
        i1 = this.findTag(sub2, Tags.PERMFILE);
        if (i1!== false) {
            this.permRecFileNbr
                = this.parseText(sub2 [i1], Tags.PERMFILE);
        }
        i1 = this.findTag(sub2, Tags.ANCFILE);
        if (i1!== false) {
            this.ancFileNbr = this.parseText(sub2 [i1], Tags.ANCFILE);
        }
        i1 = this.findTag(sub2, Tags.USERFILE);
        if (i1!== false) {
            this.userRefNbrs = [{'Nbr':
                this.parseText(sub2 [i1], Tags.USERFILE)}];
            if (sub2[i1][1]) {
                var i2 = this.findTag(sub2[i1][1], Tags.TYPE);
                if (i2!== false) {
                    this.userRefNbrs[this.userRefNbrs.length - 1]['Type']
                        = this.parseText(sub2 [i1][1][i2], Tags.TYPE);
                }
            }
        }
        i1 = this.findTag(sub2, Tags.AUTORECID);
        if (i1!== false) {
            this.autoRecId = this.parseText(sub2 [i1], Tags.AUTORECID);
        }

        i1 = this.findTag(sub2, Tags.CHANGEDATE);
        if (i1!== false) {
            this.changeDate.parseTree([sub2[i1]], ver);
        }

        off = 0;
        i1 = this.findTag(sub2, Tags.CITE, off);
        while (i1!== false) {
            tmp = new Citation();
            tmp.parseTree([sub2[i1]], ver);
            this.citations.push(tmp);
            off = i1 + 1;
            i1 = this.findTag(sub2, Tags.CITE, off);
        }
        off = 0;
        i1 = this.findTag(sub2, Tags.MEDIA, off);
        while (i1!== false) {
            tmp = new MediaLink();
            tmp.parseTree([sub2[i1]], ver);
            this.mediaLinks.push(tmp);
            off = i1 + 1;
            i1 = this.findTag(sub2, Tags.MEDIA, off);
        }
        off = 0;
        i1 = this.findTag(sub2, Tags.NOTE, off);
        while (i1!== false) {
            tmp = new Note();
            tmp.parseTree([sub2[i1]], ver);
            this.notes.push(tmp);
            off = i1 + 1;
            i1 = this.findTag(sub2, Tags.NOTE, off);
        }
    }
});

IndividualRecord.prototype.toString = function () {
    var str =  '(Id->' + this.id
        + ', Restriction->' + this.restriction
        + ', Names->(';

    for (var i=0; i<this.names.length; i++) {
        str += "\n" + this.names[i];
    }
    str += '), Gender->' + this.gender
            + ', Events->(';
    for (i=0; i<this.events.length; i++) {
        str += "\n" + this.events[i];
    }
    str += '), Attributes->(';
    for (i=0; i<this.attributes.length; i++) {
        str += "\n" + this.attributes[i];
    }
    str += '), LdsOrdinances->(';
    for (i=0; i<this.ldsOrdinances.length; i++) {
        str += "\n" + this.ldsOrdinances[i];
    }
    str += '), ChildFamilyLinks->(';
    for (i=0; i<this.childFamilyLinks.length; i++) {
        if (i > 0) {
            str += ', ';
        }
        str += this.childFamilyLinks[i];
    }
    str += '), SpouseFamilyLinks->(';
    for (i=0; i<this.spouseFamilyLinks.length; i++) {
        if (i > 0) {
            str += ', ';
        }
        str += this.spouseFamilyLinks[i];
    }
    str += '), SubmitterLinks->(';
    for (i=0; i<this.submitterLinks.length; i++) {
        if (i > 0) {
            str += ', ';
        }
        str += this.submitterLinks[i];
    }
    str += '), Associations->(';
    for (i=0; i<this.associations.length; i++) {
        str += "\n" + this.associations[i];
    }
    str += '), Aliases->(';
    for (i=0; i<this.aliases.length; i++) {
        if (i > 0) {
            str += ', ';
        }
        str += this.aliases[i];
    }
    str += '), AncestorInterests->(';
    for (i=0; i<this.ancestorInterests.length; i++) {
        if (i > 0) {
            str += ', ';
        }
        str += this.ancestorInterests[i];
    }
    str += '), DescendantInterests->(';
    for (i=0; i<this.descendantInterests.length; i++) {
        if (i > 0) {
            str += ', ';
        }
        str += this.descendantInterests[i];
    }
    str += '), PermRecFileNbr->' + this.permRecFileNbr
            + ', AncFileNbr->' + this.ancFileNbr;

    str += ', UserRefNbrs->(';
    for (i=0; i<this.userRefNbrs.length; i++) {
        str += "UserRefNbr->" + this.userRefNbrs[i]['Nbr']
                + ' (' + this.userRefNbrs[i]['Type'] + ')';
    }
    str += '), AutoRecId->' + this.autoRecId
            + ', ChangeDate->' + this.changeDate
        + ', Citations->(';
    for (i=0; i<this.citations.length; i++) {
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