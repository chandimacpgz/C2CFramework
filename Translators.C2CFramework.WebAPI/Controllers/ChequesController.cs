using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Translators.C2CFramework.WebAPI.DAL.Repositories;
using Translators.C2CFramework.WebAPI.Models;

namespace Translators.C2CFramework.WebAPI.Controllers
{
    public class ChequesController : ApiController
    {
        private ChequeRepository _chequeRepository;

        public ChequesController()
        {
            _chequeRepository = new ChequeRepository();
        }

        [Route("Cheques")]
        [HttpGet]
        public List<Cheque> Get()
        {
            return _chequeRepository.GetCheques();
        }

        [Route("Cheques/{id}")]
        [HttpGet]
        public Cheque Get(int id)
        {
            return _chequeRepository.GetSingleCheque(id);
        }

        [Route("Cheques")]
        [HttpPost]
        public async Task<HttpResponseMessage> Post()
        {
            string Name = "";
            int BankId = 0;
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }
            string root = HttpContext.Current.Server.MapPath("~/ChequeImageData/ArchievedCheques/");
            var provider = new MultipartFormDataStreamProvider(root);

            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);
                
                // Show all the key-value pairs.
                foreach (var key in provider.FormData.AllKeys)
                {
                    foreach (var val in provider.FormData.GetValues(key))
                    {
                        if(key == "name")
                        {
                            Name = val;
                        }

                        if(key == "bankId")
                        {
                            BankId = Convert.ToInt32(val);
                        }
                    }
                }

                foreach (MultipartFileData file in provider.FileData)
                {
                    string des = Path.GetDirectoryName(file.LocalFileName) +"\\"+ Name + ".jpg";
                    File.Copy(file.LocalFileName, des, true);
                    File.Delete(file.LocalFileName);
                }
                Cheque cheque = new Cheque();
                cheque.Name = Name;
                cheque.BankId = BankId;
                cheque.ArchievedChequeFrontPath = Name + ".jpg";
                _chequeRepository.InsertCheque(cheque);
                Cheque cheque1 = new Cheque();
                cheque1 = _chequeRepository.GetChequeId(cheque.BankId, cheque.ArchievedChequeFrontPath);
                return Request.CreateResponse(cheque1);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
            

            //return _chequeRepository.InsertCheque(cheque);
        }

        [Route("Cheques")]
        [HttpPut]
        public bool Put([FromBody]Cheque cheque)
        {
            return _chequeRepository.UpdateCheque(cheque);
        }

        [Route("Cheques/{id}")]
        [HttpDelete]
        public bool Delete(int id)
        {
            return _chequeRepository.DeleteCheque(id);
        }
    }
}
