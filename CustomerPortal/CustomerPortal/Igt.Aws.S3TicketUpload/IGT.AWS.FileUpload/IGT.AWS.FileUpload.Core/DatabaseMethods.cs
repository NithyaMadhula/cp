using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IGT.AWS.FileUpload.Core
{
    public static class DatabaseMethods
    {
        /// <summary>
        /// Executes an SQL stored procedure that returns a data table containing the results.
        /// </summary>
        /// <param name="connectionString">The connection string.</param>
        /// <param name="storedProcedure">The stored procedure.</param>
        /// <param name="timeout">The connection timeout.</param>
        /// <returns>
        /// The data table retrieved from the stored procedure call.
        /// </returns>
        public static DataTable ExecuteStoredProcedureNoParam(string connection, string storedProcedure, int timeout = 600)
        {
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection cnn = new SqlConnection(connection))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = storedProcedure;
                        cmd.CommandTimeout = timeout;
                        cmd.Connection = cnn;
                        cnn.Open();
                        SqlDataReader sadr = cmd.ExecuteReader();
                        if (sadr.HasRows)
                        {
                            dt.Load(sadr);
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }

            return dt;
        }

        /// <summary>
        /// Executes an SQL stored procedure that returns a data table containing the results.
        /// </summary>
        /// <param name="connectionString">The connection string.</param>
        /// <param name="storedProcedure">The stored procedure.</param>
        /// <param name="parameters">The parameters.</param>
        /// <param name="timeout">The connection timeout.</param>
        /// <returns>
        /// The data table retrieved from the stored procedure call.
        /// </returns>
        public static DataTable ExecuteStoredProcedure(string connection, string storedProcedure, SqlParameter[] parameters, int timeout = 600)
        {
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection cnn = new SqlConnection(connection))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = storedProcedure;
                        cmd.Parameters.AddRange(parameters);
                        cmd.CommandTimeout = timeout;
                        cmd.Connection = cnn;
                        cnn.Open();
                        SqlDataReader sadr = cmd.ExecuteReader();
                        if (sadr.HasRows)
                        {
                            dt.Load(sadr);
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }

            return dt;
        }

        /// <summary>
        /// Executes an SQL stored procedure that returns a scalar value and passes that value back to the caller.
        /// </summary>
        /// <param name="connectionString">The connection string.</param>
        /// <param name="storedProcedure">The stored procedure.</param>
        /// <param name="parameters">The parameters.</param>
        /// <param name="timeout">The connection timeout.</param>
        /// <returns>
        /// The scalar value retrieved from the stored procedure call.
        /// </returns>
        public static string ExecuteScalarStoredProcedure(string connection, string storedProcedure, SqlParameter[] parameters, int timeout = 600)
        {
            try
            {
                using (SqlConnection cnn = new SqlConnection(connection))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = storedProcedure;
                        cmd.Parameters.AddRange(parameters);
                        cmd.CommandTimeout = timeout;
                        cmd.Connection = cnn;
                        cnn.Open();
                        string data = cmd.ExecuteScalar()?.ToString();
                        return data;
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Executes an SQL stored procedure that returns a scalar value and passes that value back to the caller.
        /// </summary>
        /// <param name="connectionString">The connection string.</param>
        /// <param name="storedProcedure">The stored procedure.</param>
        /// <param name="parameters">The parameters.</param>
        /// <param name="timeout">The connection timeout.</param>
        /// <returns>
        /// The scalar value retrieved from the stored procedure call.
        /// </returns>
        public static int ExecuteNonQueryStoredProcedure(string connection, string storedProcedure, SqlParameter[] parameters, int timeout = 30)
        {
            try
            {
                using (SqlConnection cnn = new SqlConnection(connection))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        int _retVal;

                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = storedProcedure;
                        cmd.Parameters.AddRange(parameters);
                        cmd.CommandTimeout = timeout;
                        cmd.Connection = cnn;
                        cnn.Open();

                        int i = cmd.ExecuteNonQuery();

                        _retVal = Convert.ToInt32(cmd.Parameters["@RetVal"].Value);
                        return _retVal;
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
