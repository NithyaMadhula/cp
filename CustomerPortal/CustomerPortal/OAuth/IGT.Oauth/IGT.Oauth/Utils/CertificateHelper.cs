using System;
using System.Security.Cryptography.X509Certificates;

namespace IGT.Oauth.Utils
{
    public class CertificateHelper
    {
        public static X509Certificate2 Load()
        {
            return new X509Certificate2(
                string.Format(@"{0}\resources\certificate.pfx", AppDomain.CurrentDomain.BaseDirectory), "dev_igt");
        }
    }
}