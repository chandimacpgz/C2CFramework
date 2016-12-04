using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Translators.C2CFramework.WebAPI.Models
{
    public class LiveChequePath
    {
        public int Id { get; set; }
        public int BankId { get; set; }
        public int ChequeId { get; set; }
        public string NumericalAmountCroppedImagePath { get; set; }
        public string AmountCroppedImagePath { get; set; }
        public string DateCroppedImagePath { get; set; }
        public string MICRCroppedImagePath { get; set; }
        public string SignatureCroppedImagePath { get; set; }
        public string ChequeLogoCroppedImagePath { get; set; }
        public string LiveChequeImageFrontPath { get; set; }
        public string LiveChequeImageBackPath { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }
    }
}