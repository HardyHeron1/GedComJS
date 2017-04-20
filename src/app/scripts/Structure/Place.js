/**
 * Created by sahaque on 4/18/2017.
 */


function Place (name, placeForm) {
    "use strict";
    this.name = name;
    this.placeForm = placeForm;
    this.coordinates = {'Latitude': '',
        'Longitude': ''};
    this.phoneticNames = [];
    this.romanizedNames = [];
    this.notes = [];

}

Place.inherits(EntityAbstract);

Place.method('parseTree', function (tree, ver) {
    "use strict";
    this.ver =ver;
    var i1=this.findTag(tree, Tags.PLACE);
    if (i1!==false) {
        this.name = this.parseText(tree[i1], Tags.PLACE);
        if (tree[i1][1]) {
            var sub2 = tree[i1][1];
            var i2=this.findTag(sub2, Tags.FORM);
            if (i2!==false) {
                this.placeForm = this.parseText(sub2[i2], Tags.FORM);
            }
            i2=this.findTag(sub2, Tags.MAP);
            if (i2!==false) {
                var sub3 = sub2[i2][1];
                var i3=this.findTag(sub3, Tags.LATITUDE);
                if (i3!==false) {
                    this.coordinates['Latitude']
                        = this.parseText(sub3[i3], Tags.LATITUDE);

                }
                i3=this.findTag(sub3, Tags.LONGITUDE);
                if (i3!==false) {
                    this.coordinates['Longitude']
                        = this.parseText(sub3[i3], Tags.LONGITUDE);
                }
            }
            var off = 0;
            i1=this.findTag(sub2, Tags.PHONETIC, off);
            while (i1!==false) {
                var name = new Name();
                name.parseTree([sub2[i1]], ver);
                this.phoneticNames.push(name);
                off = i1 + 1;
                i1=this.findTag(sub2, Tags.PHONETIC, off);
            }
            off = 0;
            i1=this.findTag(sub2, Tags.ROMANIZED, off);
            while (i1!==false) {
                name = new Name();
                name.parseTree([sub2[i1]], ver);
                this.romanizedNames.push(name);
                off = i1 + 1;
                i1=this.findTag(sub2, Tags.ROMANIZED, off);
            }
            off = 0;
            i1=this.findTag(sub2, Tags.NOTE, off);
            while (i1!==false) {
                var tmp = new Note();
                tmp.parseTree([sub2[i1]], ver);
                this.notes.push(tmp);
                off = i1 + 1;
                i1=this.findTag(sub2, Tags.NOTE, off);
            }
        }
    }

});

Place.prototype.toString = function () {
    var str = '(Version->' + this.ver
        + ', Name->' + this.name
        + ', PlaceForm->' + this.placeForm
        + ', Coordinates->' + this.coordinates['Latitude']
        + ' by ' + this.coordinates['Longitude'];
    for (var i=0; i<this.phoneticNames.length; i++) {
        str += "\n" . this.phoneticNames[i];
    }
    for (i=0; i<this.romanizedNames.length; i++) {
        str += "\n" + this.romanizedNames[i];
    }
    for (i=0; i<this.notes.length; i++) {
        str += "\n" + this.notes[i];
    }
    str += ')';
    return str;
};