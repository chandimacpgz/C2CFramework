using System;
using System.Collections.Generic;
using System.Linq;

namespace Translators.C2CFramework.WebAPI.ChequeMatch
{
    public class RgbProjections
    {
        private readonly double[] horizontalProjection;
        private readonly double[] verticalProjection;

        internal RgbProjections(double[][] projections)
            : this(projections[0], projections[1])
        {
        }

        internal RgbProjections(double[] horizontalProjection, double[] verticalProjection)
        {
            this.horizontalProjection = horizontalProjection;
            this.verticalProjection = verticalProjection;
        }

        public double[] HorizontalProjection
        {
            get 
            { 
                return horizontalProjection; 
            }            
        }

        public double[] VerticalProjection
        {
            get 
            { 
                return verticalProjection; 
            }            
        }
        
        public double CalculateSimilarity(RgbProjections compare) 
        {
            var horizontalSimilarity = CalculateProjectionSimilarity(horizontalProjection, compare.horizontalProjection);
            var verticalSimilarity = CalculateProjectionSimilarity(verticalProjection, compare.verticalProjection);
            return Math.Max(horizontalSimilarity, verticalSimilarity);            
        }
        
        private static double CalculateProjectionSimilarity(double[] source, double[] compare)
        {
            if (source.Length != compare.Length)
            {
                throw new ArgumentException();
            }

            var frequencies = new Dictionary<double, int>();

            for (var i = 0; i < source.Length; i++) 
            {
                var difference = source[i] - compare[i];
                difference = Math.Round(difference, 2);
                difference = Math.Abs(difference);
                if (frequencies.ContainsKey(difference))
                {
                    frequencies[difference] = frequencies[difference] + 1;
                }
                else
                {
                    frequencies.Add(difference, 1);
                }
            }

            var deviation = frequencies.Sum(value => (value.Key * value.Value));

            deviation /= source.Length;

            deviation = (0.5 - deviation) * 2;

            return deviation;
        }
    }
}