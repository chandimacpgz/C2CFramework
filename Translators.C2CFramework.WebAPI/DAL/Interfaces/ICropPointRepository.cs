using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Translators.C2CFramework.WebAPI.Models;

namespace Translators.C2CFramework.WebAPI.DAL.Interfaces
{
    internal interface ICropPointRepository
    {
        List<CropPoint> GetCropPoints();
        CropPoint GetSingleCropPoint(int id);
        bool InsertCropPoint(CropPoint cropPoint);
        bool DeleteCropPoint(int id);
        bool UpdateCropPoint(CropPoint cropPoint);
    }
}
