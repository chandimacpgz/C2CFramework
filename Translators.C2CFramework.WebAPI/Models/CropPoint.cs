using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Translators.C2CFramework.WebAPI.Enum;

namespace Translators.C2CFramework.WebAPI.Models
{
    public class CropPoint
    {
        public int Id { get; set; }
        public CropType CropType { get; set; }
        public int BankId { get; set; }
        public int ChequeId { get; set; }
        public int CropStartX { get; set; }
        public int CropStartY { get; set; }
        public int CropWidth { get; set; }
        public int CropHeight { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }
    }
}