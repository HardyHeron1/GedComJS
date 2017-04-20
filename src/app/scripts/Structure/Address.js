/**
 * Created by sahaque on 4/17/2017.
 */

function Address(
        address,
        addressLine1,
        addressLine2,
        addressLine3,
        city,
        state,
        postalCode,
        country,
        phone,
        email,
        FAX,
        WWW
) {
    "use strict";
    this.address = address;
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.addressLine3 = addressLine3;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
    this.country = country;
    this.phone = phone;
    this.email = email;
    this.FAX = FAX;
    this.WWW = WWW;
}

Address.inherits(EntityAbstract);

Address.method('parseTree', function (tree, ver) {
    "use strict";
    this.ver = ver;
    var i1 = this.findTag(tree, Tags.ADDR);
    if (i1 !== false) {
        this.address = this.parseConTag(tree[i1], Tags.ADDR);
        if (tree[i1][1]) {
            var sub2 = tree[i1][1];
            var i2=this.findTag(sub2, Tags.ADDR1);
            if (i2!==false) {
                this.addressLine1 = this.parseText(
                    sub2[i2], Tags.ADDR1
                );
            }
            i2=this.findTag(sub2, Tags.ADDR2);
            if (i2 !== false) {
                this.AddressLine2 = this.parseText(
                    sub2[i2], Tags.ADDR2
                );
            }
            i2=this.findTag(sub2, Tags.ADDR3);
            if (i2!==false) {
                this.addressLine3 = this.parseText(
                    sub2[i2], Tags.ADDR3
                );
            }
            i2=this.findTag(sub2, Tags.CITY);
            if (i2!==false) {
                this.city = this.parseText(sub2[i2], Tags.CITY);
            }
            i2=this.findTag(sub2, Tags.STATE);
            if (i2!==false) {
                this.state = this.parseText(sub2[i2], Tags.STATE);
            }
            i2=this.findTag(sub2, Tags.POSTAL);
            if (i2!==false) {
                this.postalCode = this.parseText(
                    sub2[i2], Tags.POSTAL
                );
            }
            i2=this.findTag(sub2, Tags.CTRY);
            if (i2!==false) {
                this.country = this.parseText(sub2[i2], Tags.CTRY);
            }
        }
    }
    i1=this.findTag(tree, Tags.PHONE);
    if (i1!==false) {
        this.phone = this.parseText(tree[i1], Tags.PHONE);
    }
    i1=this.findTag(tree, Tags.EMAIL);
    if (i1!==false) {
        this.email = this.parseText(tree[i1], Tags.EMAIL);
    }
    i1=this.findTag(tree, Tags.FAX);
    if (i1!==false) {
        this.FAX = this.parseText(tree[i1], Tags.FAX);
    }
    i1=this.findTag(tree, Tags.WWW);
    if (i1!==false) {
        this.WWW = this.parseText(tree[i1], Tags.WWW);
    }
});

Address.prototype.toString = function () {
    return '(Version->' + this.ver
        + ', Address->' + this.address
        + ', AddressLine1->' + this.addressLine1
        + ', AddressLine2->' + this.addressLine2
        + ', AddressLine3->' + this.addressLine3
        + ', City->' + this.city
        + ', State->' + this.state
        + ', PostalCode->' + this.postalCode
        + ', Country->' + this.country
        + ', Phone->' + this.phone
        + ', Email->' + this.email
        + ', FAX->' + this.FAX
        + ', WWW->' + this.WWW
        + ')';
};