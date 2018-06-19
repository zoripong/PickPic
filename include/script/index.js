$(document).ready(function() {
    $(window).click(function() {
        $("#sc-login").css({
            "opacity": "1",
            "width" : "35%",
            "height": "75%"
        });
        $(body).css("cursor", "context-menu");
        $(html).css("cursor", "context-menu");
        $("#sc-logo").css("display", "none");
    });
    $(body).css("cursor", "pointer");

});