/**
 * Created by sahaque on 4/19/2017.
 */

function SourceData(responsibleAgency) {
    "use strict";
    this.responsibleAgency = responsibleAgency;
    this.recordedEvents = [];
    this.notes = [];
}

SourceData.inherits(EntityAbstract);

SourceData.method('parseTree', function (tree, ver) {
    "use strict";
    this.ver =ver;
    var i1=this.findTag(tree, Tags.DATA);
    if (i1!==false) {
        var sub2 = tree[i1][1];
        var off = 0;
        var i2=this.findTag(sub2, Tags.EVENT, off);
        while (i2!==false) {
            var event = {'Types':'', 'Date':'', 'Jurisdiction':''};
            event['Types'] = this.parseText(sub2[i2], Tags.EVENT);
            var sub2Sub = sub2[i2][1];
            var i3=this.findTag(sub2Sub, Tags.DATE);
            if (i3!==false) {
                event['Date']
                    = this.parseText(sub2Sub[i3], Tags.DATE);
            }
            i3=this.findTag(sub2Sub, Tags.PLACE);
            if (i3!==false) {
                event['Jurisdiction']
                    = this.parseText(sub2Sub[i3], Tags.PLACE);
            }
            this.recordedEvents.push(event);
            off = i2 + 1;
            i2=this.findTag(sub2, Tags.EVENT, off);
        }
        i2=this.findTag(sub2, Tags.AGENCY);
        if (i2!==false) {
            this.responsibleAgency
                = this.parseText(sub2[i2], Tags.AGENCY);
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

SourceData.prototype.toString = function() {
    "use strict";
    var str = '(RecordedEvents->(';
    for (var i=0; i<this.recordedEvents.length; i++) {
        if (i > 0) {
            str += ', ';
        }
        str += "RecordedEvent->" + this.recordedEvents[i]['Types'] + ' '
            +  this.recordedEvents[i]['Date']
            + ' (' + this.recordedEvents[i]['Jurisdiction'] + ')';
    }
    str += '), ResponsibleAgency->' + this.responsibleAgency
            + ', Notes->(';
    for (i=0; i<this.notes.length; i++) {
        str += "\n" + this.notes[i];
    }

    str += '))';

    return str;
};