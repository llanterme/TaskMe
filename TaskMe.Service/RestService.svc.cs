using Mweb.Foundation.Practices.Logging;
using System;
using System.Configuration;
using System.Reflection;
using System.Web;
using TaskMe.Domain.Entity;
using TaskMe.Domain.Logic;

namespace TaskMe.Service
{

    public class RestService : IRestService
    {

        private static readonly ILogger Log = LogManager.GetLogger(typeof(RestService));

        private readonly RegistrationLogic _logic;

        public RestService()
        {
            _logic = new RegistrationLogic();
        }

        public string ServiceInfo()
        {
            return "Service Response";
        }

        public UserEntity createUser(UserEntity user)
        {
            return _logic.createProfile(user);
        }

        public ResponseEntity UploadFile()
        {
            var methodName = MethodBase.GetCurrentMethod().Name;
            try
            {
                string rootPathRemote = HttpContext.Current.Server.MapPath(ConfigurationManager.AppSettings["uploadDirectory"]);
                string rootPhysicalPathRemote = rootPathRemote + "\\";

                int fileCount = 0;

                fileCount = HttpContext.Current.Request.Files.Count;
                var response = new ResponseEntity();
                for (int i = 0; i < fileCount; i++)
                {
                    HttpPostedFile file = HttpContext.Current.Request.Files[i];
                    string fileName = HttpContext.Current.Request.Files[i].FileName;
                    if (!fileName.EndsWith(".jpg"))
                    {
                        fileName += ".jpg";
                    }

                    var currentFileName = fileName.Split('.');
                    var guid = Guid.NewGuid().ToString();
                    string strFileName = guid + "." + currentFileName[1];
                    var sourceFilePath = rootPhysicalPathRemote + strFileName;

                    file.SaveAs(sourceFilePath);

                    var requestId = HttpContext.Current.Request.Params["RequestId"];
              //      response = _coreLogic.CreateImageLocation(int.Parse(requestId), strFileName);

                }

                return new ResponseEntity
                {
                    Message = response.Message,
                    Status = response.Status
                };
            }
            catch (Exception ex)
            {
                Log.Info(methodName, string.Format("Exception Occured: {0}. Inner Exception {1}", ex.Message, ex.InnerException));
                return new ResponseEntity
                {
                    Status = Status.Failed,
                    Message = ex.Message
                };
            }

        }
    }
}
