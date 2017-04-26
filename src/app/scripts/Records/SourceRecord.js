/**
 * Created by sahaque on 4/26/2017.
 */
function SourceRecord(id,title, author,abbreviatedTitle,publicationFacts,text, autoRecId) {
    "use strict";
    this.id = id;
    this.sourceData = [];
    this.author = author;
    this.title = title;
    this.abbreviatedTitle = abbreviatedTitle;
    this.publicationFacts = publicationFacts;
    this.text = text;
    this.repositoryCitations = [];
    this.mediaLinks = [];
    this.notes = [];
    this.userRefNbrs = [];
    this.autoRecId = autoRecId;
    this.changeDate = new ChangeDate();
}

SourceRecord.inherits(EntityAbstract);

SourceRecord.method('toGedcom', function(lvl, ver) {
    "use strict";
    var gedRec = '';
    if (!ver) {
        ver = this.ver;
    }

    if (ver.indexOf('5.5.1') === 0) {
        gedRec = lvl + ' @' + this.id + '@ ' + Tags.SOURCE;
        var lvl2 = lvl + 1;

        for (var i=0; i<this.sourceData.length; i++) {
            gedRec += "\n" + this.sourceData[i].toGedcom(lvl2, ver);
        }
        if (this.author) {
            gedRec += "\n"
                + this.toConTag(this.author, Tags.AUTHOR, lvl2);
        }
        if (this.title) {
            gedRec += "\n"
                + this.toConTag(this.title, Tags.TITLE, lvl2);
        }
        if (this.abbreviatedTitle) {
            gedRec += "\n"
                + this.toConTag(this.abbreviatedTitle, Tags.ABBR, lvl2);
        }
        if (this.publicationFacts) {
            gedRec += "\n"
                + this.toConTag(
                this.publicationFacts, Tags.PUBLICATION, lvl2
            );
        }
        if (this.text) {
            gedRec += "\n"
                + this.toConTag(this.text, Tags.TEXT, lvl2);
        }
        for (i=0; i<this.repositoryCitations.length; i++) {
            gedRec += "\n"
                    + this.repositoryCitations[i].toGedcom(lvl2, ver);
        }
        for (i=0; i<this.userRefNbrs.length; i++) {
            gedRec += "\n" + lvl2
                + ' ' + Tags.USERFILE
                + ' ' + this.userRefNbrs[i]['Nbr'];
            if (this.userRefNbrs[i]['Type']) {
                gedRec += "\n" +(lvl2+1)
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
        for (i=0; i<this.mediaLinks.length; i++) {
            gedRec += "\n" + this.mediaLinks[i].toGedcom(lvl2, ver);
        }
    }
    return gedRec;
});

SourceRecord.method('parseTree', function(tree, ver){
    "use strict";
    this.id = this.parseRefId(tree[0], Tags.SOURCE);
    if (tree[0][1]) {
        var sub2 = tree[0][1];

        var off = 0;
        var i1=this.findTag(sub2, Tags.DATA, off);
        while (i1!==false) {
            var tmp = new SourceData();
            tmp.parseTree([sub2[i1]], ver);
            this.sourceData.push(tmp);
            off = i1 + 1;
            i1=this.findTag(sub2, Tags.DATA, off);
        }
        i1=this.findTag(sub2, Tags.AUTHOR);
        if (i1!==false) {
            this.author
                = this.parseConTag(sub2 [i1], Tags.AUTHOR);
        }
        i1=this.findTag(sub2, Tags.TITLE);
        if (i1!==false) {
            this.title
                = this.parseConTag(sub2 [i1], Tags.TITLE);
        }
        i1=this.findTag(sub2, Tags.ABBR);
        if (i1!==false) {
            this.abbreviatedTitle
                = this.parseConTag(sub2 [i1], Tags.ABBR);
        }
        i1=this.findTag(sub2, Tags.PUBLICATION);
        if (i1!==false) {
            this.publicationFacts
                = this.parseConTag(sub2 [i1], Tags.PUBLICATION);
        }
        i1=this.findTag(sub2, Tags.TEXT);
        if (i1!==false) {
            this.text = this.parseConTag(sub2 [i1], Tags.TEXT);
        }
        off = 0;
        i1=this.findTag(sub2, Tags.REPOSITORY, off);
        while (i1!==false) {
            tmp = new RepositoryCitation();
            tmp.parseTree([sub2[i1]], ver);
            this.repositoryCitations.push(tmp);
            off = i1 + 1;
            i1=this.findTag(sub2, Tags.REPOSITORY, off);
        }
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

        off = 0;
        i1=this.findTag(sub2, Tags.MEDIA, off);
        while (i1!==false) {
            tmp = new MediaLink();
            tmp.parseTree([sub2[i1]], ver);
            this.mediaLinks.push(tmp);
            off = i1 + 1;
            i1=this.findTag(sub2, Tags.MEDIA, off);
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

SourceRecord.prototype.toString = function() {
    "use strict";
    var str = '(Id->' + this.id
        + ', Author->' + this.author
        + ', Title->' + this.title
        + ', AbbreviatedTitle->' + this.abbreviatedTitle
        + ', PublicationFacts->' + this.publicationFacts
        + ', Text->' + this.text
        + ', SourceData->('
    ;
    for (var i=0; i<this.sourceData.length; i++) {
        str += "\n" + this.sourceData[i];
    }
    str += '), SourceRepositoryCitations->(';
    for (i=0; i<this.repositoryCitations.length; i++) {
        str += "\n" + this.repositoryCitations[i];
    }
    str += '), UserRefNbrs->(';
    for (i=0; i<this.userRefNbrs.length; i++) {
        str += "UserRefNbr->"
                + this.userRefNbrs[i]['Nbr']
                + ' (' + this.userRefNbrs[i]['Type'] + ')';
    }
    str += '), AutoRecId->' + this.autoRecId
            + ', ChangeDate->' + this.changeDate
        + ', MediaLinks->(';

    for (i=0; i<this.mediaLinks.length; i++) {
        str += "\n" + this.mediaLinks[i];
    }
    str += '), Notes->(' ;
    for (i=0; i<this.notes.length; i++) {
        str += "\n" + this.notes[i];
    }
    str += '))';
    return str;
};