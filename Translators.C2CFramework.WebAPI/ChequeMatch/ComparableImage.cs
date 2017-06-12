using System;
using System.Drawing;
using System.IO;

namespace Translators.C2CFramework.WebAPI.ChequeMatch
{
    public class ComparableImage
    {
        private readonly FileInfo file;
        private readonly RgbProjections projections;

        public ComparableImage(FileInfo file)
        {
            if (file == null)
            {
                throw new ArgumentNullException("file");
            }

            if (!file.Exists)
            {
                throw new FileNotFoundException();
            }

            this.file = file;

            using (var bitmap = ImageUtility.ResizeBitmap(new Bitmap(file.FullName), 100, 100))
            {
                projections = new RgbProjections(ImageUtility.GetRgbProjections(bitmap));
            }
        }

        public FileInfo File
        {
            get
            {
                return file;
            }
        }

        public RgbProjections Projections
        {
            get
            {
                return projections;
            }
        }

        public double CalculateSimilarity(ComparableImage compare)
        {
            return projections.CalculateSimilarity(compare.projections);
        }

        public override string ToString()
        {
            return file.Name;
        }
    }
}
