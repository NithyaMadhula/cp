using Igt.InstantsShowcase.Models.Application;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Igt.InstantsShowcase.Models.Repositories
{
    /// <summary>
    /// 
    /// </summary>
    public class BaseRepository 
    {
        private IDbConfig Config { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="config"></param>
        public BaseRepository(IDbConfig config)
        {
            Config = config;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="getData"></param>
        /// <returns></returns>
        protected async Task<T> WithConnection<T>(Func<IDbConnection, Task<T>> getData)
        {
            try
            {
                using var connection = new SqlConnection(Config.ConnectionString);
                await connection.OpenAsync();
                return await getData(connection);
            }
            catch (TimeoutException ex)
            {
                throw new Exception($"{GetType().FullName} - Connection Timeout", ex);
            }
            catch (SqlException ex)
            {
                throw new Exception($"{GetType().FullName} - Database Error", ex);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dictionary"></param>
        /// <param name="key"></param>
        /// <returns></returns>
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
                    return dictionary[key] != null ? (T)Convert.ChangeType(dictionary[key], typeof(T)) : default;
                }
            }
            catch
            {
                return default;
            }
        }
    }
}
