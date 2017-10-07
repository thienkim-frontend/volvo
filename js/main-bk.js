jQuery(document).ready(function ($) {
    var slider, windowWidth = $(window).width();
    if(windowWidth < 768){
        $("#volvo-main-menu .current-menu-item.menu-item-has-children > a").addClass('is-active');

        $('.volvo-footer-content .volvo-title').click(function() {
            $(this).closest('.col-sm-3').siblings().find('.volvo-title').removeClass('is-active').next().slideUp(250);
            $(this).toggleClass("is-active").next().slideToggle();
            return false;
        });
    }
    var widthSlider = $(".volvo-instagram-innner").width();
    var obxSettings = {
        pager: false,
        auto: true,
        controls: false,
        minSlides: 4,
        maxSlides: 6,
        slideMargin: 10,
        slideWidth: 190
    };
    // obxSettings.minSlides = windowWidth > 480 ? 6 : 2;
    // obxSettings.slideWidth = windowWidth > 480 ? (widthSlider / 6) : (widthSlider / 2);
    // obxSettings.slideMargin = windowWidth > 767 ? 30 : 15;
    slider = $('.instagram-pics').bxSlider(obxSettings);

    $('.volvo-bxslider').bxSlider({
        pager: true,
        auto: true,
        controls: false,
    });
    //Show hover menus

    var tmrMenu;
    $("#volvo-main-menu li.new-column").hover(function () {
        $('#volvo-menu-products').addClass('is-open');
    }, function () {
        tmrMenu = setTimeout(function() {
            $('#volvo-menu-products').removeClass("is-open");
        }, 300);
    });
    $("#volvo-menu-products").hover(function () {
        clearTimeout(tmrMenu);
        $("li.new-column").addClass('menu-active');
    }, function () {
        $(this).removeClass("is-open");
        $("li.new-column").removeClass('menu-active');
    });

    $('#map_sidebar').bind("contentchanged", function () {
        var i = 0;
        var html_content = '';
        $('.dealers-content-bottom').hide();
        $('.dealers-content-results').html('');
        //lik_data_locations_map = markerListNatural; slp_core.js line 482
        //console.log( lik_data_locations_map[0].description );
        for (i = 0; i < lik_data_locations_map.length; i++) {
            html_content +=
                    '<div class="dealer-result-detail row">' +
                    '<div class="col-md-4">' +
                    '<h3>' + lik_data_locations_map[i].name + '</h3>' +
                    '<p>' + lik_data_locations_map[i].hours + '</p>' +
                    '</div>' +
                    '<div class="col-md-4">' +
                    '<h3>&nbsp;</h3>' +
                    '<p><strong>Telefon :</strong> ' + lik_data_locations_map[i].phone + '</p>' +
                    '<p><strong>Adress :</strong> ' + lik_data_locations_map[i].address + ' ' + lik_data_locations_map[i].city + ' ,' + lik_data_locations_map[i].zip + ' ' + lik_data_locations_map[i].country + '</p>' +
                    '<p><strong>e-mail :</strong> ' + lik_data_locations_map[i].email + '</p>' +
                    '<p><strong>Web :</strong> ' + lik_data_locations_map[i].url_link + '</p>' +
                    '<p><strong>GPS :</strong> ' + lik_data_locations_map[i].lat + ' ,' + lik_data_locations_map[i].lng + '</p>' +
                    '</div>' +
                    '<div class="col-md-4">' +
                    '<h3>&nbsp;</h3>' +
                    '<p><strong>Övrig information:</strong></p>' +
                    '<p>' + lik_data_locations_map[i].description + '</p>' +
                    '</div>' +
                    '<div class="col-md-12">' +
                    '<div class="row-seperate"></div>' +
                    '</div>' +
                    '</div>';
        }
        $('.dealers-content-results').append(html_content);
    });

    //Request Get Location User
    if ($('.is-shared-location').length > 0) {
        getLocation();
    }
    
    //Add Field Name for Search Locations
    if ( $('#address_search').length > 0) {
        var html_nameSearch = 
            '<div id="addy_in_nameSearch" class="search_item">' +
                '<label for="nameSearch" class="text length_13">Namn på återförsäljare</label>' + 
                '<input class="label_text length_13" id="nameSearch" name="nameSearch" size="50" value="" type="text">' +
            '</div>';
        $('#address_search').prepend( html_nameSearch );
    }

});

//Search Location
jQuery(window).load(function ( ) {
    if ( jQuery( 'input#s_store_address' ).length > 0 ) {
        var s_store_address = jQuery( 'input#s_store_address' ).val();
        jQuery( '.google-map-render #addressInput' ).val( s_store_address );
        jQuery( "#searchForm" ).submit();
    }
});

//Request Location Client
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
}

function showPosition(position) {
    var lat_store = position.coords.latitude;
    var lng_store = position.coords.longitude;

    jQuery.post( ajaxurl, {
        action: 'search_store',
        lat: lat_store,
        lng: lng_store
    }, function (store) {
        //console.log( store );
        if ( store.length > 0 ) {
            var store_name = store[0].sl_store;
            var store_address = store[0].sl_address + ' ' + store[0].sl_city + ' ,' + store[0].sl_zip + ' ' + store[0].sl_country;
            lik_accepted_request_location( store_name, store_address );
        } else {
            lik_denied_request_location();
        }
    });
}

function showError(error) {
    switch (error.code) {
        //User denied the request for Geolocation.
        case error.PERMISSION_DENIED:
            lik_denied_request_location();
            break;
            //Location information is unavailable
        case error.POSITION_UNAVAILABLE:
            lik_denied_request_location();
            break;
            //The request to get user location timed out.
        case error.TIMEOUT:
            lik_denied_request_location();
            break;
            //An unknown error occurred..
        case error.UNKNOWN_ERROR:
            lik_denied_request_location();
            break;
    }
}

//Function execute when denied request location
function lik_denied_request_location() {
    jQuery('.is-shared-location > .is-rejected ').show();
    jQuery('.is-shared-location > .is-accepted ').hide();
}

//Function execute when accepted request location
function lik_accepted_request_location( store_name, store_address ) {
    jQuery( '.is-shared-location > .is-accepted > p#reseller_store_name ' ).html(store_name);
    jQuery( '.is-shared-location > .is-accepted > p#reseller_store_address ' ).html(store_address);
    jQuery('.is-shared-location > .is-rejected ').hide();
    jQuery('.is-shared-location > .is-accepted ').show();
}