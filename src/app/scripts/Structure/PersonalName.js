/**
 * Created by sahaque on 4/18/2017.
 */


function PersonalName() {
    "use strict";
    this.name = new Name();
    this.phoneticNames = [];
    this.romanizedNames = [];
}


PersonalName.inherits(EntityAbstract);

PersonalName.method('parseTree', function (tree, ver) {
    "use strict";
    this.ver =ver;
    this.name.parseTree(tree, ver);
    if (tree[0][1]) {
        var sub2 = tree[0][1];
        var off = 0;
        var i1=this.findTag(sub2, Tags.PHONETIC, off);
        while (i1!==false) {
            var tmp_name = new Name();
            tmp_name.parseTree([sub2[i1]], ver);
            this.phoneticNames.push(tmp_name);
            off = i1 + 1;
            i1=this.findTag(sub2, Tags.PHONETIC, off);
        }
        off = 0;
        i1=this.findTag(sub2, Tags.ROMANIZED, off);
        while (i1!==false) {
            tmp_name = new Name();
            tmp_name.parseTree([sub2[i1]], ver);
            this.romanizedNames.push(tmp_name);
            off = i1 + 1;
            i1=this.findTag(sub2, Tags.ROMANIZED, off);
        }
    }
});

PersonalName.method('toGedcom',function (lvl,ver){
    if (!ver || ver === '') {
        ver = this.ver;
    }
    var gedRec = '';
    if (ver.indexOf ('5.5.1') === 0) {
        if (this.name && this.name !== '') {
            gedRec += this.name.toGedcom(lvl, ver);
        }
        var lvl2 = lvl + 1;
        for (var i=0; i<this.phoneticNames.length; i++) {
            gedRec += "\n" + this.phoneticNames[i].toGedcom(lvl2, ver);
        }
        for (i=0; i<this.romanizedNames.length; i++) {
            gedRec += "\n" + this.romanizedNames[i].toGedcom(lvl2, ver);
        }
    }
    return gedRec;
});



PersonalName.prototype.toString = function() {
    "use strict";
    var str = '(Version->' + this.ver
        + ', Name->' + this.name;
    for (var i=0; i<this.phoneticNames.length; i++) {
        str += "\n" + this.phoneticNames[i];
    }
    for (i=0; i<this.romanizedNames.length; i++) {
        str += "\n" + this.romanizedNames[i];
    }
    str += ')';

    return str;
};