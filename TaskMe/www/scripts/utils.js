define(['jlinq'], function(linq) {
    var _kendoApp;

    return {
        init: function(kendoApp) {
            _kendoApp = kendoApp;

        },
        setViewTitle: function(title) {
            var navbar = _kendoApp.view()
                .header
                .find(".km-navbar")
                .data("kendoMobileNavBar");
            navbar.title(title);
        },

        navigate: function(location) {
            _kendoApp.navigate(location);
        },

        redirect: function(location) {
            _kendoApp.pane.history.pop();
            _kendoApp.navigate(location);
        },

        scrollViewToTop: function(viewElement) {
            viewElement.data("kendoMobileView").scroller.reset();
        },

        showLoading: function() {
           _kendoApp.showLoading();
        },

        hideLoading: function() {
           _kendoApp.hideLoading();
        },

        showError: function (message, error) {
            console.log(message, error);
            try {
                var errorMessage = message + (error === undefined ? "" : "\n" + error.status + ": " + error.statusText);
                $("#error-view .error-header").show();
                $("#error-view .message").text(errorMessage);
                $("#error-view").show().data().kendoMobileModalView.open();
            } catch (e) {
                console.log(e);
            }
        },

        closeError: function () {
            $("#error-view").data().kendoMobileModalView.close();
        },

        closeAllPopovers: function() {
            $(".km-popup").each(function(idx, item) {
                var popover = $(item).data().kendoMobilePopOver;
                if (popover) {
                    popover.close();
                }
            });
        },
       
        isOnline: function () {
            return navigator.connection.type != Connection.NONE;
        }


    };
});