/**
 * Created by sahaque on 4/19/2017.
 */

function Event () {
    "use strict";
    this._TYPES = {
        'ADOP' : 'Adoption',
        'BIRT' : 'Birth',
        'BAPM' : 'Baptism',
        'BARM' : 'Bar Mitzvah',
        'BASM' : 'Bas Mitzvah',
        'BLES' : 'Blessing',
        'BURI' : 'Burial',
        'CENS' : 'Census',
        'CHR' : 'Christening',
        'CHRA' : 'Adult Christening',
        'CONF' : 'Confirmation',
        'CREM' : 'Cremation',
        'DEAT' : 'Death',
        'EMIG' : 'Emmigration',
        'FCOM' : 'First Communion',
        'GRAD' : 'Graduation',
        'IMMI' : 'Immigration',
        'NATU' : 'Naturalization',
        'ORDN' : 'Ordnance',
        'RETI' : 'Retirement',
        'PROB' : 'Probate',
        'WILL' : 'Will',
        'ANUL' : 'Annulment',
        'DIV' : 'Divorce',
        'DIVF' : 'Divorce Filed',
        'ENG' : 'Engagement',
        'MARB' : 'Marriage Bann',
        'MARC' : 'Marriage Constract',
        'MARR' : 'Marriage',
        'MARL' : 'Marriage License',
        'MARS' : 'Marriage Settlement',
        'RESI' : 'Residence',
        'EVEN' : 'Event'
    };
}

Event.inherits(FactDetail);

Event.method('parseTreeToArray', function(tree, ver) {
    "use strict";
    var events = [];
    var keys = Object.keys(this._TYPES);
    for (var i=0;i<keys.length;i++) {
        var tag = keys[i];
        var off = 0;
        var i1=this.findTag(tree, tag, off);
        while (i1!==false) {
            var event = new Event();
            event.ver =ver;
            event.tag = tag;
            event.descr = this.parseText(tree[i1], tag);
            //$tmp = $this->_TYPES;
            //event->Type = $tmp[$tag];
            if(tree[i1][1])
                event.parseTreeDetail(tree[i1][1], ver);
            events.push(event);
            off = i1 + 1;
            i1=this.findTag(tree, tag, off);
        }
    }
    return events;
});