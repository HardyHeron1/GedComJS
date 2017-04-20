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

Note.prototype.toString = function () {
    var str =  '(Version->' + this.ver;
    if(this.id && this.id !== '')
        str += ', Id->' + this.id;
    else
        str += ', Text->' + this.text;
    str += ')';
    return str;
};