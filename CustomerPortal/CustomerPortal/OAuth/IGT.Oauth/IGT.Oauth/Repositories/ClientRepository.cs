using Dapper;
using IdentityServer3.Core.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace IGT.Oauth.Repositories
{
    public class ClientRepository : Repository

    {
        public ClientRepository(Func<IDbConnection> openConnection) : base(openConnection)
        {
        }

        public void Insert(IEnumerable<Client> clients)
        {
            #region SQL
            StringBuilder sql = new StringBuilder();
            sql.Append("INSERT INTO [dbo].[Clients] ");
            sql.Append(" ([Enabled] ");
            sql.Append(",[ClientId] ");
            sql.Append(",[ClientName] ");
            sql.Append(",[ClientUri] ");
            sql.Append(",[LogoUri] ");
            sql.Append(",[RequireConsent] ");
            sql.Append(",[AllowRememberConsent] ");
            sql.Append(",[Flow] ");
            sql.Append(",[AllowClientCredentialsOnly] ");
            sql.Append(",[LogoutUri] ");
            sql.Append(",[LogoutSessionRequired] ");
            sql.Append(",[RequireSignOutPrompt] ");
            sql.Append(",[AllowAccessToAllScopes] ");
            sql.Append(",[IdentityTokenLifetime] ");
            sql.Append(",[AccessTokenLifetime] ");
            sql.Append(",[AuthorizationCodeLifetime] ");
            sql.Append(",[AbsoluteRefreshTokenLifetime] ");
            sql.Append(",[SlidingRefreshTokenLifetime] ");
            sql.Append(",[RefreshTokenUsage] ");
            sql.Append(",[UpdateAccessTokenOnRefresh] ");
            sql.Append(",[RefreshTokenExpiration] ");
            sql.Append(",[AccessTokenType] ");
            sql.Append(",[EnableLocalLogin] ");
            sql.Append(",[IncludeJwtId] ");
            sql.Append(",[AlwaysSendClientClaims] ");
            sql.Append(",[PrefixClientClaims] ");
            sql.Append(",[AllowAccessToAllGrantTypes] ");
            sql.Append(") VALUES ( ");
            sql.Append("@Enabled ");
            sql.Append(",@ClientId ");
            sql.Append(",@ClientName ");
            sql.Append(",@ClientUri ");
            sql.Append(",@LogoUri ");
            sql.Append(",@RequireConsent ");
            sql.Append(",@AllowRememberConsent ");
            sql.Append(",@Flow ");
            sql.Append(",@AllowClientCredentialsOnly ");
            sql.Append(",@LogoutUri ");
            sql.Append(",@LogoutSessionRequired ");
            sql.Append(",@RequireSignOutPrompt ");
            sql.Append(",@AllowAccessToAllScopes ");
            sql.Append(",@IdentityTokenLifetime ");
            sql.Append(",@AccessTokenLifetime ");
            sql.Append(",@AuthorizationCodeLifetime ");
            sql.Append(",@AbsoluteRefreshTokenLifetime ");
            sql.Append(",@SlidingRefreshTokenLifetime ");
            sql.Append(",@RefreshTokenUsage ");
            //sql.Append(",@UpdateAccessTokenOnRefresh ");
            sql.Append(",1 ");
            sql.Append(",@RefreshTokenExpiration ");
            sql.Append(",@AccessTokenType ");
            sql.Append(",@EnableLocalLogin ");
            sql.Append(",@IncludeJwtId ");
            sql.Append(",@AlwaysSendClientClaims ");
            sql.Append(",@PrefixClientClaims ");
            //sql.Append(",@AllowAccessToAllGrantTypes ");
            sql.Append(",1 ");
            sql.Append("); ");
            sql.Append("SELECT CAST(SCOPE_IDENTITY() as int); ");
            #endregion

            using (var connection = OpenConnection())
            {
                foreach (var client in clients)
                {
                    var id = connection.Query<int>(sql.ToString(), client).Single();
                    InsertCorsOrigins(id, client.AllowedCorsOrigins, connection);
                    InsertCustomGrantTypes(id, client.AllowedCustomGrantTypes, connection);
                    InsertScopes(id, client.AllowedScopes, connection);
                    InsertClaims(id, client.Claims, connection);
                    InsertSecrets(id, client.ClientSecrets, connection);
                    InsertIdPRestrictions(id, client.IdentityProviderRestrictions, connection);
                    InsertPostLogoutRedirectUris(id, client.PostLogoutRedirectUris, connection);
                    InsertRedirectUris(id, client.RedirectUris, connection);
                }
            }
        }

        void InsertCorsOrigins(int id, IEnumerable<string> corsOrigins, IDbConnection connection) {
            #region SQL
            StringBuilder sql = new StringBuilder();
            sql.Append("INSERT INTO [dbo].[ClientCorsOrigins] ( ");
            sql.Append("[Origin] ");
            sql.Append(",[Client_Id]) ");
            sql.Append(") VALUES ( ");
            sql.Append("@Origin ");
            sql.Append(",@Client_Id ");
            sql.Append(") ");
            #endregion
            foreach (var origin in corsOrigins)
            {
                connection.Execute(sql.ToString(), new { Origin = origin, Client_Id = id });
            }
        }
    void InsertCustomGrantTypes(int id, IEnumerable<string> grants, IDbConnection connection) {
            #region SQL
            StringBuilder sql = new StringBuilder();
            sql.Append("INSERT INTO [dbo].[ClientCustomGrantTypes] ( ");
            sql.Append("[GrantType] ");
            sql.Append(",[Client_Id] ");
            sql.Append(") VALUES ( ");
            sql.Append("@GrantType ");
            sql.Append(", @Client_Id ");
            sql.Append(") ");
            #endregion
            foreach (var grant in grants)
            {
                connection.Execute(sql.ToString(), new { GrantType = grant, Client_Id = id });
            }
        }
    void InsertScopes(int id, IEnumerable<string> scopes, IDbConnection connection) {
            #region SQL
            StringBuilder sql = new StringBuilder();
            sql.Append("INSERT INTO [dbo].[ClientScopes] ( ");
            sql.Append("[Scope] ");
            sql.Append(",[Client_Id] ");
            sql.Append(") VALUES ( ");
            sql.Append("@Scope ");
            sql.Append(",@Client_Id ");
            sql.Append(") ");
            #endregion
            foreach (var scope in scopes)
            {
                connection.Execute(sql.ToString(), new { Scope = scope, Client_Id = id });
            }
        }
        void InsertClaims(int id, IEnumerable<Claim> claims, IDbConnection connection) {
            #region SQL
            StringBuilder sql = new StringBuilder();
            sql.Append("INSERT INTO [dbo].[ClientClaims] ( ");
            sql.Append("[Type] ");
            sql.Append(",[Value] ");
            sql.Append(",[Client_Id] ");
            sql.Append(") VALUES ( ");
            sql.Append("@Type ");
            sql.Append(",@Value ");
            sql.Append(",@Client_Id ");
            sql.Append(") ");
            #endregion
            foreach (var claim in claims)
            {
                connection.Execute(sql.ToString(), new { claim.Type, claim.Value, Client_Id = id });
            }
        }
    void InsertSecrets(int id, IEnumerable<Secret> secrets, IDbConnection connection) {
            #region SQL
            StringBuilder sql = new StringBuilder();
            sql.Append("INSERT INTO [dbo].[ClientSecrets] ( ");
            sql.Append("[Value] ");
            sql.Append(",[Type] ");
            sql.Append(",[Description] ");
            sql.Append(",[Expiration] ");
            sql.Append(",[Client_Id] ");
            sql.Append(") VALUES ( ");
            sql.Append("@Value ");
            sql.Append(",@Type ");
            sql.Append(",@Description ");
            sql.Append(",@Expiration ");
            sql.Append(",@Client_Id ");
            sql.Append(") ");
            #endregion
            foreach (var secret in secrets)
            {
                connection.Execute(sql.ToString(), new { secret.Type, secret.Value, secret.Description, secret.Expiration, Client_Id = id });
            }
        }
        void InsertIdPRestrictions(int id, IEnumerable<string> providers, IDbConnection connection)
        {
            #region SQL
            StringBuilder sql = new StringBuilder();
            sql.Append("INSERT INTO [dbo].[ClientIdPRestrictions] ( ");
            sql.Append("[Provider] ");
            sql.Append(",[Client_Id] ");
            sql.Append(") VALUES ( ");
            sql.Append("@Provider ");
            sql.Append(",@Client_Id, ");
            sql.Append(") ");
            #endregion
            foreach (var provider in providers)
            {
                connection.Execute(sql.ToString(), new { Provider = provider, Client_Id = id });
            }
        }
        void InsertPostLogoutRedirectUris(int id, IEnumerable<string> uris, IDbConnection connection) {
            #region SQL
            StringBuilder sql = new StringBuilder();
            sql.Append("INSERT INTO [dbo].[ClientPostLogoutRedirectUris] ( ");
            sql.Append("[Uri] ");
            sql.Append(",[Client_Id] ");
            sql.Append(") VALUES ( ");
            sql.Append("@Uri ");
            sql.Append(",@Client_Id ");
            sql.Append(")");
            #endregion
            foreach (var uri in uris)
            {
                connection.Execute(sql.ToString(), new { Uri = uri, Client_Id = id });
            }
        }
        void InsertRedirectUris(int id, IEnumerable<string> uris, IDbConnection connection) {
            #region SQL
            StringBuilder sql = new StringBuilder();
            sql.Append("INSERT INTO [dbo].[ClientRedirectUris] ( ");
            sql.Append("[Uri] ");
            sql.Append(",[Client_Id] ");
            sql.Append(") VALUES ( ");
            sql.Append("@Uri ");
            sql.Append(",@Client_Id ");
            sql.Append(") ");
            #endregion
            foreach (var uri in uris)
            {
                connection.Execute(sql.ToString(), new { Uri = uri, Client_Id = id });
            }

        }
    }
}