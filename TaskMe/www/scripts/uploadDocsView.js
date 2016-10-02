define(['kendo', 'data', 'utils', 'config'], function (kendo, data, utils, config) {

    var uploadDocsViewModel = kendo.observable({
        pictureSource: navigator.camera.PictureSourceType,
        destinationType: navigator.camera.DestinationType,
        openActionSheet: function () {
             var options = {
                androidTheme: window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT, // material
                title: 'What do you want to do?',
                buttonLabels: ['Take Photo', 'Photo Library'],
                addCancelButtonWithLabel: 'Cancel',
                androidEnableCancelButton: true,
                winphoneEnableCancelButton: true,
                destructiveButtonLast: false // you can choose where the destructive button is shown
            };
            window.plugins.actionsheet.show(options, actionSheetCallback);

        },
        saveOnlinePhoto: function (e) {
            try {
               
                utils.showLoading();
                var imageSrc = $('.listItemImagePreview').attr('src');
                var imageFileName = imageSrc.substr(imageSrc.lastIndexOf('/') + 1);

                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = imageFileName;
                options.mimeType = "image/jpeg";
                var params = {};
                params.RequestId = "9999";
                options.params = params;
                var ft = new FileTransfer();
                ft.upload(imageSrc, config.uploadUrl, uploadSuccess, uploadFail, options);
            } catch (e) {
                alert(e);
            }

        }

    });

    var actionSheetCallback = function (buttonIndex) {
        setTimeout(function () {
            if (buttonIndex === 1) {
                capturePhoto();
            } else {
                //clearFormData();
            }
        });
    };

    var capturePhoto = function () {

        navigator.camera.getPicture(onTakePhotoSuccess, onPhotoFail, {
            quality: 70,
            targetWidth: 250,
            targetHeight: 250,
            correctOrientation: true,
            destinationType: Camera.DestinationType.FILE_URI
        });

    }

    var onTakePhotoSuccess = function (imageURI) {
        var html = '<li>';
        html += '<img class="listItemImagePreview" src=' + "'" + imageURI + "'" + '/></li>';
        $('#itemImageList').append(html);
        $('#itemCompleteWrapper').show();
        $('#imagePreviewWrapper').show();

    };

    var onPhotoFail = function (message) {
        alert('Failed because: ' + message);
    };

    var uploadSuccess = function (r) {
        utils.hideLoading();
        var serviceResponse = JSON.parse(r.response);
        alert(serviceResponse.Status);
       
    };

    var uploadFail = function (error) {
        utils.hideLoading();
        navigator.notification.alert('an error has occured.');
    };


    return {
        init: function (initEvt) { },
        beforeShow: function (beforeShowEvt) { },
        show: function (showEvt) {  },
        viewModel: uploadDocsViewModel
    }
})