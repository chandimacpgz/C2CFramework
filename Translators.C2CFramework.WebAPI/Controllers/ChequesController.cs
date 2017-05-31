using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
        public void Post([FromBody]HttpContext context)
        {
            if (context.Request.Files.Count > 0)
            {
                HttpFileCollection files = context.Request.Files;
                var userName = context.Request.Form["name"];
                for (int i = 0; i < files.Count; i++)
                {
                    HttpPostedFile file = files[i];

                    string fname = context.Server.MapPath("Uploads\\" + userName.ToUpper() + "\\" + file.FileName);
                    file.SaveAs(fname);
                }
            }
            context.Response.ContentType = "text/plain";
            context.Response.Write("File/s uploaded successfully!");
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
