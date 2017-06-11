using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Translators.C2CFramework.WebAPI.DAL.Interfaces;
using Translators.C2CFramework.WebAPI.Models;

namespace Translators.C2CFramework.WebAPI.DAL.Repositories
{
    public class UserRepository:IUserRepository
    {
        private readonly IDbConnection _db;

        public UserRepository()
        {
            _db = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
        }

        public User GetUserByAccountNumber(string AccountNumber)
        {
            return _db.Query<User>("Users_GetByAccountNumber",
                new
                {
                    AccountNumber = AccountNumber

                }, commandType: CommandType.StoredProcedure).SingleOrDefault();
        }
    }
}