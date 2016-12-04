using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using Translators.C2CFramework.WebAPI.Models;
using Translators.C2CFramework.WebAPI.DAL.Interfaces;
using System;
using Translators.C2CFramework.WebAPI.Enum;

namespace Translators.C2CFramework.WebAPI.DAL.Repositories
{
    public class CropPointRepository:ICropPointRepository
    {
        private readonly IDbConnection _db;

        public CropPointRepository()
        {
            _db = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
        }

        public bool DeleteCropPoint(int id)
        {
            int rowsAffected = this._db.Execute("CropPoints_Delete",
                new { Id = id }, commandType: CommandType.StoredProcedure);

            if (rowsAffected > 0)
            {
                return true;
            }

            return false;
        }

        public List<CropPoint> GetCropPoints()
        {
            return _db.Query<CropPoint>("CropPoints_Get", commandType: CommandType.StoredProcedure).ToList();
        }

        public CropPoint GetSingleCropPoint(int id)
        {
            return _db.Query<CropPoint>("CropPoints_GetById",
                new
                {
                    Id = id
                }, commandType: CommandType.StoredProcedure).SingleOrDefault();
        }

        public CropPoint GetCropPointsByCropType(CropPoint cropPoint)
        {
            string singleCropType = cropPoint.CropType.ToString();
            return _db.Query<CropPoint>("CropPoints_GetByCropType",
                new
                {
                    BankId = cropPoint.BankId,
                    ChequeId = cropPoint.ChequeId,
                    SingleCropType = singleCropType

                }, commandType: CommandType.StoredProcedure).SingleOrDefault();
        }

        public bool InsertCropPoint(CropPoint cropPoint)
        {
            int rowsAffected = this._db.Execute("CropPoints_Add",
                new
                {
                    CropType = cropPoint.CropType,
                    BankId = cropPoint.BankId,
                    ChequeId = cropPoint.ChequeId,
                    CropStartX = cropPoint.CropStartX,
                    CropStartY = cropPoint.CropStartY,
                    CropWidth = cropPoint.CropWidth,
                    CropHeight = cropPoint.CropHeight

                }, commandType: CommandType.StoredProcedure);

            if (rowsAffected > 0)
            {
                return true;
            }

            return false;
        }

        public bool UpdateCropPoint(CropPoint cropPoint)
        {
            int rowsAffected = this._db.Execute("CropPoints_Update",
                new
                {
                    Id = cropPoint.Id,
                    CropType = cropPoint.CropType,
                    BankId = cropPoint.BankId,
                    ChequeId = cropPoint.ChequeId,
                    CropStartX = cropPoint.CropStartX,
                    CropStartY = cropPoint.CropStartY,
                    CropWidth = cropPoint.CropWidth,
                    CropHeight = cropPoint.CropHeight
                }, commandType: CommandType.StoredProcedure);

            if (rowsAffected > 0)
            {
                return true;
            }

            return false;
        }
    }
}