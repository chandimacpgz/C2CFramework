using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Translators.C2CFramework.WebAPI.DAL.Interfaces;
using Translators.C2CFramework.WebAPI.Models;

namespace Translators.C2CFramework.WebAPI.DAL.Repositories
{
    public class ATMRepository:IATMRepository
    {
        private readonly IDbConnection _db;

        public ATMRepository()
        {
            _db = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
        }

        public bool DeleteATM(int id)
        {
            int rowsAffected = this._db.Execute("ATMs_Delete",
                new { Id = id }, commandType: CommandType.StoredProcedure);

            if (rowsAffected > 0)
            {
                return true;
            }

            return false;
        }

        public List<ATM> GetATMs()
        {
            return _db.Query<ATM>("ATMs_Get", commandType: CommandType.StoredProcedure).ToList();
        }

        public ATM GetSingleATM(int id)
        {
            return _db.Query<ATM>("ATMs_GetById",
                new
                {
                    Id = id
                }, commandType: CommandType.StoredProcedure).SingleOrDefault();
        }

        public bool InsertATM(ATM atm)
        {
            int rowsAffected = this._db.Execute("ATMs_Add",
                new
                {
                    Name = atm.Name,
                    BankId = atm.BankId
                }, commandType: CommandType.StoredProcedure);

            if (rowsAffected > 0)
            {
                return true;
            }

            return false;
        }

        public bool UpdateATM(ATM atm)
        {
            int rowsAffected = this._db.Execute("ATMs_Update",
                new
                {
                    Id = atm.Id,
                    Name = atm.Name,
                    BankId = atm.BankId
                }, commandType: CommandType.StoredProcedure);

            if (rowsAffected > 0)
            {
                return true;
            }

            return false;
        }
    }
}