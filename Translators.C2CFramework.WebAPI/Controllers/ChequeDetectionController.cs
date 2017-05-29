using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using Translators.C2CFramework.WebAPI.ChequeMatch;

namespace Translators.C2CFramework.WebAPI.Controllers
{
    public class ChequeDetectionController : ApiController
    {
        [Route("ChequeDetection")]
        [HttpGet]
        public void ChequeDetection(string liveChequePath)
        {
            FileInfo[] files;
            DirectoryInfo directoryInfo;

            directoryInfo = new DirectoryInfo(HttpContext.Current.Server.MapPath("~/ChequeImageData/ArchievedCheques/"));
            files = directoryInfo.GetFiles("*.jpg", SearchOption.AllDirectories);

            ChequeProcess chequeProcess = new ChequeProcess();
            chequeProcess.ProcessImages(files);
        }
    }
}