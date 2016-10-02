
define(['kendo', 'data', 'utils', 'config'], function (kendo, data, utils, config) {

    var loginView = kendo.observable({

        loginFacebook: function () {

            try {
                facebookConnectPlugin.getLoginStatus(loginStatusSuccess, loginStatusFailure)
            } catch (ex) {
                alert(JSON.stringify(ex));
            }
        },

        loginGoogle: function () {

            try {
                window.plugins.googleplus.login({
                    'webClientId': '663275521818-kbmcr8frrh6ceqas3ho7vg0hm3mn1ipn.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
                    'offline': false, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
                },
                    function (obj) {
                        // alert(JSON.stringify(obj)); // do something useful instead of alerting

                        utils.navigate('homeView.html?network=google', 'slide');
                    },
                    function (msg) {
                        alert('error: ' + msg);
                    }
                );
            } catch (ex) {
                alert(JSON.stringify(ex));
            }
        },

        registerUser: function () {
            utils.navigate('register.html', 'slide');
        }

    });

    var loginStatusSuccess = function (authResponse) {

        if (authResponse.status === "unknown") {

            facebookConnectPlugin.login(["public_profile"], fbLoginSuccess,
                function (error) {
                    alert(error)
                }
            );

        } else {

            utils.navigate('homeView.html?network=facebook', 'slide');
        }

    }

    var loginStatusFailure = function (authResponse) {
        alert(authResponse)
    }

    var fbLoginSuccess = function (userData) {
        utils.navigate('homeView.html?network=facebook', 'slide');

    }

    return {
        init: function (initEvt) { },
        beforeShow: function (beforeShowEvt) { },
        show: function (showEvt) { },

        viewModel: loginView
    }
})