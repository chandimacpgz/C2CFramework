using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace Translators.C2CFramework.WebAPI.MICR
{
    public class MICRProcess
    {
        public string GetAccountNumber(string MICRPath)
        {
            var micrPath = HttpContext.Current.Server.MapPath(MICRPath);
            string AccountNumber = run_cmd(@"D:\dev\C2CFrameworkWeb\Translators.C2CFramework\Translators.C2CFramework.WebAPI\MICR\rec2.py " + micrPath);
            return AccountNumber;
        }

        public static string run_cmd(string cmd)
        {
            ProcessStartInfo start = new ProcessStartInfo();
            start.FileName = @"C:\Python27\python.exe";
            start.WorkingDirectory = @"D:\dev\C2CFrameworkWeb\Translators.C2CFramework\Translators.C2CFramework.WebAPI\MICR";
            start.Arguments = cmd;
            start.UseShellExecute = false;
            start.RedirectStandardOutput = true;
            start.RedirectStandardError = true;

            Process process = Process.Start(start);
            process.WaitForExit();

            var err = process.StandardError?.ReadToEnd();
            var res = process.StandardOutput?.ReadToEnd();
            return res;
        }
    }
}