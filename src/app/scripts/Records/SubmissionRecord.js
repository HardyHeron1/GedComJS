/**
 * Created by sahaque on 4/26/2017.
 */

function SubmissionRecord (id,familyFileName, templeCode, generationAncestors, generationsDescendants,ordinanceProcessFlag, submitterId, autoRecId) {
    "use strict";
    this.id = id;
    this.familyFileName = familyFileName;
    this.templeCode = templeCode;
    this.generationAncestors = generationAncestors;
    this.generationsDescendants = generationsDescendants;
    this.ordinanceProcessFlag = ordinanceProcessFlag;
    this.submitterId = submitterId;
    this.autoRecId = autoRecId;
    this.changeDate = new ChangeDate();
    this.notes = [];
}

SubmissionRecord.inherits(EntityAbstract);

SubmissionRecord.method('toGedcom', function(lvl, ver){
    "use strict";
    var gedRec = '';
    if (!ver) {
        ver = this.ver;
    }

    if (ver.indexOf('5.5.1') === 0) {
        gedRec = lvl + ' @' +this.id + '@ ' + Tags.SUBMISSION;
        var lvl2 = lvl + 1;
        if (this.familyFileName) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.FAMILYFILE
                + ' ' + this.familyFileName;
        }
        if (this.templeCode) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.TEMPLECODE
                + ' ' + this.templeCode;
        }
        if (this.generationsAncestors
        ) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.ANCESTORS
                + ' ' + this.generationsAncestors;
        }
        if (this.generationsDescendants
            ) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.DESCENDANTS
                + ' ' + this.generationsDescendants;
        }
        if (this.ordinanceProcessFlag) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.ORDINANCEFLAG + ' ' + this.ordinanceProcessFlag;
        }

        if (this.autoRecId) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.AUTORECID + ' ' + this.autoRecId;
        }
        var tmp = this.changeDate.toGedcom(lvl2, ver);
        if (tmp) {
            gedRec += "\n" + tmp;
        }
        for (var i=0; i<this.notes.length; i++) {
            gedRec += "\n" + this.notes[i].toGedcom(lvl2, ver);
        }
    }
    return gedRec;
});

SubmissionRecord.method('parseTree', function(tree, ver){
    "use strict";
    this.id = this.parseRefId(tree[0], Tags.SUBMISSION);
    if (tree[0][1]) {
        var sub2 = tree[0][1];
        var i1=this.findTag(sub2, Tags.SUBMITTER);
        if (i1!==false) {
            this.submitterId
                = this.parsePtrId(sub2 [i1], Tags.SUBMITTER);
        }
        i1=this.findTag(sub2, Tags.FAMILYFILE);
        if (i1!==false) {
            this.familyFileName
                = this.parseText(sub2 [i1], Tags.FAMILYFILE);
        }
        i1=this.findTag(sub2, Tags.TEMPLECODE);
        if (i1!==false) {
            this.templeCode
                = this.parseText(sub2 [i1], Tags.TEMPLECODE);
        }
        i1=this.findTag(sub2, Tags.ANCESTORS);
        if (i1!==false) {
            this.generationsAncestors
                = this.parseText(sub2 [i1], Tags.ANCESTORS);
        }
        i1=this.findTag(sub2, Tags.DESCENDANTS);
        if (i1!==false) {
            this.generationsDescendants
                = this.parseText(sub2 [i1], Tags.DESCENDANTS);
        }
        i1=this.findTag(sub2, Tags.ORDINANCEFLAG);
        if (i1!==false) {
            this.ordinanceProcessFlag
                = this.parseText(sub2 [i1], Tags.ORDINANCEFLAG);
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

SubmissionRecord.prototype.toString = function () {
    var str = '(Id->' + this.id
        + ', SubmitterId->' + this.submitterId
        + ', FamilyFileName->' + this.familyFileName
        + ', TempleCode->' + this.templeCode
        + ', GenerationsAncestors->' + this.generationsAncestors
        + ', GenerationsDescendants->' + this.generationsDescendants
        + ', OrdinanceProcessFlag->' + this.ordinanceProcessFlag
        + ', AutoRecId->' + this.autoRecId
        + ', ChangeDate->' + this.changeDate
        + ', Notes->(';

    for (var i=0; i<this.notes.length; i++) {
        str += "\n" + this.notes[i];
    }
    str += '))';
    return str;
};