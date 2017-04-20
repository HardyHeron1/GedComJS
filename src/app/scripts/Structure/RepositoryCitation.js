/**
 * Created by sahaque on 4/18/2017.
 */

function RepositoryCitation(repositoryId) {
    this.repositoryId = repositoryId;
    this.callNbrs = [];
    this.notes = [];
}

RepositoryCitation.inherits(EntityAbstract);

RepositoryCitation.method('parseTree', function (tree, ver) {
    this.ver =ver;
    var i1=this.findTag(tree, Tags.REPOSITORY);
    if (i1!==false) {
        this.repositoryId = this.parsePtrId(tree[i1], Tags.REPOSITORY);
        var sub2 = tree[i1][1];

        var off = 0;
        var idx = 0;
        var i2=this.findTag(sub2, Tags.CALLNBR, off);
        while (i2!==false) {
            this.callNbrs[idx] ={'Nbr': this.parseText(sub2 [i2], Tags.CALLNBR)};
            if (sub2 [i2][1]) {
                var i3=this.findTag(sub2 [i2][1], Tags.MEDIATYPE);
                if (i3!==false
                ) {
                    this.callNbrs[idx] = {'Media': this.parseText(
                        sub2 [i2][1][i3], Tags.MEDIATYPE)
                    };
                }
            }
            off = i2 + 1;
            idx++;
            i2=this.findTag(sub2, Tags.CALLNBR, off);
        }

        off = 0;
        i2=this.findTag(sub2, Tags.NOTE, off);
        while (i2!==false) {
            var tmp = new Note();
            tmp.parseTree([sub2[i2]], ver);
            this.notes.push(tmp);
            off = i2 + 1;
            i2=this.findTag(sub2, Tags.NOTE, off);
        }
    }
});

RepositoryCitation.prototype.toString = function () {
    var str = '(RepositoryId->' + this.repositoryId
        + ', Notes->(';

    for (var i=0; i<this.notes.length; i++) {
        str += "\n" + this.notes[i];
    }
    str += '), CallNbrs->(';

    for (i=0; i<this.callNbrs.length; i++) {
        if (i > 0) {
            str += ', ';
        }
        str += "(" + this.callNbrs[i]['Nbr']
                + ", " + this.callNbrs[i]['Media'] + ')';
    }

    str += '))';

    return str;
};