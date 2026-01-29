using System.Data.Common;

namespace IGT.Utils.Databases
{
    public interface IDbConnectionFactory
    {
        DbConnection GetConnectionByName(string name);
    }
}
