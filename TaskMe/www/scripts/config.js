define([], function () {
    var domain = "192.168.1.105",
        serverUrl = "http://" + domain,
        serviceUrl = serverUrl + "/TaskMe/RestService.svc";

    return {
        domain: domain,
        serverUrl: serverUrl,
        Create: serviceUrl + "/Create",
        uploadUrl: serviceUrl + "/UploadFile"
        
    };
});