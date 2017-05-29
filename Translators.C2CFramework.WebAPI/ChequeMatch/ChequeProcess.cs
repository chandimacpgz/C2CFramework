using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using Translators.C2CFramework.WebAPI.DAL.Repositories;
using Translators.C2CFramework.WebAPI.Models;

namespace Translators.C2CFramework.WebAPI.ChequeMatch
{
    public class ChequeProcess
    {
        private ChequeRepository _chequeRepository = new ChequeRepository();

        public LiveChequePath ProcessImages(FileInfo[] files, LiveChequePath liveChequePath)
        {

            var comparableImages = new List<ComparableImage>();

            foreach (var file in files)
            {
                var comparableImage = new ComparableImage(file);
                comparableImages.Add(comparableImage);
            }

            var similarityImagesSorted = new List<SimilarityImages>();

            for (var j = 1; j < comparableImages.Count; j++)
            {
                var source = comparableImages[0];      //Match with the first image of the Cheque List
                var destination = comparableImages[j];
                var similarity = source.CalculateSimilarity(destination);
                var sim = new SimilarityImages(source, destination, similarity);

                similarityImagesSorted.Add(sim);
            }

            similarityImagesSorted.Sort();
            similarityImagesSorted.Reverse();

            if (similarityImagesSorted[0].Similarity >= 85)
            {
                string selectedCheque = similarityImagesSorted[0].Destination.ToString();
                Cheque selectedChequeData = _chequeRepository.GetChequeDataByChequePath(selectedCheque);
                liveChequePath.ChequeId = selectedChequeData.Id;
                liveChequePath.BankId = selectedChequeData.BankId;
                
                return liveChequePath;
            }

            else
            {
                System.Console.Write("No Matching Cheque in DB");
                return liveChequePath;
            }



        }

        ~ChequeProcess(){
            var directory = new DirectoryInfo(HttpContext.Current.Server.MapPath(@"~/ChequeImageData/ArchievedCheques/"));
            var myFile = (from f in directory.GetFiles()
                          orderby f.LastWriteTime descending
                          select f).First();
            //while (IsFileLocked(myFile))
            //    Thread.Sleep(1000);
            File.Delete(Path.Combine(directory.ToString(), myFile.ToString()));
        }
    }
}