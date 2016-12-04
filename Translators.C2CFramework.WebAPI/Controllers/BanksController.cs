using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Translators.C2CFramework.WebAPI.DAL.Repositories;
using Translators.C2CFramework.WebAPI.Models;

namespace Translators.C2CFramework.WebAPI.Controllers
{
    public class BanksController : ApiController
    {
        private BankRepository _bankRepository;

        public BanksController()
        {
            _bankRepository = new BankRepository();
        }

        // GET: /Banks
        [Route("Banks")]
        [HttpGet]
        public List<Bank> Get()
        {
            return _bankRepository.GetBanks();
        }
        // GET: /Banks/5
        [Route("Banks/{id}")]
        [HttpGet]
        public Bank Get(int id)
        {
            return _bankRepository.GetSingleBank(id);
        }

        // POST: /Banks
        [Route("Banks")]
        [HttpPost]
        public bool Post([FromBody]Bank bank)
        {
            //return true;
            return _bankRepository.InsertBank(bank);
        }

        // PUT: /Banks
        [Route("Banks")]
        [HttpPut]
        public bool Put([FromBody]Bank bank)
        {
            return _bankRepository.UpdateBank(bank);
        }

        // DELETE: /Banks/5
        [Route("Banks/{id}")]
        [HttpDelete]
        public bool Delete(int id)
        {
            return _bankRepository.DeleteBank(id);
        }
    }
}