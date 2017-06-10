using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Matlab.SignatureVerification;
using MathWorks.MATLAB.NET.Utility;
using MathWorks.MATLAB.NET.Arrays;
using System.IO;

namespace Translators.C2CFramework.WebAPI.Signature
{
    public class SignatureProcess
    {
        public bool GetSignature(string SignaturePath, int UserId)
        {
            #region MATLAB
            var signaturePath = HttpContext.Current.Server.MapPath(SignaturePath);
            Matlab.SignatureVerification.Signature sig = new Matlab.SignatureVerification.Signature();
            MWArray mw = sig.main(signaturePath, UserId);

            if (Convert.ToInt32(mw) > 0.5)
            {
                return true;
            }
            else
            {
                return false;
            }
            #endregion
            
        }
    }
}