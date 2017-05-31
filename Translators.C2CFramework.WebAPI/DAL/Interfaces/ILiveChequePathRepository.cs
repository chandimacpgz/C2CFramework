using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Translators.C2CFramework.WebAPI.Models;

namespace Translators.C2CFramework.WebAPI.DAL.Interfaces
{
    internal interface ILiveChequePathRepository
    {
        List<LiveChequePath> GetLiveChequePaths();
        LiveChequePath GetSingleLiveChequePath(int id);
        LiveChequePath InsertLiveChequePath(LiveChequePath liveChequePath);
        bool DeleteLiveChequePath(int id);
        LiveChequePath UpdateLiveChequePath(LiveChequePath liveChequePath);
    }
}
