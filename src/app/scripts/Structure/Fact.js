/**
 * Created by sahaque on 4/19/2017.
 */


function Fact() {
    "use strict";
    this.TYPES = {
            'CAST' : 'Caste',
        'EDUC' : 'Education',
        'NATI' : 'Nationality',
        'OCCU' : 'Occupation',
        'PROP' : 'Possessions',
        'RELI' : 'Religion',
        'RESI' : 'Residence',
        'TITL' : 'NobilityTitle',
        'SSN'  : 'Social Security Nbr',
        'FACT' : 'Fact'
    };
}

Fact.inherits(FactDetail);

Fact.method('parseTreeToArray', function (tree, ver) {
    var facts = [];
    var keys = Object.keys(this.TYPES);
    for (var i=0;i<keys.length;i++) {
        var tag = keys[i];
        var off = 0;
        var i1=this.findTag(tree, tag, off);
        while (i1!==false) {
            var fact = new Fact();
            fact.ver = ver;
            fact.tag = tag;
            fact.descr = this.parseText(tree[i1], tag);
            //$tmp = $fact->_TYPES;
            //$fact->Type = $tmp[$tag];
            if(tree[i1][1])
                fact.parseTreeDetail(tree[i1][1], ver);
            facts.push(fact);
            off = i1 + 1;
            i1=this.findTag(tree, tag, off);
        }
    }
    return facts;
});