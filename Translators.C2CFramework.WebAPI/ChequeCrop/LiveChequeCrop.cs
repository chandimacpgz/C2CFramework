using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.Web;
using Translators.C2CFramework.WebAPI.Enum;
using Translators.C2CFramework.WebAPI.Models;

namespace Translators.C2CFramework.WebAPI.ChequeCrop
{
    public class LiveChequeCrop
    {
        public string SaveCroppedImage(string liveChequePath, CropType cropType,CropPoint cropPoints)
        {
            string savePath = "";
            string CropName = cropType.ToString();
            Random number = new Random();

            Bitmap bitmap = new Bitmap(HttpContext.Current.Server.MapPath(liveChequePath));
            Bitmap croppedBitmap = CropCheque(bitmap, cropPoints.CropStartX, cropPoints.CropStartY, cropPoints.CropWidth, cropPoints.CropHeight);

            HttpResponse response = GetHttpResponse();

            response.ContentType = "image/jpeg";
            savePath = "ChequeImageData/CroppedCheques/" + CropName + "/" + CropName + "_" + number.Next(0, 100000) + ".jpg";
            croppedBitmap.Save(HttpContext.Current.Server.MapPath(savePath), ImageFormat.Jpeg);
            return savePath;
        }
        
        public static HttpResponse GetHttpResponse()
        {
            return HttpContext.Current.Response;
        }
        public Bitmap CropCheque(Bitmap bitmap, int cropX, int cropY, int cropWidth, int cropHeight)
        {
            Rectangle rect = new Rectangle(cropX, cropY, cropWidth, cropHeight);
            Bitmap cropped = bitmap.Clone(rect, bitmap.PixelFormat);
            return cropped;
        }
    }
}