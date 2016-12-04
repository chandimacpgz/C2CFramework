using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Translators.C2CFramework.WebAPI.Enum;

namespace Translators.C2CFramework.WebAPI.ChequeCrop
{
    interface ICropType
    {
        CropType cropType { get; set; }

    }
}
