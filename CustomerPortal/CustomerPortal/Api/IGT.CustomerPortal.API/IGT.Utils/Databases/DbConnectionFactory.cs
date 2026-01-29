using System.Configuration;
using System.Data.Common;

namespace IGT.Utils.Databases
{
    public class DbConnectionFactory : IDbConnectionFactory
    {
        public DbConnection GetConnectionByName(string name)
        {
            DbConnection connection = null;
            var connectionString = ConfigurationManager.ConnectionStrings[name];
            // Create the DbProviderFactory and DbConnection.
            if (connectionString != null)
            {
                try
                {
                    DbProviderFactory factory = DbProviderFactories.GetFactory(connectionString.ProviderName);

                    connection = factory.CreateConnection();
                    connection.ConnectionString = connectionString.ConnectionString;
                }
                catch 
                {
                    // Set the connection to null if it was created.
                    if (connection != null)
                    {
                        connection = null;
                    }
                }
            }
            // Return the connection.
            return connection;
        }

    }
}
