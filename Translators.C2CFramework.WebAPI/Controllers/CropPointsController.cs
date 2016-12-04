using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Translators.C2CFramework.WebAPI.DAL.Repositories;
using Translators.C2CFramework.WebAPI.Enum;
using Translators.C2CFramework.WebAPI.Models;

namespace Translators.C2CFramework.WebAPI.Controllers
{
    public class CropPointsController : ApiController
    {
        private CropPointRepository _cropPointRepository;

        public CropPointsController()
        {
            _cropPointRepository = new CropPointRepository();
        }

        [Route("CropPoints")]
        [HttpGet]
        public List<CropPoint> Get()
        {
            return _cropPointRepository.GetCropPoints();
        }
        
        public CropPoint GetByCropType(CropPoint cropPoint)
        {
            return _cropPointRepository.GetCropPointsByCropType(cropPoint);
        }

        [Route("CropPoints/{id}")]
        [HttpGet]
        public CropPoint Get(int id)
        {
            return _cropPointRepository.GetSingleCropPoint(id);
        }

        [Route("CropPoints")]
        [HttpPost]
        public bool Post([FromBody]CropPoint cropPoint)
        {
            return _cropPointRepository.InsertCropPoint(cropPoint);
        }

        [Route("CropPoints")]
        [HttpPut]
        public bool Put([FromBody]CropPoint cropPoint)
        {
            return _cropPointRepository.UpdateCropPoint(cropPoint);
        }

        [Route("CropPoints/{id}")]
        [HttpDelete]
        public bool Delete(int id)
        {
            return _cropPointRepository.DeleteCropPoint(id);
        }
    }
}
