/**
 * Created by vinirk on 4/11/16.
 */

var Item = function(businessId, detailUrl, imageName, name, oldPrice, price, paymentConditions, isViewed) {

    this.businessId = businessId;
    this.detailUrl = detailUrl;
    this.imageName = imageName;
    this.name = name;
    this.oldPrice = oldPrice;
    this.price = price;
    this.paymentConditions = paymentConditions;
    this.isViewed = isViewed;

};

Item.prototype.getBusinessId = function() {
    return this.businessId;
};

Item.prototype.setBusinessId = function(businessId) {
    this.businessId = businessId;
};

Item.prototype.getDetailUrl = function() {
    return this.detailUrl;
};

Item.prototype.setDetailUrl = function(detailUrl) {
    this.detailUrl = detailUrl;
};

Item.prototype.getImageName = function() {
    return this.imageName;
};

Item.prototype.setImageName = function(imageName) {
    this.imageName = imageName;
};

Item.prototype.getName = function() {
    return this.name;
};

Item.prototype.setName = function(name) {
    this.name = name;
};

Item.prototype.getOldPrice = function() {
    return "De: " + this.oldPrice;
};

Item.prototype.setOldPrice = function(oldPrice) {
    this.oldPrice = oldPrice;
};

Item.prototype.getPrice = function() {
    return "<span style='font-size: 12px'>Por: </span> " + "<strong><span style='font-size: 16px;'>" + this.price + "</span></strong>";
};

Item.prototype.setPrice = function(price) {
    this.price = price;
};

Item.prototype.getPaymentConditions = function() {
    var result = this.paymentConditions.replace(".", ",").replace("de", "de R$");
    return "<span style='font-size: 14px;'><strong>" + result + "</strong></span>" + "<br><span style='font-size: 11px;'> sem juros</span>";
};

Item.prototype.setPaymentConditions = function(paymentConditions) {
    this.paymentConditions = paymentConditions;
};

Item.prototype.getIsViewed = function() {
    return this.isViewed;
};

Item.prototype.setIsViewed = function(isViewed) {
    this.isViewed = isViewed;
};



