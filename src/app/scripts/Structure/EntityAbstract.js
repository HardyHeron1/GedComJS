/**
 * Created by sahaque on 4/15/2017.
 */

'use strict';

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

Function.method('inherits', function (parent) {
    this.prototype = new parent();
    var d = {},
        p = this.prototype;
    this.prototype.constructor = parent;
    this.method('uber', function uber(name) {
        if (!(name in d)) {
            d[name] = 0;
        }
        var f, r, t = d[name], v = parent.prototype;
        if (t) {
            while (t) {
                v = v.constructor.prototype;
                t -= 1;
            }
            f = v[name];
        } else {
            f = p[name];
            if (f == this[name]) {
                f = v[name];
            }
        }
        d[name] += 1;
        r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
        d[name] -= 1;
        return r;
    });
    return this;
});

function EntityAbstract() {

    this.ver = '';
}


    EntityAbstract.method('findTag', function(tree, tag, off)
    {
        if (!off) off = 0;
        if (!tree) return false;
        var regex = new RegExp('^[0-9][0-9]? .*?' + tag + "( |$)", 'u');
        for (var i = off; i < tree.length; i++) {
            if(tree[i][0]) {
                tree[i][0];
            }
            if (tree[i][0].match(regex)) {
                return i;
            }
        }
        return false;
    });

    EntityAbstract.method('parseText',function (tree, tag) {
        var tmp = tree[0].match(new RegExp('^[0-9][0-9]? .*?' + tag + ' (.*)','u'));
        var str = '';
        if (tmp && tmp.length > 0) {
            str = tmp[1];
        }
        if (str === tree[0]) {
            str = '';
        }
        return str;
    });

EntityAbstract.method('parsePtrId', function (tree, tag) {
    var tmp = tree[0].match(new RegExp('^[0-9][0-9]? ' + tag + ' @([A-Z, a-z, 0-9, :, !]*)@','u'));
    var str = '';
    if (tmp && tmp.length > 0) {
        str = tmp[1];
    }
    if (str === tree[0]) {
        str = '';
    }
    return str;
});

EntityAbstract.method('parseRefId',function (tree, tag) {
    var tmp = tree[0].match(new RegExp('^[0-9][0-9]? @([A-Z,a-z,0-9,:,!]*)@ ' + tag + '(.*?)','u'));
    var str = '';
    if (tmp && tmp.length > 0) {
        str = tmp[1];
    }
    if (str === tree[0]) {
        str = '';
    }
    return str;
});

EntityAbstract.method('parseConTag',function (tree, tag) {
    var tmp = tree[0].match(new RegExp('^[0-9][0-9]? .*?' + tag + ' (.*)', 'u'));
    var str = '';
    if (tmp && tmp.length > 0) {
        str = tmp[1];
    }
    if (tree[1]) {
        var sub2 = tree[1];
        var cnt = sub2.length;
        for (var i = 0; i < cnt; i++) {
            var tmp = sub2[i][0].match(new RegExp('^[0-9][0-9]? CONT (.*)', 'u'));
            if (tmp && tmp.length > 0) {
                str += "\n" + tmp[1];
            } else {
                tmp = sub2[i][0].match(new RegExp('^[0-9][0-9]? CONC (.*)', 'u'));
                if (tmp && tmp.length > 0) {
                    str += tmp[1];
                }
            }
        }
    }
    return str;
});

EntityAbstract.method('toConTag', function (field, maintag, main_lvl) {
        var ged_rec = '';
        // TODO don't break on a space
        var copy = field.split(/\n/);
        if (maintag !== null) {
            ged_rec += main_lvl + ' ' + maintag + ' ';
        } else {
        }
        ged_rec += copy[0].substr(0, 90);
        var lvlplus = main_lvl + 1;
        //check for CONC of first line
        if (copy[0].length > 90) {
            var rem = 90;
            var len = copy[0].length;
            while (rem < len) {
                ged_rec += "\n" + lvlplus + ' CONC ' + copy[0].substr(rem, 90);
                rem += 90;
            }
        }
        //check for CONC of each line
        //CONC before CONT since CONT contains the newline
        var cnt = copy.length;
        for (var i = 1; i < cnt; i++) {
            ged_rec += "\n" + lvlplus + ' CONT ' + copy[i].substr(0, 90);
            if (copy[i].length > 90) {
                rem = 90;
                len = copy[i].length;
                while (rem < len) {
                    ged_rec += "\n" + lvlplus + ' CONC ' + copy[i].substr(rem, 90);
                    rem += 90;
                }
            }
        }
        return ged_rec;
    });

EntityAbstract.method('toGedcom', function(lvl, ver) {
    return '';
});

EntityAbstract.method('parseTree', function (tree, ver) {
    this.ver = ver;
});