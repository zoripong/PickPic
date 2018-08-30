var parentHeight = parseInt($(window).height());

$(window).scroll(function() {
    var standardHeightPx = parentHeight * (35 / 100);
    var minHeightPx = parentHeight * (10 / 100);

    if (standardHeightPx - $(this).scrollTop() > minHeightPx) {
        $("#hd-user-title").css({
            "height": standardHeightPx - $(this).scrollTop(),
            "line-height": standardHeightPx - $(this).scrollTop()
        });
    } else {
        $("#hd-user-title").css({
            "height": parentHeight * (10 / 100),
            "line-height": parentHeight * (5 / 100)
        });

    }
});
$(window).ready(function() {

    $("#p_id").text(sessionStorage.getItem("user_id"));
    $("#h_id").text(sessionStorage.getItem("user_id"));

    $("#hd-user-title").click(function() {
        $("#background_upload").trigger("click");
    });

    $("input[type=file]").on("click", function(e) {
        e.stopPropagation();
    });

    $("#background_upload").on("change", function(e) {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#preview').attr('src', e.target.result);
                //background-image: url("../image/image_6.jpg");

                $("#hd-user-title").css("background-image", "url(" + e.target.result + ")");
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    $("#form-update-info").submit(function() {
        if ($("#camera_list").children().length == 0) {
            if (!confirm("소유하신 카메라가 없으신가요?")) {
                $("#camera").focus();
                return false;
            }
        }

        updateUserData();
    });


    $("#re_password").change(function() {
        if ($("#password").val() == "") {
            return;
        }

        if ($("#password").val() != $("#re_password").val()) {
            $("#re_password").css("border-color", "#91000e");
            $("#re_password").focus();
        } else {
            $("#re_password").css("border-color", "#cccccc");
        }
    });

    $("#password").change(function() {
        if ($("#re_password").val() == "") {
            return;
        }

        if ($("#password").val() == $("#re_password").val()) {
            $("#re_password").css("border-color", "#cccccc");
        } else {
            $("#re_password").css("border-color", "#91000e");
            $("#re_password").focus();
        }
    });


    $("#ic_add").click(function() {
        if ($("#camera").val() == "") {
            alert("카메라 정보를 입력해주세요!");
            $("#camera").focus();
        } else {
            var children = $("#camera_list").find("option");
            var isContain = false;
            for (var i = 0; i < children.length; i++) {
                if (children[i].text == $("#camera").val()) {
                    isContain = true;
                    break;
                }
            }
            if (!isContain) {
                $("#camera_list").append("<option>" + $("#camera").val() + "</option>")
            } else {
                alert("이미 추가된 카메라입니다.");
            }

            $("#camera").val("");
        }
    });

});

function updateUserData() {

    var camera_array = Array();
    var camera_li = $("#camera_list").children();
    for (var i = 0; i < camera_li.length; i++) {
        camera_array.push(camera_li[i].text);
    }
    var camera_json = JSON.stringify(camera_array);
    alert(sessionStorage.getItem("user_id"));
    $.ajax({
        type: "POST",
        async: true,
        url: "http://119.205.221.104/PickPic/PickPic-server/UserInfo/updateUserInfo.php",
        dataType: "text",
        data: {
            // notice
            "user_id": sessionStorage.getItem("user_id"),
            "password": $("#password").val(),
            "nick_name": $("#nickname").val(),
            "camera": camera_json
        },
        success: function(response, status, result) {
            alert("수정을 성공하였습니다." + response);
        },
        error: function(xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText
            alert('Error - ' + errorMessage);
        }
    });

}