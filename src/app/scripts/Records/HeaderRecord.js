/**
 * Created by faiz on 4/25/2017.
 */

function HeaderRecord(destinationSystem,transmissionDateTime,submitterId,submissionId,filename,copyright,placeForm,language) {
    "use strict";
    this.sourceSystem = new SourceSystem();
    this.destinationSystem = destinationSystem;
    this.transmissionDateTime = transmissionDateTime;
    this.submitterId = submitterId;
    this.submissionId = submissionId;
    this.filename = filename;
    this.copyright = copyright;
    this.language = language;
    this.characterSet = new CharacterSet();
    this.gedC = new GedC();
    this.placeForm = placeForm;
    this.note = new Note();
}

HeaderRecord.inherits(EntityAbstract);

HeaderRecord.method('toGedcom',function (lvl,ver) {
   var gedRec = lvl + ' ' + Tags.HEADER;
   var lvl2 = lvl + 1;
    var str1 = this.sourceSystem.toGedcom(lvl2,null);
    if (str1)
        gedRec += "\n" + this.sourceSystem.toGedcom(lvl2,null);

    if (this.destinationSystem) {
        gedRec += "\n" + lvl2
            + ' '+  Tags.DEST + ' ' + this.destinationSystem;
    }
    if (this.transmissionDateTime) {
       var d = this.transmissionDateTime.split(' ');
        gedRec += "\n" + lvl2 + ' ' + Tags.DATE + ' ' + d[0];
        if (d[1]) {
            gedRec += "\n" + lvl2 + ' ' + Tags.TIME + ' ' + d[1];
        }
    }
    if (this.submitterId) {
        gedRec += "\n" + lvl2
            + ' ' + Tags.SUBMITTER + ' @' + this.submitterId + '@';
    }

    if (this.submissionId) {
        gedRec += "\n" + lvl2
            + ' ' + Tags.SUBMISSION + ' @' + this.submissionId + '@';
    }
    if (this.filename) {
        gedRec += "\n" + lvl2 + ' ' + Tags.FILE + ' ' + this.filename;
    }
    if (this.copyright) {
        gedRec += "\n" + lvl2 + ' ' + Tags.COPYRIGHT + ' ' + this.copyright;
    }
    var str = this.gedC.toGedcom(lvl2, null);
    if (str && str.indexOf(Tags.VERSION) !== -1) {
        gedRec += "\n" + str;
    }
    str = this.characterSet.toGedcom(lvl2, null);
    if (str && str !=='') {
        gedRec += "\n" + str;
    }
    if (this.language) {
        gedRec += "\n" + lvl2 + ' ' + Tags.LANGUAGE + ' ' + this.language;
    }
    if (this.placeForm) {
        gedRec += "\n" + lvl2 + ' ' + Tags.PLACE
            + "\n" + (lvl2+1) + ' ' + Tags.FORM + ' ' + this.placeForm;
    }var str2 = '';
    if (this.note)
        str2 = this.note.toGedcom(lvl2, null);
    if (str2) {
        gedRec += "\n" + str2;
    }

    return gedRec;
});

HeaderRecord.method('parseTree',function (tree,ver) {
    if (tree[0][1]) {
       var sub2 = tree[0][1];
        this.sourceSystem.parseTree(sub2,ver);
        var i1 = this.findTag(sub2,Tags.DEST);
        if (i1!==false) {
            this.destinationSystem
                = this.parseText(sub2 [i1], Tags.DEST);
        }
        i1 = this.findTag(sub2,Tags.DATE);
        if (i1!==false) {
            this.transmissionDateTime
                = this.parseText(sub2 [i1], Tags.DATE);
            if (sub2[i1][1]) {
                var i2 = this.findTag(sub2[i1][1],Tags.TIME);
                if (i2 !== false) {
                    this.transmissionDateTime += ' '
                        + this.parseText(sub2 [i1][1][i2], Tags.TIME);
                }
            }
        }
        i1 = this.findTag(sub2,Tags.FILE);
        if (i1!==false) {
            this.filename
                = this.parseText(sub2 [i1], Tags.FILE);
        }
        i1 = this.findTag(sub2,Tags.COPYRIGHT);
        if (i1!==false) {
            this.copyright
                = this.parseText(sub2 [i1], Tags.COPYRIGHT);
        }
        i1 = this.findTag(sub2,Tags.LANGUAGE);
        if (i1!==false) {
            this.language
                = this.parseText(sub2 [i1], Tags.LANGUAGE);
        }
        i1 = this.findTag(sub2,Tags.SUBMITTER);
        if (i1!==false) {
            this.submitterId
                = this.parsePtrId(sub2 [i1], Tags.SUBMITTER);
        }
        i1 = this.findTag(sub2,Tags.SUBMISSION);
        if (i1!==false) {
            this.submissionId
                = this.parsePtrId(sub2 [i1], Tags.SUBMISSION);
        }
        this.characterSet.parseTree(sub2, ver);
        this.gedC.parseTree(sub2, ver);
        this.note.parseTree(sub2, ver);

        i1 = this.findTag(sub2,Tags.PLACE);
        if (i1!==false) {
            if (sub2[i1][1]) {
                i2 = this.findTag(sub2,Tags.FORM);
                if (i2!== false) {
                    this.placeForm
                        = this.parseText(sub2 [i1][1][i2], Tags.FORM);
                }
            }
        }
    }
});

HeaderRecord.prototype.toString = function () {
     return '(SourceSystem->' + this.sourceSystem
        + ', DestinationSystem->' + this.destinationSystem
        + ', TransmissionDateTime->' + this.transmissionDateTime
        + ', SubmitterId->' + this.submitterId
        + ', SubmissionId->' + this.submissionId
        + ', Filename->' + this.filename
        + ', Copyright->' + this.copyright
        + ', Language->' + this.language
        + ', CharacterSet->' + this.characterSet
        + ', GedC->' + this.gedC
        + ', PlaceForm->' + this.placeForm
        + ', Note->' + this.note
        + ')';
};

