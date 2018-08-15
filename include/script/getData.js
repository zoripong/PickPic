var isLoading;
var user_array = [];
var board_array = [];
isLoading = true;

function getUserInfo() {
    $.ajax({
        type: "GET",
        async: true,
        url: "http://119.205.221.104/PickPic/PickPic-server/UserInfo/getUserInfo.php",
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

function getBoard() {
    isLoading = true;
    $.ajax({
        type: "GET",
        async: true,
        url: "http://119.205.221.104/PickPic/PickPic-server/Board/getBoard.php",
        dataType: "json",
        success: function(response, status, result) {
            var response = JSON.parse(JSON.stringify(response));
            var board_list = JSON.parse(JSON.stringify(response.board));

            for (var i = 0; i < board_list.length; i++) {

                var id = board_list[i].id;
                if(sessionStorage.getItem("user_id") == board_list[i].user_id){
                    board_array.push({
                        'id': board_list[i].id,
                        'user_id': board_list[i].user_id,
                        'image_url': board_list[i].image_url,
                        'location': board_list[i].location,
                        'description' : board_list[i].description,
                        'camera' : board_list[i].camera,
                        'angle' : board_list[i].angle,
                        'tightening' : board_list[i].tightening,
                        'shutter_speed' : board_list[i].shutter_speed,
                        'iso' : board_list[i].iso,
                        'tag': JSON.parse(JSON.stringify(board_list[i].tag))
                    });
                }

            }

            setView();
        }
    });
}


function setView(){
    isLoading = false;
    $('.loader').removeClass('loader');
    // alert("hi"+board_array.length);
    var str = "<section id='sc_user_images_row'>";

    for(var i = 0; i< board_array.length; i++){
        if((i+1)%4 == 0){
            str += "</section><section id='sc_user_images_row'>";
        }


        str += "<div class='user_image_container' onclick='openModal(\"include/image/image_1.jpg\", "+i+")'>";
        str += "<img src='include/image/image_1.jpg'>";
        str += "<div class='image_opacity'></div>";
        str += "<div class='image_detail'>";
        str += "<img class='image_detail_btn' src='include/image/sc_loupe.svg'>";
        str += "</div>";
        str += "</div>";
    }
    str += "</section>";
    $("#sc_user_images").append(str);
    

}