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
            string AccountNumber = "";
            try
            {
                
                AccountNumber = micr.GetAccountNumber(liveChequePath.MICRCroppedImagePath).Substring(0, 10);

                //test purpose
                //string fakeaccountNo = "1500045100";
                //AccountNumber = fakeaccountNo;

                detectedUser = _userRepository.GetUserByAccountNumber(AccountNumber);

                DateProcess dateVal = new DateProcess();
                string detDate = dateVal.CheckDate(liveChequePath.DateCroppedImagePath);
                detectedUser.DetectedDate = detDate.Remove(detDate.Length - 2);
                return detectedUser;
            }
            catch(Exception e)
            {
                User detectedUser1 = new User();
                detectedUser1.Path = AccountNumber;
                detectedUser1.Id = 0;
                return detectedUser1;
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
            string result = "";
            CourtesyAmountProcess ca = new CourtesyAmountProcess();
            string fullResult = ca.GetCourtesyAmount(courtesyeData.Path);
            if(fullResult != "")
            {
                result = fullResult.Remove(fullResult.Length - 2);
            }
            
            return result;
        }

        [Route("Users/LegalAmount")]
        [HttpPost]
        public string PostAmount([FromBody]User legalData)
        {
            string full = "";
            LegalAmountProcess la = new LegalAmountProcess();
            string result = la.GetLegalAmount(legalData.Path);
            if (result != "")
            {
                full = result.Remove(result.Length - 8);
            }
            return full;
        }
    }
}
