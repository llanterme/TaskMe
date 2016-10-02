using Mweb.Foundation.Practices.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskMe.Domain.Entity;
using TaskMe.Infrastructure.Catalog;
using TaskMe.Infrastructure.Uow;

namespace TaskMe.Domain.Logic
{
    
    public class RegistrationLogic
    {

        private static readonly ILogger Log = LogManager.GetLogger(typeof(RegistrationLogic));

        public UserEntity createProfile(UserEntity baseProfile)
        {
            try
            {
                using (var uow = new Uow<user>())
                {
                    user newProfile = new user();

                    if (!uow.Repository.Get().Any((u => u.Email.Equals(baseProfile.Email)))) {
                        newProfile = uow.Repository.Insert(new user
                        {
                            Email = baseProfile.Email,
                            Mobile = baseProfile.Mobile,
                            Pin = baseProfile.Pin,
                            Type = baseProfile.Type,
                            EmailVerified = Guid.NewGuid().ToString()


                        });
                    
                        uow.Save();

                        return new UserEntity
                        {
                            Email = newProfile.Email,
                            Mobile = newProfile.Mobile,
                            Pin = newProfile.Pin,
                            UserId = newProfile.UserId
                           

                        };

                    } else {
                        return new UserEntity
                        {
                            Status = Status.Successfull,
                            Message = "User already exists"

                        };
                    }
                }
            }
            catch (Exception ex)
            {
                return new UserEntity
                {
                    Status = Status.Failed,
                    Message = ex.Message
                };
            }

        }
    }
}
