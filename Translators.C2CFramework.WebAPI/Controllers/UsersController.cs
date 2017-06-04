using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Translators.C2CFramework.WebAPI.DAL.Repositories;
using Translators.C2CFramework.WebAPI.MICR;
using Translators.C2CFramework.WebAPI.Models;

namespace Translators.C2CFramework.WebAPI.Controllers
{
    public class UsersController : ApiController
    {
        private UserRepository _userRepository;

        public UsersController()
        {
            _userRepository = new UserRepository();
        }

        //[Route("ATMs")]
        //[HttpGet]
        //public List<ATM> Get()
        //{
        //    return _atmRepository.GetATMs();
        //}

        //[Route("ATMs/{id}")]
        //[HttpGet]
        //public ATM Get(int id)
        //{
        //    return _atmRepository.GetSingleATM(id);
        //}

        [Route("Users")]
        [HttpPost]
        public User Post([FromBody]LiveChequePath liveChequePath)
        {
            MICRProcess micr = new MICRProcess();
            int AccountNumber = Convert.ToInt32(micr.GetAccountNumber(liveChequePath.MICRCroppedImagePath));
            return _userRepository.GetUserByAccountNumber(AccountNumber);
        }

        //[Route("ATMs")]
        //[HttpPut]
        //public bool Put([FromBody]ATM atm)
        //{
        //    return _atmRepository.UpdateATM(atm);
        //}

        //[Route("ATMs/{id}")]
        //[HttpDelete]
        //public bool Delete(int id)
        //{
        //    return _atmRepository.DeleteATM(id);
        //}
    }
}
