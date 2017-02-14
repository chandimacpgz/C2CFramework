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
    public class BankRepository : IBankRepository
    {
        private readonly IDbConnection _db;

        public BankRepository()
        {
            _db = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
        }

        public List<Bank> GetBanks()
        {
            return _db.Query<Bank>("Banks_Get", commandType: CommandType.StoredProcedure).ToList();
        }

        public Bank GetSingleBank(int id)
        {
            return _db.Query<Bank>("Banks_GetById",
                new
                {
                    Id = id
                }, commandType: CommandType.StoredProcedure).SingleOrDefault();
        }

        public bool InsertBank(Bank bank)
        {
            int rowsAffected = this._db.Execute("Banks_Add",
                new
                {
                    Name = bank.Name,
                    Email = bank.Email
                }, commandType: CommandType.StoredProcedure);

            if (rowsAffected > 0)
            {
                return true;
            }

            return false;
        }

        public bool DeleteBank(int id)
        {
            int rowsAffected = this._db.Execute("Banks_Delete",
                new { Id = id }, commandType: CommandType.StoredProcedure);

            if (rowsAffected > 0)
            {
                return true;
            }

            return false;
        }

        public bool UpdateBank(Bank bank)
        {
            int rowsAffected = this._db.Execute("Banks_Update",
                new
                {
                    Id = bank.Id,
                    Name = bank.Name,
                    Email = bank.Email
                }, commandType: CommandType.StoredProcedure);

            if (rowsAffected > 0)
            {
                return true;
            }

            return false;
        }
    }
}