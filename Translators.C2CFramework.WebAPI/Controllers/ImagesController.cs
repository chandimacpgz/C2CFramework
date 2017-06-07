using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using Translators.C2CFramework.WebAPI.Models;

namespace Translators.C2CFramework.WebAPI.Controllers
{
    public class ImagesController:ApiController
    {
        [Route("Images")]
        [HttpPost]
        public string GetCameraImage([FromBody]ImageModel image)
        {
            String path = HttpContext.Current.Server.MapPath("~/LiveChequeImageData");
            String backuppath = HttpContext.Current.Server.MapPath("~/BackupLiveCheques");//Path
            Random number = new Random();
            if (!System.IO.Directory.Exists(path))
            {
                System.IO.Directory.CreateDirectory(path); //Create directory if it doesn't exist
            }

            string imageName =   "1"+ number.Next(0, 100000) + ".jpg";
            string imgPath = Path.Combine(path, imageName);
            string imgBackupPath = Path.Combine(backuppath, imageName);

            if (image != null)
            {
                byte[] imageBytes = Convert.FromBase64String(image.ImagePath);

                File.WriteAllBytes(imgPath, imageBytes);
                File.WriteAllBytes(imgBackupPath, imageBytes);
                return "uploaded_success";
            }
            else
            {
                return "abc" + image.ImagePath;
            }
            

            
        }
    }
}