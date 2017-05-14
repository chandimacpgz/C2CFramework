using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Translators.C2CFramework.WebAPI.Models
{
    public class Cheque
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int BankId { get; set; }
        public string ArchievedChequeFrontPath { get; set; }
        public string ArchievedChequeBackPath { get; set; }
        public int DimensionX { get; set; }
        public int DimensionY { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }
        public Byte File { get; set; }
    }
}