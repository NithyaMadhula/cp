using System;
using System.Configuration;
using System.Data.Common;

namespace IGT.Oauth.Utils
{
    public class DbConnectionFactory
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
                    DbProviderFactory factory =
                        DbProviderFactories.GetFactory(connectionString.ProviderName);

                    connection = factory.CreateConnection();
                    connection.ConnectionString = connectionString.ConnectionString;
                }
                catch (Exception ex)
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