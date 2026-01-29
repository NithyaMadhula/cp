using System.Configuration;

namespace IGT.CustomerPortal.API.DAL
{
    public sealed class DBHelper
    {
        private static DBHelper instance = null;
        private static readonly object padlock = new object();

        DBHelper()
        {
        }

        public static DBHelper Instance
        {
            get
            {
                lock (padlock)
                {
                    if (instance == null)
                    {
                        instance = new DBHelper();
                    }
                    return instance;
                }
            }
        }

        public string GetConnectionString(string name = "Default")
        {
            return ConfigurationManager.ConnectionStrings[name].ConnectionString;
        }
    }
}
