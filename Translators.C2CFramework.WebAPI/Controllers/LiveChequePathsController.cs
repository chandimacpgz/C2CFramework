using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
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

        [Route("LiveChequePaths")]
        [HttpPost]
        public bool Post([FromBody]LiveChequePath liveChequePath)
        {
            CropPointsController loadCropPoints = new CropPointsController();
            CropPoint cropPointData = new CropPoint();
            LiveChequeCrop liveChequeCrop = new LiveChequeCrop();

            cropPointData.BankId = liveChequePath.BankId;
            cropPointData.ChequeId = liveChequePath.ChequeId;
            
            foreach (var CropId in CropTypeFactory.CropTypes)
            {
                cropPointData.CropType = CropId;
                CropPoint CropPoints = loadCropPoints.GetByCropType(cropPointData);
                liveChequeCrop.SaveCroppedImage(liveChequePath.LiveChequeImageFrontPath, CropId,CropPoints);
            }

            return _liveChequePathRepository.InsertLiveChequePath(liveChequePath);
        }

        [Route("LiveChequePaths")]
        [HttpPut]
        public bool Put([FromBody]LiveChequePath liveChequePath)
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
