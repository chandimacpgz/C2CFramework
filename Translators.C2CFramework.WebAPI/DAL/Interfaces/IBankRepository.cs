using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Translators.C2CFramework.WebAPI.Models;

namespace Translators.C2CFramework.WebAPI.DAL.Interfaces
{
    internal interface IBankRepository
    {
        List<Bank> GetBanks();
        Bank GetSingleBank(int id);
        bool InsertBank(Bank bank);
        bool DeleteBank(int id);
        bool UpdateBank(Bank bank);
    }
}
