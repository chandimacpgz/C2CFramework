using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Translators.C2CFramework.WebAPI.Enum;

namespace Translators.C2CFramework.WebAPI.ChequeCrop
{
    public class CropTypeFactory
    {
        public static List<CropType> CropTypes = new List<CropType>()
        {
            CropType.NumericalAmount,
            CropType.Amount,
            CropType.Date,
            CropType.Signature,
            CropType.MICR,
            CropType.Payee
        };
    }
}