/**
 * Created by sahaque on 4/16/2017.
 */
"use strict";

function Note(id, text) {
    this.id = id;
    this.text = text;
}

Note.inherits(EntityAbstract);

Note.method('parseTree', function (tree, ver) {
    this.ver =ver;
    var i1=this.findTag(tree, Tags.NOTE);
    if (i1!== false) {
        var str = this.parsePtrId(tree[i1], Tags.NOTE);
        if (typeof str !== 'undefined' && str !== '') {
            this.id = str;
        } else {
            this.text = this.parseConTag(tree[i1], Tags.NOTE);
        }
    }
});

Note.method('toGedcom', function (lvl, ver) {
    if (!ver || ver === '') {
        ver = this.ver;
    }
    var gedRec = '';
    if (ver.indexOf('5.5.1') === 0) {
        if (this.id && this.id !== '') {
            gedRec += lvl + ' ' + Tags.NOTE + ' @' + this.id + '@';
        } else if (this.text && this.text !== '') {
            gedRec += this.toConTag(this.text, Tags.NOTE, lvl);
        }
    }
    return gedRec;
});

Note.prototype.toString = function () {
    var str =  '(Version->' + this.ver;
    if(this.id && this.id !== '')
        str += ', Id->' + this.id;
    else
        str += ', Text->' + this.text;
    str += ')';
    return str;
};