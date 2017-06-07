using System;
using System.IO;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Occulem.Core.DataAccess.Formatters
{
    public class DynamicXmlFormatter : MediaTypeFormatter
    {
        public DynamicXmlFormatter()
        {
            SupportedMediaTypes.Add(
                new MediaTypeHeaderValue("application/xml"));
            SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/xml"));
        }

        public override bool CanReadType(Type type)
        {
            if (type == (Type)null)
                throw new ArgumentNullException("type");

            return true;
        }

        public override bool CanWriteType(Type type)
        {
            return true;
        }

        public override Task WriteToStreamAsync(Type type, object value,
            Stream writeStream, System.Net.Http.HttpContent content,
            System.Net.TransportContext transportContext)
        {

            return Task.Factory.StartNew(() =>
            {
                var name = type.Name;
                if (type.GenericTypeArguments.Length > 0)
                {
                    name = type.GenericTypeArguments[0].Name;
                }
                var json = "{\"" + name + "\":" + JsonConvert.SerializeObject(value) + "}";

                var xml = type.GenericTypeArguments.Length > 0 ? JsonConvert.DeserializeXmlNode(json, "Root") : JsonConvert.DeserializeXmlNode(json);
                xml.Save(writeStream);
            });
        }
    }
}
