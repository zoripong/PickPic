var isLoading;
var user_array = [];

function getUserInfo() {
    isLoading = true;
    $.ajax({
        type: "GET",
        async: true,
        url: "http://119.205.221.104/PickPic/getUser.php",
        dataType: "json",
        success: function(response, status, result) {
            var response = JSON.parse(JSON.stringify(response));
            var user_list = JSON.parse(JSON.stringify(response.user));

            for (var i = 0; i < user_list.length; i++) {

                var id = user_list[i].id;
                user_array.push({
                    'id': user_list[i].id,
                    'user_id': user_list[i].user_id,
                    'password': user_list[i].password,
                    'nick_name': user_list[i].nick_name,
                    'camera': JSON.parse(JSON.stringify(user_list[i].camera))
                });

            }

            isLoading = false;
            $('.loader').removeClass('loader');
        }
    });
}