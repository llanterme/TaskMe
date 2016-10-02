using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskMe.Debug
{
    class Program
    {
        static void Main(string[] args)
        {
            var regLogic = new Domain.Logic.RegistrationLogic();

            regLogic.createProfile(new Domain.Entity.UserEntity { 
             Email = "llanterme@mweb.co.za",
             Mobile = "0792409463",
             Pin = 12345,
             Type = "Tasker",
             
                 
            });


        }
    }
}
