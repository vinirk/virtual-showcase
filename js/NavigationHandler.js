/**
 * Created by vinirk on 4/11/16.
 */

(function () {
    //"use strict";

    /**
     * Items of array
     *
     * @type {Array}
     */
    var items = [];

    /**
     * The total of pages
     *
     * @type {Array}
     */
    var pages = [];
    /**
     *
     * Each page of array
     *
     * @type {{items: Array, pageNumber: number}}
     */
    var page = {items:[], pageNumber: 0};

    /**
     * Items per page
     *
     * @type {number}
     */
    var itemsPerPage = 4;

    /**
     * Current page
     *
     * @type {number}
     */
    var currentPage = 0;

    /**
     * Total pages
     *
     * @type {number}
     */
    var totalPages = 0;

    /**
     * Initialize the Handler
     *
     * @param allItems
     */
    initializeHandler = function (allItems) {

        console.log("Initializing the Navigation handler...");

        items = allItems;

        if(items != null) {
            totalPages = Math.round(items.length/itemsPerPage);
            console.log("Total pages -> " + totalPages);
        }

        console.log("Total items -> " + items.length);

        //Create pagination
        createPagination(0,0);

        //List items per page
        listItemsPerPage();
    };

    /**
     *
     * Format all items to pagination
     *
     * @param numberPage
     * @param position
     */
    function createPagination(numberPage, position) {

        page = {items:[], pageNumber: 0};

        if (numberPage < totalPages) {

            for(var i = 0; i < itemsPerPage; i++) {
                page.items.push(items[position]);
                page.pageNumber = numberPage;
                position++;
            }

            pages.push(page);
            numberPage++;
            createPagination(numberPage, (numberPage*itemsPerPage)+1);
        }

        console.log("Created the pages -> "+ pages);
    }

    /**
     *
     * List all items for page
     * This method create dynamically all elements of recommendation items
     */
    function listItemsPerPage() {
        //Initial position
        var positionLeft = 30;

        //Call every time control navigation button
        controlNavigationButtons();

        //Clear all dom elements
        var contentDiv = document.getElementById('contentRecommendation');
        contentDiv.innerHTML = '';

        pages[currentPage].items.forEach(function(item) {

            positionLeft = positionLeft + 170;

            var recommendationDiv = document.createElement('div');
            recommendationDiv.id = 'recomendation-id';
            recommendationDiv.className = 'recommendation';
            recommendationDiv.style.paddingLeft = positionLeft.toString()+"px";
            contentDiv.appendChild(recommendationDiv);
            var referenceDiv = document.createElement('div');
            referenceDiv.className = 'item-reference';
            recommendationDiv.appendChild(referenceDiv);

            var image = document.createElement('img');
            image.className = 'item-image';
            image.src = item.getImageName();
            referenceDiv.appendChild(image);

            var name = document.createElement('span');
            name.className = 'item-name';
            name.innerHTML = item.getName();
            referenceDiv.appendChild(name);

            var oldPrice = document.createElement('span');
            oldPrice.className = 'item-old-price';
            oldPrice.innerHTML = item.getOldPrice();
            referenceDiv.appendChild(oldPrice);
            referenceDiv.appendChild(document.createElement("br"));

            var price = document.createElement('span');
            price.className = 'item-price';
            price.innerHTML = item.getPrice();
            referenceDiv.appendChild(price);
            referenceDiv.appendChild(document.createElement("br"));

            var detailUrl = document.createElement('input');
            detailUrl.type = 'hidden';
            detailUrl.value = item.getDetailUrl();
            referenceDiv.appendChild(detailUrl);

            var paymentConditions = document.createElement('span');
            paymentConditions.className = 'item-payment-condition';
            paymentConditions.innerHTML = item.getPaymentConditions();
            referenceDiv.appendChild(paymentConditions);

            //Add event listener
            recommendationDiv.addEventListener("click", function()
            {
                window.open(recommendationDiv.getElementsByTagName('input')[0].value, '_blank');

            });

        });

        console.log("All elements created. Page -> " + currentPage);

    }

    /**
     * Control the navigation button of items
     */
    function controlNavigationButtons() {

        if( currentPage ==  0) {
            document.getElementById("buttonLeft").removeEventListener("click", previousPage);
            document.getElementById("buttonRight").addEventListener("click", nextPage);
            document.getElementById("buttonLeft").classList.remove('on');
            document.getElementById("buttonRight").classList.add('on');
        } else if( currentPage + 1 == totalPages) {
            document.getElementById("buttonLeft").addEventListener("click", previousPage);
            document.getElementById("buttonRight").removeEventListener("click", nextPage);
            document.getElementById("buttonLeft").classList. add('on');
            document.getElementById("buttonRight").classList.remove('on');
        } else {
            document.getElementById("buttonLeft").addEventListener("click", previousPage);
            document.getElementById("buttonRight").addEventListener("click", nextPage);
            document.getElementById("buttonLeft").classList.add('on');
            document.getElementById("buttonRight").classList.add('on');
        }
    }

    /**
     * Previous page
     */
    function previousPage() {
        currentPage--;
        listItemsPerPage();

    }

    /**
     * Next page
     */
    function nextPage() {
        currentPage++;
        listItemsPerPage();
    }


})();

