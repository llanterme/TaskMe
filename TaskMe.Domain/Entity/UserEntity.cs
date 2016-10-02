using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskMe.Domain.Entity
{
   public class UserEntity : ResponseEntity
    {
        public int UserId { get; set; }

        public string Type { get; set; }

        public int Pin { get; set; }

        public string Mobile { get; set; }

        public string Email { get; set; }

        public string IdUrl { get; set; }


    }
}
