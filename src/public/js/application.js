console.log("Facebook App ID: " + appId);

function validateInputFields() {
    let fn = $("#fn");
    let mn = $("#mn");
    let ln = $("#ln");

    if (fn.val() === "") {
        fn.addClass("is-invalid");
        return true;
    } else {
        fn.removeClass("is-invalid");
    }

    if (mn.val() === "") {
        mn.addClass("is-invalid");
        return true;
    } else {
        mn.removeClass("is-invalid");
    }

    if (ln.val() === "") {
        ln.addClass("is-invalid");
        return true;
    } else {
        ln.removeClass("is-invalid");
    }

    return false;
}

function handleSubmitButton() {
    $("#btnApply").on("click", function (e) {
        let check = validateInputFields();

        let _data = {
            psid: $("#psid").val(),
            fn: $("#fn").val(),
            mn: $("#mn").val(),
            ln: $("#ln").val()
        };

        if (!check) {
            MessengerExtensions.requestCloseBrowser(function success() {
                // webview closed
            }, function error(err) {
                // an error occurred
                console.log("Error in closing the webview. " + err);
            });

            $.ajax({
                url: window.location.origin + "/set-application-info",
                method: "POST",
                data: _data,
                success: function (data) {
                    console.log(data);
                },
                error: function (error) {
                    console.log(error);
                }
            })
        }
    });
}

$(document).ready(function() {
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'Messenger'));
    
    window.extAsyncInit = function () {
        // the Messenger Extensions JS SDK is done loading 
    
        MessengerExtensions.getContext(""+appId,
            function success(thread_context) {
                // success
                $("#psid").val(thread_context.psid);
                handleSubmitButton();
            },
            function error(err) {
                // error
                console.log("Error in getting the context! " + err);
            }
        );
    };

    handleSubmitButton();
});