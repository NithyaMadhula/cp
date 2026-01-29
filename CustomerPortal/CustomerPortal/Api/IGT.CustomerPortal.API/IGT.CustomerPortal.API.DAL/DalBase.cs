using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public abstract class DalBase
    {
        public static async Task<IDbConnection> OpenConnection(string name = "Default")
        {
            var connection = new SqlConnection(DBHelper.Instance.GetConnectionString(name));
            await connection.OpenAsync();
            return connection;
        }

        public static void CloseConnection(IDbConnection connection)
        {
            if (connection.State != ConnectionState.Open) return;
            connection.Close();
        }
    }
}
