define(['kendo', 'data', 'utils', 'config'], function (kendo, data, utils, config) {

    var homeView = kendo.observable({
    
    });

    var getFacebookProfile = function () {

        facebookConnectPlugin.api("/me/?fields=id,name,email,birthday,picture.type(large)", ["user_birthday", "email"],
            function (result) {
                $("#fbProfileImage").attr("src", result.picture.data.url).show();
                
                var user = new Object();
                user.EmailAddress = result.email;
                user.Network = "Facebook";
                user.UserName = result.name;

                var servicesResponse = data.createUser(user);

                servicesResponse.fetch(function () {
                    var response = servicesResponse.data();
                });
            },
            function (error) {
                alert("Facebook Failed: " + JSON.stringify(error));
            });

       
    };

  
    var getGoogleProfile = function () {

        try {

            window.plugins.googleplus.trySilentLogin({
            'webClientId': '663275521818-kbmcr8frrh6ceqas3ho7vg0hm3mn1ipn.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
            'offline': false, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
        },
          function (obj) {
            //  alert(JSON.stringify(obj)); // do something useful instead of alerting
              
              $("#fbProfileImage").attr("src", obj.imageUrl).show();

              var user = new Object();
              user.EmailAddress = obj.email;
              user.Network = "Google";
              user.UserName = obj.displayName;

              var servicesResponse = data.createUser(user);

              servicesResponse.fetch(function () {
                  var response = servicesResponse.data();
              });
          },
          function (msg) {
              alert('error: ' + msg);
          }
      );
    } catch (ex) {
        alert(JSON.stringify(ex));
    }

    };

    return {
        init: function (initEvt) { },
        beforeShow: function (beforeShowEvt) { },
        show: function (showEvt) {

            var networkType = showEvt.view.params;
            if (networkType === 'facebook') {
                getFacebookProfile();
            } else {
                getGoogleProfile();
            }
        },
        viewModel: homeView
    }
})