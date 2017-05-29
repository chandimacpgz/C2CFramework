using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Translators.C2CFramework.WebAPI.Models;

namespace Translators.C2CFramework.WebAPI.DAL.Interfaces
{
    internal interface IChequeRepository
    {
        List<Cheque> GetCheques();
        Cheque GetSingleCheque(int id);
        Cheque GetChequeDataByChequePath(string path);
        bool InsertCheque(Cheque cheque);
        bool DeleteCheque(int id);
        bool UpdateCheque(Cheque cheque);
    }
}
