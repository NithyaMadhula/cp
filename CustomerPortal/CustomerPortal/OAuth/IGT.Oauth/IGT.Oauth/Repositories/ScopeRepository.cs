using Dapper;
using IdentityServer3.Core.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace IGT.Oauth.Repositories
{
    public class ScopeRepository : Repository

    {
        public ScopeRepository(Func<IDbConnection> openConnection) : base(openConnection)
        {
        }

        public void Insert(IEnumerable<Scope> scopes)
        {
            #region SQL
            StringBuilder sql = new StringBuilder();
            sql.Append("INSERT INTO [dbo].[Scopes] ( ");
            sql.Append("[Enabled] ");
            sql.Append(",[Name] ");
            sql.Append(",[DisplayName] ");
            sql.Append(",[Description] ");
            sql.Append(",[Required] ");
            sql.Append(",[Emphasize] ");
            sql.Append(",[Type] ");
            sql.Append(",[IncludeAllClaimsForUser] ");
            sql.Append(",[ClaimsRule] ");
            sql.Append(",[ShowInDiscoveryDocument] ");
            sql.Append(",[AllowUnrestrictedIntrospection] ");
            sql.Append(") VALUES ( ");
            sql.Append("@Enabled ");
            sql.Append(",@Name ");
            sql.Append(",@DisplayName ");
            sql.Append(",@Description ");
            sql.Append(",@Required ");
            sql.Append(",@Emphasize ");
            sql.Append(",@Type ");
            sql.Append(",@IncludeAllClaimsForUser ");
            sql.Append(",@ClaimsRule ");
            sql.Append(",@ShowInDiscoveryDocument ");
            sql.Append(",@AllowUnrestrictedIntrospection ");
            sql.Append("); ");
            sql.Append("SELECT CAST(SCOPE_IDENTITY() as int); ");
            #endregion

            using (var connection = OpenConnection())
            {
                foreach (var scope in scopes)
                {
                    var id = connection.Query<int>(sql.ToString(), scope).Single();
                    InsertScopeClaims(id, scope.Claims, connection);
                    InsertScopeSecrets(id, scope.ScopeSecrets, connection);
                }
            }
        }

        void InsertScopeClaims(int id, IEnumerable<ScopeClaim> claims, IDbConnection connection)
        {
            #region SQL
            StringBuilder sql = new StringBuilder();
            sql.Append("INSERT INTO[dbo].[ScopeClaims] ( ");
            sql.Append("[Name] ");
            sql.Append(",[Description] ");
            sql.Append(",[AlwaysIncludeInIdToken] ");
            sql.Append(",[Scope_Id] ");
            sql.Append(") VALUES ( ");
            sql.Append("@Name ");
            sql.Append(",@Description ");
            sql.Append(",@AlwaysIncludeInIdToken ");
            sql.Append(",@Scope_Id ");
            sql.Append(") ");
            #endregion
            foreach (var claim in claims)
            {
                connection.Execute(sql.ToString(), new { claim.Name, claim.Description, claim.AlwaysIncludeInIdToken, Scope_Id = id });
            }
        }

        void InsertScopeSecrets(int id, IEnumerable<Secret> secrets, IDbConnection connection)
        {
            #region SQL
            StringBuilder sql = new StringBuilder();
            sql.Append("INSERT INTO[dbo].[ScopeSecrets] (");
            sql.Append("[Description] ");
            sql.Append(",[Expiration] ");
            sql.Append(",[Type] ");
            sql.Append(",[Value] ");
            sql.Append(",[Scope_Id] ");
            sql.Append(") VALUES ( ");
            sql.Append("@Description ");
            sql.Append(",@Expiration ");
            sql.Append(",@Type ");
            sql.Append(",@Value ");
            sql.Append(",@Scope_Id ");
            sql.Append(") ");
            #endregion
            foreach (var secret in secrets)
            {
                connection.Execute(sql.ToString(), new { secret.Description, secret.Expiration, secret.Type, secret.Value, Scope_Id = id });
            }
        }


    }
}