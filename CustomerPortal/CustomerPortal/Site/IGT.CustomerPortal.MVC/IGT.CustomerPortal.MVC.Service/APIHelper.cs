using System.Configuration;

namespace IGT.CustomerPortal.MVC.Service
{
    public sealed class APIHelper
    {
        private static APIHelper instance = null;
        private static readonly object padlock = new object();

        APIHelper()
        {
        }

        public static APIHelper Instance
        {
            get
            {
                lock (padlock)
                {
                    if (instance == null)
                    {
                        instance = new APIHelper();
                    }
                    return instance;
                }
            }
        }

        public string GetBaseAddress()
        {
            return ConfigurationManager.AppSettings.Get("ApiBaseAddress");
        }
    }
}
