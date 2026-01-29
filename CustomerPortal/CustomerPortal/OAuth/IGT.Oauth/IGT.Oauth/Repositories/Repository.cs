using System;
using System.Data;

namespace IGT.Oauth.Repositories
{
    public abstract class Repository
    {
        protected readonly Func<IDbConnection> OpenConnection;

        protected Repository(Func<IDbConnection> openConnection)
        {
            OpenConnection = openConnection;
        }
    }
}