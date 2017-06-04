using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using Translators.C2CFramework.WebAPI.ChequeCrop;
using Translators.C2CFramework.WebAPI.DAL.Repositories;
using Translators.C2CFramework.WebAPI.Enum;
using Translators.C2CFramework.WebAPI.Models;

namespace Translators.C2CFramework.WebAPI.Controllers
{
    public class LiveChequePathsController : ApiController
    {
        private LiveChequePathRepository _liveChequePathRepository;

        public LiveChequePathsController()
        {
            _liveChequePathRepository = new LiveChequePathRepository();
        }

        [Route("LiveChequeImageName")]
        [HttpGet]
        public string GetImageName()
        {
            var path = HttpContext.Current.Server.MapPath("~/LiveChequeImageData/");
            var directory = new DirectoryInfo(HttpContext.Current.Server.MapPath("~/LiveChequeImageData/"));
            //var myFile = (from f in directory.GetFiles()
            //              orderby f.LastWriteTime descending
            //              select f).First();
            if(Directory.EnumerateFiles(path).Any())
            {
                var myFile = (from f in directory.GetFiles()
                              orderby f.LastWriteTime descending
                              select f).First();
                return myFile.ToString();
            }
            else
            {
                return null;
            }
            
        }

        [Route("DeleteLiveChequeImage")]
        [HttpGet]
        public string DeleteLiveChequeImage(string ChequeName)
        {
            var path = HttpContext.Current.Server.MapPath("~/LiveChequeImageData/");
            System.IO.File.Delete(path + ChequeName);
            return "done";

        }

        [Route("LiveChequePaths")]
        [HttpGet]
        public List<LiveChequePath> Get()
        {
            return _liveChequePathRepository.GetLiveChequePaths();
        }

        [Route("LiveChequePaths/{id}")]
        [HttpGet]
        public LiveChequePath Get(int id)
        {
            return _liveChequePathRepository.GetSingleLiveChequePath(id);
        }

        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("LiveChequePaths")]
        [HttpPost]
        public LiveChequePath Post([FromBody]LiveChequePath liveChequePath)
        {
            Dictionary<string, string> pathList = new Dictionary<string, string>();
            CropPointsController loadCropPoints = new CropPointsController();
            CropPoint cropPointData = new CropPoint();
            LiveChequeCrop liveChequeCrop = new LiveChequeCrop();

            cropPointData.BankId = liveChequePath.BankId;
            cropPointData.ChequeId = liveChequePath.ChequeId;
            
            foreach (var CropId in CropTypeFactory.CropTypes)
            {
                cropPointData.CropType = CropId;
                CropPoint CropPoints = loadCropPoints.GetByCropType(cropPointData);
                if(CropPoints == null)
                {
                    return liveChequePath;
                }
                pathList.Add(cropPointData.CropType.ToString(), liveChequeCrop.SaveCroppedImage(liveChequePath.LiveChequeImageFrontPath, CropId, CropPoints));

                switch (CropId)
                {
                    case CropType.NumericalAmount:
                        liveChequePath.NumericalAmountCroppedImagePath = pathList["NumericalAmount"];
                        break;
                    case CropType.Amount:
                        liveChequePath.AmountCroppedImagePath = pathList["Amount"];
                        break;
                    case CropType.Date:
                        liveChequePath.DateCroppedImagePath = pathList["Date"];
                        break;
                    case CropType.MICR:
                        liveChequePath.MICRCroppedImagePath = pathList["MICR"];
                        break;
                    case CropType.Payee:
                        liveChequePath.PayeeCroppedImagePath = pathList["Payee"];
                        break;
                    case CropType.Signature:
                        liveChequePath.SignatureCroppedImagePath = pathList["Signature"];
                        break;
                }
            }
            var directory = new DirectoryInfo(HttpContext.Current.Server.MapPath("~/ChequeImageData/ArchievedCheques/"));
            var myFile = (from f in directory.GetFiles()
                          orderby f.LastWriteTime descending
                          select f).Last();


            var path = HttpContext.Current.Server.MapPath("~/ChequeImageData/ArchievedCheques/");
            string fullpath = path + Path.GetFileName(liveChequePath.LiveChequeImageFrontPath);
            var streamSource = new System.IO.FileStream(path + myFile, FileMode.Open, FileAccess.Read);
            streamSource.Close();
            //File.Delete(path + myFile.ToString());
            /////////////////////////////////////////////////////////////////////////////////////////////delete cheque from Archieved Cheque Folder

            //string des = HttpContext.Current.Server.MapPath("~/BackupLiveCheques/");
            //ChequeRepository c = new ChequeRepository();

            //var chequeFileName = c.GetSingleCheque(liveChequePath.ChequeId);
            ////string deletePath = path + Path.GetFileName(liveChequePath.LiveChequeImageFrontPath);
            //File.Copy(path + Path.GetFileName(liveChequePath.LiveChequeImageFrontPath), des + Path.GetFileName(liveChequePath.LiveChequeImageFrontPath));
            //File.Delete(path + Path.GetFileName(liveChequePath.LiveChequeImageFrontPath));
            return _liveChequePathRepository.InsertLiveChequePath(liveChequePath);
        }

        [Route("LiveChequePaths")]
        [HttpPut]
        public LiveChequePath Put([FromBody]LiveChequePath liveChequePath)
        {
            return _liveChequePathRepository.UpdateLiveChequePath(liveChequePath);
        }

        [Route("LiveChequePaths/{id}")]
        [HttpDelete]
        public bool Delete(int id)
        {
            return _liveChequePathRepository.DeleteLiveChequePath(id);
        }
        

    }
}
