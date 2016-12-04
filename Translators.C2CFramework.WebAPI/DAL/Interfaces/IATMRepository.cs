using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Translators.C2CFramework.WebAPI.Models;

namespace Translators.C2CFramework.WebAPI.DAL.Interfaces
{
    internal interface IATMRepository
    {
        List<ATM> GetATMs();
        ATM GetSingleATM(int id);
        bool InsertATM(ATM atm);
        bool DeleteATM(int id);
        bool UpdateATM(ATM atm);
    }
}
