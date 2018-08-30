$(document).ready(function() {
    sessionStorage.setItem("user_id", "");
    sessionStorage.setItem("user_index", "");
    getUserInfo();

    // css
    $(window).click(function() {
        $("#sc-login").css({
            "opacity": "1",
            "width": "35%",
            "height": "75%"
        });
        $("body").css("cursor", "context-menu");
        $("html").css("cursor", "context-menu");
        $("#sc-logo").css("display", "none");
    });
    $("body").css("cursor", "pointer");
    // end of css

    $("#form-login").submit(function() {
        if (isLoading) {
            alert("정보를 불러오고 있습니다.");
            return false;
        }
        var id = $("#input-id").val();
        var pw = $("#input-pw").val();
        var i = 0;
        for (i = 0; i < user_array.length; i++) {
            if (id == user_array[i].user_id && pw == user_array[i].password) {
                alert("성공!");
                sessionStorage.setItem("user_id", id);
                sessionStorage.setItem("user_index", i);
                return true;
            }
        }
        if (i == user_array.length) {
            alert("실패!");
            return false;
        }
    });


    return false;

});