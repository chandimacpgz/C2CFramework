using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Translators.C2CFramework.WebAPI.Enum
{
    public enum CropType
    {
        NumericalAmount = 0,
        Amount = 1,
        Date = 2,
        Signature = 3,
        Logo = 4,
        MICR = 5,
        Payee = 6
    }
}