using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Translators.C2CFramework.WebAPI.Models;

namespace Translators.C2CFramework.WebAPI.DAL.Interfaces
{
    internal interface IUserRepository
    {
        User GetUserByAccountNumber(int AccountNumber);
    }
}