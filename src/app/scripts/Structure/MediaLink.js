/**
 * Created by sahaque on 4/18/2017.
 */
function MediaLink(id, title) {
    "use strict";
    this.id = id;
    this.title = title;
    this.mediaFiles = [];
}

MediaLink.inherits(EntityAbstract);

MediaLink.method('parseTree', function (tree, ver) {
    "use strict";
    this.ver =ver;
    var i1=this.findTag(tree, Tags.MEDIA);
    if (i1!==false) {
        var str = this.parsePtrId(tree[i1], Tags.MEDIA);
        if (str && str !== '') {
            this.id = str;
        } else {
            var sub2 = tree[i1][1];
            var i2=this.findTag(sub2, Tags.TITLE);
            if (i2!==false) {
                this.title = this.parseText(sub2[i2], Tags.TITLE);
            }
            var off = 0;
            i1 = this.findTag(sub2, Tags.FILE, off);
            while (i1!==false) {
                var tmp = new MediaFile();
                tmp.parseTree([sub2[i1]], ver);
                this.mediaFiles.push(tmp);
                off = i1 + 1;
                i1 = this.findTag(sub2, Tags.FILE, off);
            }
        }
    }
});

MediaLink.method('toGedcom', function (lvl, ver) {
    "use strict";
    if (!ver || ver === '') {
        ver = this.ver;
    }
    var gedRec = '';
    if (ver.indexOf('5.5.1') === 0) {
        if (this.id && this.id !== '') {
            gedRec += lvl + ' ' + Tags.MEDIA + ' @' + this.id + '@';
        } else {
            gedRec += lvl + ' ' + Tags.MEDIA;
            var lvl2 = lvl + 1;
            if (this.title && this.title !== '') {
                gedRec += "\n" + lvl2 + ' ' + Tags.TITLE + ' ' + this.title;
            }
            for (var i=0; i<this.mediaFiles.length; i++) {
                gedRec += "\n" + this.mediaFiles[i].toGedcom(lvl2, ver);
            }
        }
    }
    return gedRec;
});

MediaLink.prototype.toString = function () {
    "use strict";
    var str = '(Version->' + this.ver;
    if ((this.id) && this.id !== '') {
        str += ', Id->' + this.id;
    } else {
        str += ', Title->' + this.title
                + ', MediaFiles->(';
        for (var i=0; i<this.mediaFiles.length; i++) {
            str += "\n" + this.mediaFiles[i];
        }
        str += ')';
    }
    str += ')';

    return str;
};