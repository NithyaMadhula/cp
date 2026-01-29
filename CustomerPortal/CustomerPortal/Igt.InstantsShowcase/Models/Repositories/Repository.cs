using IGT.Utils.Databases;
using System;
using System.Collections.Generic;
using System.Data;

namespace IGT.CustomerPortal.API.DAL
{
    public abstract class Repository
    {
        protected readonly IDbConnectionFactory connectionFactory;

        public Repository(IDbConnectionFactory connectionFactory)
        {
            this.connectionFactory = connectionFactory;
        }

        public IDbConnection OpenConnection(string name = "Default")
        {
            var conn = connectionFactory.GetConnectionByName(name);
            conn?.Open();
            return conn;
        }

        public void CloseConnection(IDbConnection connection)
        {
            if (connection.State != ConnectionState.Open) return;
            connection.Close();
        }

        protected T GetValue<T>(IDictionary<string, object> dictionary, string key)
        {
            try
            {
                if (typeof(T).Equals(typeof(string)))
                {
                    return (T)Convert.ChangeType(dictionary[key].ToString().Trim(), typeof(T));
                }
                else
                {
                    return (T)Convert.ChangeType(dictionary[key], typeof(T));
                }
            }
            catch
            {
                return default(T);
            }
        }

        protected bool TryGetValue<T>(IDictionary<string, object> dictionary, string key, ref T result)
        {
            try
            {
                if (typeof(T).Equals(typeof(string)))
                {
                    result = (T)Convert.ChangeType(dictionary[key].ToString().Trim(), typeof(T));
                }
                else
                {
                    result = (T)Convert.ChangeType(dictionary[key], typeof(T));
                }
                return true;
            }
            catch { }
            return false;
        }
    }
}
