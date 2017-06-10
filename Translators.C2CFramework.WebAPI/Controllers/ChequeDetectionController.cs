using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using Translators.C2CFramework.WebAPI.ChequeMatch;
using Translators.C2CFramework.WebAPI.Models;


namespace Translators.C2CFramework.WebAPI.Controllers
{
    public class ChequeDetectionController : ApiController
    {
        [Route("ChequeDetection")]
        [HttpGet]
        public LiveChequePath ChequeDetection(string liveChequePath1)
        {
            
            DirectoryInfo firstfile = new DirectoryInfo(HttpContext.Current.Server.MapPath("~/ChequeImageData/ArchievedCheques/"));
            FileInfo[] garbagefiles = firstfile.GetFiles("1*");
            if(garbagefiles.Count() != 0)
            {
                File.Delete(HttpContext.Current.Server.MapPath(@"~/ChequeImageData/ArchievedCheques/") + garbagefiles[0]);
            }
            
            //mycode
            var directory = new DirectoryInfo(HttpContext.Current.Server.MapPath("~/LiveChequeImageData/"));
            var myFile = (from f in directory.GetFiles()
                          orderby f.LastWriteTime descending
                          select f).First();

            string deleteLiveChequePath = myFile.ToString();
            var appDataPath = HttpContext.Current.Server.MapPath(@"~/ChequeImageData/ArchievedCheques/");
            myFile.CopyTo(appDataPath + myFile,true );

            var path = HttpContext.Current.Server.MapPath("~/LiveChequeImageData/");
            File.Delete(path + deleteLiveChequePath);

            FileInfo[] files;
            DirectoryInfo directoryInfo;

            directoryInfo = new DirectoryInfo(HttpContext.Current.Server.MapPath("~/ChequeImageData/ArchievedCheques/"));


            files = directoryInfo.GetFiles("*.jpg");

            ChequeProcess chequeProcess = new ChequeProcess();
            LiveChequePath liveChequePath  = new LiveChequePath();
            liveChequePath.LiveChequeImageFrontPath = liveChequePath1;
            return chequeProcess.ProcessImages(files, liveChequePath);
        }
    }
}