﻿using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using Translators.C2CFramework.WebAPI.Models;
using Translators.C2CFramework.WebAPI.DAL.Interfaces;
using System;

namespace Translators.C2CFramework.WebAPI.DAL.Repositories
{
    public class LiveChequePathRepository:ILiveChequePathRepository
    {
        private readonly IDbConnection _db;

        public LiveChequePathRepository()
        {
            _db = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
        }

        public bool DeleteLiveChequePath(int id)
        {
            int rowsAffected = this._db.Execute("LiveChequePaths_Delete",
                new { Id = id }, commandType: CommandType.StoredProcedure);

            if (rowsAffected > 0)
            {
                return true;
            }

            return false;
        }

        public List<LiveChequePath> GetLiveChequePaths()
        {
            return _db.Query<LiveChequePath>("LiveChequePaths_Get", commandType: CommandType.StoredProcedure).ToList();
        }

        public LiveChequePath GetSingleLiveChequePath(int id)
        {
            return _db.Query<LiveChequePath>("LiveChequePaths_GetById",
                new
                {
                    Id = id
                }, commandType: CommandType.StoredProcedure).SingleOrDefault();
        }

        public LiveChequePath InsertLiveChequePath(LiveChequePath liveChequePath)
        {
            int rowsAffected = this._db.Execute("LiveChequePaths_Add",
                new
                {
                    BankId = liveChequePath.BankId,
                    ChequeId = liveChequePath.ChequeId,
                    NumericalAmountCroppedImagePath = liveChequePath.NumericalAmountCroppedImagePath,
                    AmountCroppedImagePath = liveChequePath.AmountCroppedImagePath,
                    DateCroppedImagePath = liveChequePath.DateCroppedImagePath,
                    MICRCroppedImagePath = liveChequePath.MICRCroppedImagePath,
                    PayeeCroppedImagePath = liveChequePath.PayeeCroppedImagePath,
                    SignatureCroppedImagePath = liveChequePath.SignatureCroppedImagePath,
                    LiveChequeImageFrontPath = liveChequePath.LiveChequeImageFrontPath,
                    LiveChequeImageBackPath = liveChequePath.LiveChequeImageBackPath
                }, commandType: CommandType.StoredProcedure);

            if (rowsAffected > 0)
            {
                return liveChequePath;
            }

            return liveChequePath;
        }

        public LiveChequePath UpdateLiveChequePath(LiveChequePath liveChequePath)
        {
            int rowsAffected = this._db.Execute("LiveChequePaths_Update",
                   new
                   {
                       Id = liveChequePath.Id,
                       BankId = liveChequePath.BankId,
                       ChequeId = liveChequePath.ChequeId,
                       NumericalAmountCroppedImagePath = liveChequePath.NumericalAmountCroppedImagePath,
                       AmountCroppedImagePath = liveChequePath.AmountCroppedImagePath,
                       DateCroppedImagePath = liveChequePath.DateCroppedImagePath,
                       MICRCroppedImagePath = liveChequePath.MICRCroppedImagePath,
                       PayeeCroppedImagePath = liveChequePath.PayeeCroppedImagePath,
                       SignatureCroppedImagePath = liveChequePath.SignatureCroppedImagePath,
                       LiveChequeImageFrontPath = liveChequePath.LiveChequeImageFrontPath,
                       LiveChequeImageBackPath = liveChequePath.LiveChequeImageBackPath
                   }, commandType: CommandType.StoredProcedure);

            if (rowsAffected > 0)
            {
                return liveChequePath;
            }

            return liveChequePath;
        }
    }
}