using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Translators.C2CFramework.WebAPI.CourtesyAmount;
using Translators.C2CFramework.WebAPI.DAL.Repositories;
using Translators.C2CFramework.WebAPI.Date;
using Translators.C2CFramework.WebAPI.MICR;
using Translators.C2CFramework.WebAPI.Models;
using Translators.C2CFramework.WebAPI.Signature;

namespace Translators.C2CFramework.WebAPI.Controllers
{
    public class UsersController : ApiController
    {
        private UserRepository _userRepository;

        public UsersController()
        {
            _userRepository = new UserRepository();
        }

        [Route("Users")]
        [HttpPost]
        public User Post([FromBody]LiveChequePath liveChequePath)
        {
            MICRProcess micr = new MICRProcess();
            int AccountNumber = Convert.ToInt32(micr.GetAccountNumber(liveChequePath.MICRCroppedImagePath));
            DateProcess dateVal = new DateProcess();
            bool DateValidity = dateVal.CheckDate(liveChequePath.DateCroppedImagePath);
            if (DateValidity)
            {
                return _userRepository.GetUserByAccountNumber(AccountNumber);
            }
            else
            {
                return null;
            }

        }

        [Route("Users/Signature")]
        [HttpPost]
        public bool PostSignature([FromBody]User signatureData)
        {
            SignatureProcess sig = new SignatureProcess();
            bool SignatureValidity = sig.GetSignature(signatureData.Path, signatureData.Id);
            return SignatureValidity;
        }

        [Route("Users/CourtesyAmount")]
        [HttpPost]
        public string PostNumericalAmount([FromBody]User courtesyeData)
        {
            CourtesyAmountProcess ca = new CourtesyAmountProcess();
            string result = ca.GetCourtesyAmount(courtesyeData.Path);
            return result;
        }
    }
}
