var parentHeight = parseInt($(window).height());
var imageFile = "";

function openModal(path, id) {
    $("#sc_popup_image>img").css({
        "width": "auto",
        "height": parentHeight - 250
    });

    var popImageWidth = parseInt($("#sc_popup_image>img").width());
    // alert(popImageWidth);
    $("#sc_popup_image_background").css({
        "background-image": "url(" + path + ")",
        "width": "100%",
        "height": parentHeight - 250
    });
    $("#sc_popup_image>img").attr("src", path);
    $("#sc_popup").css({
        "opacity": "1.0",
        "display": "block"
    });

    $("#sc_popup_content").css({
        "visibility": "visible",
        "-webkit-transform": "scale(1, 1)",
        "-ms-transform": "scale(1, 1)",
        "transform": "scale(1, 1)"
    });

    var tags = "";
    for (var i = 0; i < board_array[id].tag.length; i++) {
        tags += "<a href='#'><p>#" + board_array[id].tag[i] + "</p></a>";
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

    if (sessionStorage.getItem("user_index") == null) {
        location.href = "index.html";
    }

    getBoard();

    $("#p_user_name").text(sessionStorage.getItem("user_id"));

    $("#add_board_form").submit(function() {

        uploadImage();
        // insertBoard();
        // alert(imageFile);
        return false;
    });

    $("#close_modal").click(function() {

        $("#sc_popup").css({
            "opacity": "0.0",
            "display": "none"
        });

        $("#sc_popup_content").css({
            "-webkit-transition": "all 1s ease",
            "visibility": "collapse",
            "-webkit-transform": "scale(0, 0)",
            "-ms-transform": "scale(0, 0)",
            "transform": "scale(0, 0)"
        });
    });

    $("#close_add_modal").click(function() {
        $("#sc_add_popup").css({
            "opacity": "0.0",
            "display": "none"
        });

        $("#sc_add_popup_content").css({
            "-webkit-transition": "all 1s ease",
            "visibility": "collapse",
            "-webkit-transform": "scale(0, 0)",
            "-ms-transform": "scale(0, 0)",
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
            "display": "block"
        });

        $("#sc_add_popup_content").css({
            "visibility": "visible",
            "-webkit-transform": "scale(1, 1)",
            "-ms-transform": "scale(1, 1)",
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


    // let storageRef = firebase.storage().ref('photos/' + $("#input_image_upload").val());
    // let fileUpload = document.getElementById("cameraInput")


    $("#input_image_upload").on("change", function(e) {
        imageFile = e.target.files[0];
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
            "opacity": "0.0",
            "display": "none"
        });

        $("#sc_popup_content").css({
            "-webkit-transition": "all 1s ease",
            "visibility": "collapse",
            "-webkit-transform": "scale(0, 0)",
            "-ms-transform": "scale(0, 0)",
            "transform": "scale(0, 0)"
        });
        $("#sc_add_popup_content").css({
            "-webkit-transition": "all 1s ease",
            "visibility": "collapse",
            "-webkit-transform": "scale(0, 0)",
            "-ms-transform": "scale(0, 0)",
            "transform": "scale(0, 0)"
        });
    }
});

function uploadImage() {
    $('#loader').addClass('loader');

    var storageRef = firebase.storage().ref();
    let file = imageFile; // upload the first file only
    // File or Blob named mountains.jpg
    // var file = ;

    // Create the file metadata
    var metadata = {
        contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },
        function(error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    alert("권한이 없습니다.");
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    alert("취소 되었습니다.");
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    alert("오류 발생.");
                    break;
            }
        },
        function() {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                insertBoard(downloadURL);
                // alert(downloadURL);
            });
        });
}

function insertBoard(img) {
    var tag_json = JSON.stringify($("#input_tag").val().split("#"));
    // alert(camera_json);
    // alert($("#input_info_camera").val())
    // alert($("#input_info_angle").val());
    // alert($("#input_info_tightening").text());
    // alert($("#input_info_shutter_speed").text());
    // alert($("#info_iso").text());
    $.ajax({
        type: "POST",
        async: true,
        url: "http://119.205.221.104/PickPic/PickPic-server/Board/setBoard.php",
        dataType: "text",
        data: {
            // notice
            "user_id": sessionStorage.getItem("user_id"),
            "image_url": img,
            "location": $("#location").val(),
            "description": $("#description").val(),
            "camera": $("#input_info_camera").val(),
            "angle": $("#input_info_angle").val(),
            "tightening": $("#input_info_tightening").val(),
            "shutter_speed": $("#input_info_shutter_speed").val(),
            "iso": $("#input_info_iso").val(),
            "tag": tag_json
        },
        success: function(response, status, result) {
            alert("게시글 등록에 성공하였습니다." + response);
            document.getElementById("sc_user_images").innerHTML = "";
            $("#sc_add_popup").css({
                "opacity": "0.0",
                "display": "none"
            });

            $("#sc_add_popup_content").css({
                "-webkit-transition": "all 1s ease",
                "visibility": "collapse",
                "-webkit-transform": "scale(0, 0)",
                "-ms-transform": "scale(0, 0)",
                "transform": "scale(0, 0)"
            });
            getBoard();
        },
        error: function(xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText
            alert('Error - ' + errorMessage);
        }
    });

}