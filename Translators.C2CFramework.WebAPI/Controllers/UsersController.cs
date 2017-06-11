using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Translators.C2CFramework.WebAPI.CourtesyAmount;
using Translators.C2CFramework.WebAPI.DAL.Repositories;
using Translators.C2CFramework.WebAPI.Date;
using Translators.C2CFramework.WebAPI.LegalAmount;
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
            User detectedUser = new User();
            MICRProcess micr = new MICRProcess();
            try
            {
                
                string AccountNumber = micr.GetAccountNumber(liveChequePath.MICRCroppedImagePath).Substring(0, 10);
                detectedUser = _userRepository.GetUserByAccountNumber(AccountNumber);

                DateProcess dateVal = new DateProcess();
                string detDate = dateVal.CheckDate(liveChequePath.DateCroppedImagePath);
                detectedUser.DetectedDate = detDate.Remove(detDate.Length - 2);
            }
            catch(Exception e)
            {
                return detectedUser;
            }

            return detectedUser;
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
            string fullResult = ca.GetCourtesyAmount(courtesyeData.Path);
            string result = fullResult.Remove(fullResult.Length - 4);
            return result;
        }

        [Route("Users/LegalAmount")]
        [HttpPost]
        public string PostAmount([FromBody]User legalData)
        {
            LegalAmountProcess la = new LegalAmountProcess();
            string result = la.GetLegalAmount(legalData.Path);
            return result;
        }
    }
}
