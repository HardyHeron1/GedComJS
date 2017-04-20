/**
 * Created by sahaque on 4/18/2017.
 */


function CharacterSet(characterSet, verNbr) {
    "use strict";
    this.characterSet = characterSet;
    this.verNbr = verNbr;
}

CharacterSet.inherits(EntityAbstract);

CharacterSet.method('parseTree', function(tree, ver) {
    "use strict";
    this.ver = ver;
    var i1 = this.findTag(tree, Tags.CHAR);
    if (i1 !== false) {
        this.characterSet = this.parseText(tree [i1], Tags.CHAR);
    }
    if (tree [i1] [1]) {
        var sub2 = tree [i1] [1];
        var i2 = this.findTag(sub2, Tags.VERSION);
        if (i2 !== false) {
            this.verNbr = this.parseText(sub2 [i2], Tags.VERSION);
        }
    }
});

CharacterSet.prototype.toString = function () {
    "use strict";
    return  '(CharacterSet->' + this.characterSet
        + ', VerNbr->' + this.verNbr + ')';
};