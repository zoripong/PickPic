var parentHeight = parseInt($(window).height());

function openModal(path, id){
    $("#sc_popup_image>img").css({
            "width": "auto",
            "height": parentHeight - 250
        });
        
        var popImageWidth = parseInt($("#sc_popup_image>img").width());
        // alert(popImageWidth);
        $("#sc_popup_image_background").css({
            "background-image" : "url("+path+")",
            "width": "100%",
            "height": parentHeight - 250
        });
        $("#sc_popup_image>img").attr("src", path);
        $("#sc_popup").css({
            "opacity": "1.0",
            "display" : "block"
            });

        $("#sc_popup_content").css({
            "visibility": "visible",
            "-webkit-transform": "scale(1, 1)",
            "-ms-transform" : "scale(1, 1)",
            "transform": "scale(1, 1)"
        });

        var tags = "";
        for(var i = 0; i<board_array[id].tag.length; i++){
            tags += "<a href='#'><p>#"+board_array[id].tag[i]+"</p></a>";
        }
        $("#detail_tags").html(tags);
        // alert(board_array[id].tag[0]);
        p_location
        $("#p_location").text(board_array[id].location);
        $("#p_detail_explan").text(board_array[id].description);
        $("#info_camera").text(board_array[id].camera);

        $("#info_angle").text(board_array[id].angle);
        $("#info_tightening").text(board_array[id].tightening);
        $("#info_shutter_speed").text(board_array[id].shutter_speed);
        $("#info_iso").text(board_array[id].iso);
}
$(window).scroll(function() {
    var standardHeightPx = parentHeight * (35 / 100);
    var minHeightPx = parentHeight * (10 / 100);

    if (standardHeightPx - $(this).scrollTop() > minHeightPx) {
        $("#hd-user-title").css({
            "height": standardHeightPx - $(this).scrollTop()
                //,"line-height": standardHeightPx - $(this).scrollTop()
        });
    } else {
        $("#hd-user-title").css({
            "height": parentHeight * (10 / 100)
                //,"line-height": parentHeight * (5 / 100)
        });

    }
});



$(window).on('load', function() {
    // var index = sessionStorage.getItem("user_index");
    
    if(sessionStorage.getItem("user_index")==null){
        location.href="index.html";
    }

    getBoard();

    $("#p_user_name").text(sessionStorage.getItem("user_id"));

    $("#add_board_form").submit(function(){
       insertBoard(); 
       return false;
    });

    $("#close_modal").click(function() {
        
        $("#sc_popup").css({
            "opacity": "0.0",
            "display" : "none"
        });

        $("#sc_popup_content").css({
            "-webkit-transition" : "all 1s ease",
            "visibility": "collapse",
            "-webkit-transform": "scale(0, 0)",
            "-ms-transform" : "scale(0, 0)",
            "transform": "scale(0, 0)"
        });
    });

    $("#close_add_modal").click(function() {
        $("#sc_add_popup").css({
            "opacity": "0.0",
            "display" : "none"    
        });
        
        $("#sc_add_popup_content").css({
            "-webkit-transition" : "all 1s ease",
            "visibility": "collapse",
            "-webkit-transform": "scale(0, 0)",
            "-ms-transform" : "scale(0, 0)",
            "transform": "scale(0, 0)"
        });
    });
    
    $("#sc_float_btn").click(function() {
        // alert("hellow");
        $("#sc_popup_add_image").css({
            "width": "100%",
            "height": parentHeight - 250
        });
        
        $("#sc_add_popup").css({
            "opacity": "1.0",
            "display" : "block"
        });
        
        $("#sc_add_popup_content").css({
            "visibility": "visible",
            "-webkit-transform": "scale(1, 1)",
            "-ms-transform" : "scale(1, 1)",
            "transform": "scale(1, 1)"
        });
    });

    $('#sc_popup_add_image').click(function() {
        // FIXME
        $('#input_image_upload').trigger('click');

    });
    $("input[type=file]").on("click", function(e) {
        e.stopPropagation();
    });

    $("#input_image_upload").on("change", function(e) {

        if (this.files && this.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('#preview').attr('src', e.target.result);
                $('#sc_popup_add_image_background_here').attr('src', e.target.result);
                //                     max-height: 100%;
                // max-width: 100%;
                // width: auto;
                // height: auto;

                $("#sc_popup_add_image_background_here").css({
                    "width": "100%",
                    "height": "100%",
                    "z-index": 996,
                });
                $("#preview").css({
                    "max-width": "60%",
                    "max-height": parentHeight - 250,
                    "width": "auto",
                    "height": "auto",
                    "z-index": 10000
                });

                // sc_popup_add_image_background

            };

            reader.readAsDataURL(this.files[0]);
        }
    });
});

$(document).keyup(function(e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
        // $("#sc_popup").css("display", "none");
        // $("#sc_add_popup").css("display", "none");
        $("#sc_popup").css({
            "opacity": "0.0",
            "display": "none"
        });
        
        $("#sc_add_popup").css({
            "opacity":"0.0",
            "display":"none"
        });
        
        $("#sc_popup_content").css({
            "-webkit-transition" : "all 1s ease",
            "visibility": "collapse",
            "-webkit-transform": "scale(0, 0)",
            "-ms-transform": "scale(0, 0)",
            "transform": "scale(0, 0)"
        });
        $("#sc_add_popup_content").css({
            "-webkit-transition" : "all 1s ease",
            "visibility": "collapse",
            "-webkit-transform": "scale(0, 0)",
            "-ms-transform": "scale(0, 0)",
            "transform": "scale(0, 0)"
        });
    }
});

function insertBoard(){
    var tag_json = JSON.stringify($("#input_tag").val().split("#"));
    // alert(camera_json);
    alert($("#info_camera").text());

    $.ajax({
        type: "POST",
        async: true,
        url: "http://119.205.221.104/PickPic/PickPic-server/Board/setBoard.php",
        dataType: "text",
        data: {
            // notice
            "user_id": sessionStorage.getItem("user_id"),
            "image_url":$('#input_image_upload').val() ,
            "location": $("#location").val(),
            "description": $("#description").val(),
            "camera": $("#info_camera").text(),
            "angle": $("#info_angle").val(),
            "tightening": $("#info_tightening").val(),
            "shutter_speed": $("#info_shutter_speed").val(),
            "iso": $("#info_iso").val(),
            "tag": tag_json
        },
        success: function(response, status, result) {
            alert("게시글 등록에 성공하였습니다." + response);
        },
        error: function(xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText
            alert('Error - ' + errorMessage);
        }
    });

}


