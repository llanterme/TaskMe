define(['kendo', 'data', 'utils', 'config'], function (kendo, data, utils, config) {

    var registerViewModel = kendo.observable({
        CreateNewProfile: function (e) {

            var payLoad = new Object();
            payLoad.Email = this.get("createProfileEmail");
            payLoad.Mobile = this.get("createProfileMobile");
            payLoad.Pin = this.get("createProfilePin");
            payLoad.Type = this.get("createProfileType");
           
            var servicesResponse = data.createUser(payLoad);

            servicesResponse.fetch(function () {
                var response = servicesResponse.data();

                alert(JSON.stringify(response));
                utils.navigate('uploadDocs.html', 'slide');
            });

        }
    });

   

    return {
        init: function (initEvt) { },
        beforeShow: function (beforeShowEvt) { },
        show: function (showEvt) {  },
        viewModel: registerViewModel
    }
})