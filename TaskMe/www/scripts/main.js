var app;

require.config({
    paths: {
        jQuery: "libs/jquery-1.9.1.min",
        kendo: "libs/kendo.all.min",
        jlinq: "libs/jlinq"
        //facebookConnectPlugin: "../plugins/phonegap-facebook-plugin/facebookConnectPlugin"


    },
    shim: {
        jQuery: {
            exports: "jQuery"
        },
        kendo: {
            exports: "kendo"
        },
        jlinq: {
            exports: "jlinq"
        }


    }
});

require(["jQuery", "app"], function ($, application) {

    app = application
    application.init();

});