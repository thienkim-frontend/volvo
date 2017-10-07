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

    if($('.volvo-bxslider li').length >= 2){
        $('.volvo-bxslider').bxSlider({
            pager: true,
            auto: true,
            controls: false,
        });
    }
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


});

