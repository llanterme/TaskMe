using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskMe.Domain.Entity
{
    public class ResponseEntity
    {
        public Status Status { get; set; }
        public string Message { get; set; }
    }

    public enum Status
    {
        Successfull,
        Failed
    }
}
