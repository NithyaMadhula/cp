using Dapper;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using System;
using System.Text;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class RegistrationUserRepository : Repository
    {
        public RegistrationUserRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<int> Insert(RegistrationUser model)
        {

            StringBuilder sb = new StringBuilder();
            sb.Append("INSERT INTO [dbo].[RegistrationUser] ( ");
            sb.Append("[Firstname] ");
            sb.Append(",[Lastname] ");
            sb.Append(",[Email] ");
            sb.Append(",[Jurisdiction] ");
            sb.Append(",[Lottery] ");
            sb.Append(",[Role] ");
            sb.Append(",[Password] ");
            sb.Append(") VALUES ( ");
            sb.Append("@FirstName ");
            sb.Append(",@LastName ");
            sb.Append(",@Email ");
            sb.Append(",@Jurisdiction ");
            sb.Append(",@Lottery ");
            sb.Append(",@Role ");
            sb.Append(",@Password ");
            sb.Append(")");
            int result = 0;
            using (var conn = OpenConnection())
            {
                try
                {
                    result = await conn.ExecuteAsync(sb.ToString(), model);
                }
                catch (Exception e)
                {
                    var a = e;
                }
                finally
                {
                    CloseConnection(conn);
                }
            }
            return result;
        }
    }
}
