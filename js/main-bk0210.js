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

    
    //Render Google Map
    var map = null;
    $('.acf-map').each(function(){
		// create map
		map = new_map( $(this) );

	});
    
});

function new_map( $el ) {
	
	// var
	var $markers = $el.find('.marker');
	
	// vars
	var args = {
		zoom		: 16,
		center		: new google.maps.LatLng(0, 0),
		mapTypeId	: google.maps.MapTypeId.ROADMAP
	};

	// create map	        	
	var map = new google.maps.Map( $el[0], args);

	// add a markers reference
	map.markers = [];
	// add markers
	$markers.each(function(){
    	add_marker( $(this), map );
	});
	
	// center map
	center_map( map );
	// return
	return map;
	
}
function add_marker( $marker, map ) {

	// var
	var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') );

	// create marker
	var marker = new google.maps.Marker({
		position	: latlng,
		map			: map,
		icon : $('.acf-map').attr('data-marker')
	});
	// add to array
	map.markers.push( marker );

	// if marker contains HTML, add it to an infoWindow
	if( $marker.html() )
	{
		// create info window
		var infowindow = new google.maps.InfoWindow({
			content		: $marker.html()
		});

		// show info window when marker is clicked
		google.maps.event.addListener(marker, 'click', function() {

			infowindow.open( map, marker );

		});
	}

}
function center_map( map ) {

	// vars
	var bounds = new google.maps.LatLngBounds();

	// loop through all markers and create bounds
	$.each( map.markers, function( i, marker ){

		var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );

		bounds.extend( latlng );

	});

	// only 1 marker?
	if( map.markers.length == 1 )
	{
		// set center of map
	    map.setCenter( bounds.getCenter() );
	    map.setZoom( 16 );
	}
	else
	{
		// fit to bounds
		map.fitBounds( bounds );
	}

}
