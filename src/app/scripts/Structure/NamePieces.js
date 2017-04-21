/**
 * Created by sahaque on 4/18/2017.
 */

function NamePieces (prefix, given, nickname, surnamePrefix, surname, suffix) {
    "use strict";
    this.prefix = prefix;
    this.given = given;
    this.nickName = nickname;
    this.surnamePrefix = surnamePrefix;
    this.surname = surname;
    this.suffix = suffix;
    this.citations = [];
    this.notes = [];
}

NamePieces.inherits(EntityAbstract);

NamePieces.method('parseTree', function(tree, ver) {
    "use strict";
    this.ver =ver;
    var i1=this.findTag(tree, Tags.PREFIX);
    if (i1!==false) {
        this.prefix = this.parseText(tree[i1], Tags.PREFIX);
    }
    i1=this.findTag(tree, Tags.GIVEN);
    if (i1!==false) {
        this.given = this.parseText(tree[i1], Tags.GIVEN);
    }
    i1=this.findTag(tree, Tags.NICK);
    if (i1!==false) {
        this.nickName = this.parseText(tree[i1], Tags.NICK);
    }
    i1=this.findTag(tree, Tags.SURPREFIX);
    if (i1!==false) {
        this.surnamePrefix = this.parseText(tree[i1], Tags.SURPREFIX);
    }
    i1=this.findTag(tree, Tags.SURNAME);
    if (i1!==false) {
        this.surname = this.parseText(tree[i1], Tags.SURNAME);
    }
    i1=this.findTag(tree, Tags.SUFFIX);
    if (i1!==false) {
        this.suffix = this.parseText(tree[i1], Tags.SUFFIX);
    }

    var off = 0;
    i1=this.findTag(tree, Tags.NOTE, off);
    while (i1!==false) {
        var tmp = new Note();
        this.notes.push(tmp.parseTree([tree[i1]], ver));
        off = i1 + 1;
        i1=this.findTag(tree, Tags.NOTE, off);
    }

    off = 0;
    i1=this.findTag(tree, Tags.CITE, off);
    while (i1!==false) {
        tmp = new Citation();
        this.citations.push(tmp.parseTree([tree[i1]], ver));
        off = i1 + 1;
        i1=this.findTag(tree, Tags.CITE, off);
    }
});

NamePieces.method('toGedcom', function(lvl, ver) {
    "use strict";
    if (!ver || ver === '') {
        ver = this.ver;
    }
    var gedRec = '';
    if (ver.indexOf('5.5.1') === 0) {
        if (this.prefix && this.prefix !== '') {
            gedRec += lvl + ' ' + Tags.PREFIX + ' ' + this.prefix;
        }

        if (this.given && this.given !== '') {
            if (gedRec !== '') {
                gedRec += "\n";
            }
            gedRec += lvl + ' ' + Tags.GIVEN + ' ' +  this.given;
        }
        if (this.nickName && this.nickName !== '') {
            if (gedRec !== '') {
                gedRec += "\n";
            }
            gedRec += lvl + ' ' + Tags.NICK + ' ' +  this.nickName;
        }
        if (this.surnamePrefix && this.surnamePrefix !== '') {
            if (gedRec !== '') {
                gedRec += "\n";
            }
            gedRec += lvl + ' ' + Tags.SURPREFIX
                + ' ' +  this.surnamePrefix;
        }
        if (this.surname && this.surname !== '') {
            if (gedRec !== '') {
                gedRec += "\n";
            }
            gedRec += lvl + ' ' + Tags.SURNAME + ' ' +  this.surname;
        }
        if (this.suffix && this.suffix !== '') {
            if (gedRec !== '') {
                gedRec += "\n";
            }
            gedRec += lvl + ' ' + Tags.SUFFIX + ' ' +  this.suffix;
        }
        for (var i=0; i<this.citations.length; i++) {
            gedRec += "\n" + this.citations[i].toGedcom(lvl, ver);
        }
        for (i=0; i<this.notes.length; i++) {
            gedRec += "\n" + this.notes[i].toGedcom(lvl, ver);
        }
    }
    return gedRec;
});

NamePieces.prototype.toString = function () {
    "use strict";
    var str = '(Version->' + this.ver
        + ', Prefix->' + this.prefix
        + ', Given->' + this.given
        + ', NickName->' + this.nickName
        + ', SurnamePrefix->' + this.surnamePrefix
        + ', Surname->' + this.surname
        + ', Suffix->' + this.suffix;

    for (var i=0; i<this.citations.length; i++) {
        str += "\n" + this.citations[i];
    }

    for (i=0; i<this.notes; i++) {
        str += "\n" + this.notes[i];
    }

    str += ')';
    return str;
};