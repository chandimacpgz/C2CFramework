using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using Translators.C2CFramework.WebAPI.DAL.Interfaces;
using Translators.C2CFramework.WebAPI.Models;

namespace Translators.C2CFramework.WebAPI.DAL.Repositories
{
    public class ChequeRepository:IChequeRepository
    {
        private readonly IDbConnection _db;

        public ChequeRepository()
        {
            _db = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
        }
        public List<Cheque> GetCheques()
        {
            return _db.Query<Cheque>("Cheques_Get", commandType: CommandType.StoredProcedure).ToList();
        }

        public Cheque GetSingleCheque(int id)
        {
            return _db.Query<Cheque>("Cheques_GetById",
                new
                {
                    Id = id
                }, commandType: CommandType.StoredProcedure).SingleOrDefault();
        }

        public Cheque GetChequeId(int bankId, string archievedChequeFrontPath)
        {
            return _db.Query<Cheque>("Cheques_GetByBankIdFrontPath",
                new
                {
                    BankId = bankId,
                    ArchievedChequeFrontPath = archievedChequeFrontPath
                }, commandType: CommandType.StoredProcedure).SingleOrDefault();
        }

        public bool InsertCheque(Cheque cheque)
        {
            int rowsAffected = this._db.Execute("Cheques_Add",
                new
                {
                    Name = cheque.Name,
                    BankId = cheque.BankId,
                    ArchievedChequeFrontPath = cheque.ArchievedChequeFrontPath,
                    ArchievedChequeBackPath = cheque.ArchievedChequeBackPath,
                    DimensionX = cheque.DimensionX,
                    DimensionY = cheque.DimensionY
                }, commandType: CommandType.StoredProcedure);

            if (rowsAffected > 0)
            {
                return true;
            }

            return false;
        }

        public bool DeleteCheque(int id)
        {
            int rowsAffected = this._db.Execute("Cheques_Delete",
                new { Id = id }, commandType: CommandType.StoredProcedure);

            if (rowsAffected > 0)
            {
                return true;
            }

            return false;
        }

        public bool UpdateCheque(Cheque cheque)
        {
            int rowsAffected = this._db.Execute("Cheques_Update",
                new
                {
                    Id = cheque.Id,
                    Name = cheque.Name,
                    BankId = cheque.BankId,
                    ArchievedChequeFrontPath = cheque.ArchievedChequeFrontPath,
                    ArchievedChequeBackPath = cheque.ArchievedChequeBackPath,
                    DimensionX = cheque.DimensionX,
                    DimensionY = cheque.DimensionY
                }, commandType: CommandType.StoredProcedure);

            if (rowsAffected > 0)
            {
                return true;
            }

            return false;
        }

        public Cheque GetChequeDataByChequePath(string path)
        {
            return _db.Query<Cheque>("Cheques_GetByChequePath",
                new
                {
                    ArchievedChequeFrontPath = path
                }, commandType: CommandType.StoredProcedure).SingleOrDefault();
        }
    }
}