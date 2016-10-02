using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using TaskMe.Domain.Entity;

namespace TaskMe.Service
{
    
    [ServiceContract]
    public interface IRestService
    {
        [OperationContract]
        [Description("Debug Information")]
        [WebInvoke(BodyStyle = WebMessageBodyStyle.Bare,
         Method = "GET",
         UriTemplate = "/ServiceInfo",
         RequestFormat = WebMessageFormat.Json,
         ResponseFormat = WebMessageFormat.Json)]
        string ServiceInfo();

        [OperationContract]
        [Description("Create a new user")]
        [WebInvoke(BodyStyle = WebMessageBodyStyle.WrappedRequest,
        Method = "POST",
        UriTemplate = "/Create",
        RequestFormat = WebMessageFormat.Json,
        ResponseFormat = WebMessageFormat.Json)]
        UserEntity createUser(UserEntity user);

        [OperationContract]
        [Description("ID verification Upload.")]
        [WebInvoke(BodyStyle = WebMessageBodyStyle.WrappedRequest,
        Method = "POST",
        UriTemplate = "/UploadFile",
        ResponseFormat = WebMessageFormat.Json)]
        ResponseEntity UploadFile();
    }

  
}
