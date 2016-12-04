using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Translators.C2CFramework.WebAPI.DAL.Repositories;
using Translators.C2CFramework.WebAPI.Models;

namespace Translators.C2CFramework.WebAPI.Controllers
{
    public class ATMsController : ApiController
    {
        private ATMRepository _atmRepository;

        public ATMsController()
        {
            _atmRepository = new ATMRepository();
        }
        
        [Route("ATMs")]
        [HttpGet]
        public List<ATM> Get()
        {
            return _atmRepository.GetATMs();
        }

        [Route("ATMs/{id}")]
        [HttpGet]
        public ATM Get(int id)
        {
            return _atmRepository.GetSingleATM(id);
        }
        
        [Route("ATMs")]
        [HttpPost]
        public bool Post([FromBody]ATM atm)
        {
            return _atmRepository.InsertATM(atm);
        }
        
        [Route("ATMs")]
        [HttpPut]
        public bool Put([FromBody]ATM atm)
        {
            return _atmRepository.UpdateATM(atm);
        }
        
        [Route("ATMs/{id}")]
        [HttpDelete]
        public bool Delete(int id)
        {
            return _atmRepository.DeleteATM(id);
        }
    }
}
