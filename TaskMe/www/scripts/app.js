define(["jQuery", "kendo", "utils", "data", "loginView", "homeView", "registerView", "uploadDocsView"], function ($, kendo, utils, data, loginView, homeView, registerView, uploadDocsView) {
    var _kendoApplication;
  
  var _onError = function (error, url, line) {
         utils.showError(error);
    };

    var onDeviceReady = function () {
        try {
          
            window.onerror = _onError;
           
            _kendoApplication = new kendo.mobile.Application(document.body, {
                transition: 'slide',
          //      useNativeScrolling: true,
                skin: 'nova',
                initial: '#loginView',
                init: function () {
                    setTimeout(function () {
                        utils.init(_kendoApplication);

                    }, 1);
                }
            });


        } catch (e) {
            alert("onDeviceReady" + e);
        }

    };

 
    var init = function () {
        window.onerror = _onError;
        document.addEventListener("deviceready", onDeviceReady, false);
    }


    return {
        init: init,
        loginView: loginView,
        homeView: homeView,
        utils: utils,
        registerView: registerView,
        uploadDocsView: uploadDocsView

    }
});