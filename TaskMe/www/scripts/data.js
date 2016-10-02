define(['config', 'utils'], function (config, utils) {

    var _onRequestStart = function (event) {
        if (!utils.isOnline()) {
            utils.showError("No network connection available. Please try again when online.");
            event.preventDefault();
            return false;
        }
    };




    // ######## Create User ########
  var createUser = function (user){
       
        try {
				
            var dataSource = new kendo.data.DataSource({
                requestStart: function (e) {
                    _onRequestStart(e);
                    utils.showLoading();
                },
                requestEnd: function (e) {
                    utils.hideLoading();
                },
                error: function (e) {
                    var xhr = e.xhr;
                    var statusCode = e.status;
                    var errorThrown = e.errorThrown;
                    alert("A error has occured while capturing the user details.");
                },
                transport: {
                    read: {
                        type: "POST",
                        url: config.Create,
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json'
                    },
                     change: function (e) {
               var data = this.data();

            },
                    parameterMap: function (options, operation) {
						
                        var dto = {
                            'user': user
                        };
                      
                        return JSON.stringify(dto);
                    }
                },
                schema: {
                    data: function (response) {
                       console.log(response);
                     return [response];
                    
                    }
                }
            });
       return dataSource;
       
    } catch (e) {
        utils.hideLoading();
        alert(e);
    }
       
  }

    // ######## Get Address details ########

  var getBingAddressDetails = function (captureLat, captureLong) {
      try {

          var url = "http://dev.virtualearth.net/REST/v1/Locations/" + captureLat + "," + captureLong + "?o=json&key=Aq2050-jdjEDuiGuRLrPd__aqqbPY4RcmFt63N0SozBM3kDe-cthBPpkxLYbjMt0";

          var addressDetailsDataSource = new kendo.data.DataSource({

              requestStart: function (e) {

                  utils.showLoading();
              },
              requestEnd: function (e) {
                  utils.hideLoading();
              },
              error: function (e) {
                  var xhr = e.xhr;
                  var statusCode = e.status;
                  var errorThrown = e.errorThrown;
                  alert("An error occured fetching your address details. Please enter them manually.");
              },
              transport: {
                  read: {
                      url: url,
                      dataType: "json",
                      cache: false
                  }

              },
              change: function (e) {
                  var data = this.data();

              },
              schema: {
                  data: function (data) {

                      return [data]
                  }
              }
          });
          return addressDetailsDataSource;

      } catch (e) {
          alert(e);
      }

  }

  

        // ######## Return ########
       
    return {
        createUser: createUser,
        bingAddress: getBingAddressDetails
       
	   
    }
});