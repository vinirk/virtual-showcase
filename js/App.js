/**
 * Created by vinirk on 4/10/16.
 */
(function () {
    //"use strict";

    /**
     * The URL to get items
     */
    const ITEMS_URL = 'http://roberval.chaordicsystems.com/challenge/challenge.json';

    /**
     * Reference Item
     */
    var referenceItem = null;

    /**
     * Items
     */
    var items = [];

    /**
     * Initialize the App
     */
    initialize = function ()
    {

        console.log("Initializing the App...");

        //load items
        listItems();

    };

    function changeReferenceItem()
    {
        console.log()
    }

    /**
     * List all items from service.
     *
     */
    listItems = function () {

        var script = document.createElement('script');
        script.src = ITEMS_URL;

        document.getElementsByTagName('head')[0].appendChild(script);
    };

    /**
     * Callback function from service
     *
     * @param data
     * @constructor
     */
    X = function(result) {
        console.log("Items loaded ->", result);

        //Add all recommendation items
        result.data.recommendation.forEach(function(item) {
            addItem(item, false);
        });

        //Add the reference item and set current reference item
        referenceItem = addItem(result.data.reference.item, true);

        console.log("Total items -> " + items.length);

        showViewedItem();

        showReconmedationItems();

    };

    /**
     * Add item to the list
     */
    addItem =  function (i, isViewed) {

        // Create a new Product object from service
        var item = new Item();
        item.setBusinessId(i.businessId)
        item.setIsViewed(isViewed);
        item.setName(i.name);
        item.setDetailUrl('http:' + i.detailUrl);
        item.setImageName('http:' + i.imageName);
        item.setPrice(i.price);
        item.setOldPrice(i.oldPrice);
        item.setPaymentConditions(i.productInfo.paymentConditions);

        //Add item to array
        items.push(item);

        console.log("Item added ->", item);

        return item;

    };


    /**
     * This function create de reference item
     */
    showViewedItem = function() {

        var contentReferenceDiv = document.getElementById('contentReference');
        contentReferenceDiv.innerHTML = '';

        var referenceDiv = document.createElement('div');
        referenceDiv.className = 'item-reference';
        contentReferenceDiv.appendChild(referenceDiv);

        var image = document.createElement('img');
        image.className = 'item-image';
        image.src = referenceItem.getImageName();
        referenceDiv.appendChild(image);

        var name = document.createElement('span');
        name.className = 'item-name';
        name.innerHTML = referenceItem.getName();
        referenceDiv.appendChild(name);

        var oldPrice = document.createElement('span');
        oldPrice.className = 'item-old-price';
        oldPrice.innerHTML = referenceItem.getOldPrice();
        referenceDiv.appendChild(oldPrice);
        referenceDiv.appendChild(document.createElement("br"));

        var price = document.createElement('span');
        price.className = 'item-price';
        price.innerHTML = referenceItem.getPrice();
        referenceDiv.appendChild(price);
        referenceDiv.appendChild(document.createElement("br"));

        var detailUrl = document.createElement('input');
        detailUrl.type = 'hidden';
        detailUrl.value = referenceItem.getDetailUrl();
        referenceDiv.appendChild(detailUrl);

        var paymentConditions = document.createElement('span');
        paymentConditions.className = 'item-payment-condition';
        paymentConditions.innerHTML = referenceItem.getPaymentConditions();
        referenceDiv.appendChild(paymentConditions);

        //Add event listener
        contentReferenceDiv.addEventListener("click", function()
        {
            window.open(contentReferenceDiv.getElementsByTagName('input')[0].value, '_blank');

        });
    };

    /**
     * This function create all recommendations items dynamic
     */
    showReconmedationItems = function() {

        initializeHandler(items);

    }


})();

