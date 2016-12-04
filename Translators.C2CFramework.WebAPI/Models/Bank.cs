using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Translators.C2CFramework.WebAPI.Models
{
    public class Bank
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }
    }
}