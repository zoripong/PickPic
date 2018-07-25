var isPossibleId = false;
$(window).ready(function() {
    isPossibleId = false;
    getUserInfo();

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


    $("#id").change(function() {
        if (isLoading) {
            return;
        }
        var i = 0;
        for (i = 0; i < user_array.length; i++) {
            if (user_array[i].user_id == $("#id").val()) {
                isPossibleId = false;
                break;
            }
        }

        if (i == user_array.length) {
            isPossibleId = true;
        }

        if (isPossibleId) {
            $("#id").css("border-color", "#cccccc");
        } else {
            $("#id").css("border-color", "#91000e");
        }

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

    $("#form_signin").submit(function() {
        if (isLoading) {
            alert("정보를 불러오고 있습니다.");
            return false;
        }

        if (!isPossibleId) {
            alert("아이디를 확인하세요.");
            $("#id").focus();
            return false;
        }

        if ($("#camera_list").children().length == 0) {
            if (!confirm("소유하신 카메라가 없으신가요?")) {
                $("#camera").focus();
                return false;
            }
        }

        insertUserData();

    });

});


function insertUserData() {

    var camera_array = Array();
    var camera_li = $("#camera_list").children();
    for (var i = 0; i < camera_li.length; i++) {
        camera_array.push(camera_li[i].text);
    }
    var camera_json = JSON.stringify(camera_array);


    $.ajax({
        type: "POST",
        async: true,
        url: "http://119.205.221.104/PickPic/PickPic-server/UserInfo/setUserInfo.php",
        dataType: "text",
        data: {
            // notice
            "user_id": $("#id").val(),
            "password": $("#password").val(),
            "nick_name": $("#nickname").val(),
            "camera": camera_json
        },
        success: function(response, status, result) {
            alert("회원가입에 성공하였습니다." + response);
        },
        error: function(xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText
            alert('Error - ' + errorMessage);
        }
    });

}