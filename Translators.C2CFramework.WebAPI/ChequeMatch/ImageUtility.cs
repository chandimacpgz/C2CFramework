using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

namespace Translators.C2CFramework.WebAPI.ChequeMatch
{
    public static class ImageUtility
    {
        public static Bitmap ResizeBitmap(Bitmap bitmap, int width, int height)
        {
            var result = new Bitmap(width, height);
            using (var graphic = Graphics.FromImage((System.Drawing.Image)result))
            {
                graphic.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphic.DrawImage(bitmap, 0, 0, width - 1, height - 1);
            }

            return result;
        }
        
        public static double[][] GetRgbProjections(Bitmap bitmap)
        {
            var width = bitmap.Width - 1;
            var height = bitmap.Width - 1;

            var horizontalProjection = new double[width];
            var verticalProjection = new double[height];

            var bitmapData1 = bitmap.LockBits(new Rectangle(0, 0, bitmap.Width, bitmap.Height), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);

            unsafe
            {
                var imagePointer1 = (byte*)bitmapData1.Scan0;

                for (var y = 0; y < height; y++)
                {
                    for (var x = 0; x < width; x++)
                    {
                        var blu = imagePointer1[0];
                        var green = imagePointer1[1];
                        var red = imagePointer1[2];

                        int luminosity = (byte)(((0.2126 * red) + (0.7152 * green)) + (0.0722 * blu));

                        horizontalProjection[x] += luminosity;
                        verticalProjection[y] += luminosity;

                        imagePointer1 += 4;
                    }

                    imagePointer1 += bitmapData1.Stride - (bitmapData1.Width * 4);
                }
            }

            MaximizeScale(ref horizontalProjection, height);
            MaximizeScale(ref verticalProjection, width);

            var projections =
                new[]
                    {
                        horizontalProjection,
                        verticalProjection
                    };

            bitmap.UnlockBits(bitmapData1);
            return projections;
        }

        private static void MaximizeScale(ref double[] projection, double max)
        {
            var minValue = double.MaxValue;
            var maxValue = double.MinValue;

            for (var i = 0; i < projection.Length; i++)
            {
                if (projection[i] > 0)
                {
                    projection[i] = projection[i] / max;
                }

                if (projection[i] < minValue)
                {
                    minValue = projection[i];
                }

                if (projection[i] > maxValue)
                {
                    maxValue = projection[i];
                }
            }

            if (maxValue == 0)
            {
                return;
            }

            for (var i = 0; i < projection.Length; i++)
            {
                if (maxValue == 255)
                {
                    projection[i] = 1;
                }
                else
                {
                    projection[i] = (projection[i] - minValue) / (maxValue - minValue);
                }
            }
        }
    }
}