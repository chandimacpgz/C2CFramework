using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using Translators.C2CFramework.WebAPI.DAL.Repositories;
using Translators.C2CFramework.WebAPI.Models;

namespace Translators.C2CFramework.WebAPI.ChequeMatch
{
    public class ChequeProcess
    {
        private ChequeRepository _chequeRepository;

        public void ProcessImages(FileInfo[] files)
        {
            
            var comparableImages = new List<ComparableImage>();

            foreach (var file in files)
            {
                var comparableImage = new ComparableImage(file);
                comparableImages.Add(comparableImage);
            }

            var similarityImagesSorted = new List<SimilarityImages>();

            for (var i = 0; i < comparableImages.Count - 1; i++)
            {
                for (var j = i + 1; j < comparableImages.Count; j++)
                {
                    var source = comparableImages[0];      //Match with the first image of the Cheque List
                    var destination = comparableImages[j];
                    var similarity = source.CalculateSimilarity(destination);
                    var sim = new SimilarityImages(source, destination, similarity);

                    similarityImagesSorted.Add(sim);
                }
            }

            similarityImagesSorted.Sort();
            similarityImagesSorted.Reverse();

            foreach (var item in similarityImagesSorted)
            {
                if (item.Similarity >= 90)
                {
                    string selectedCheque = item.Destination.ToString();

                    Cheque selectedChequeData = _chequeRepository.GetChequeDataByChequePath(selectedCheque);
    }
                else
                {
                    System.Console.Write("No Matching Cheque in DB");
                } 
            }
            
        }
    }
}