using Dapper;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class CustomIndexRepository : Repository
    {
        public CustomIndexRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<CustomIndexBasic>> ListBasic(string customerCode, decimal ticketPrice,
            DateTime startDate, DateTime endDate, int indexWeek)
        {
            const string sql = "spLottery_GetIndexBasicSearch";
            SetDapperCustomMapping();

            endDate = endDate == DateTime.MinValue ? DateTime.Now : endDate;

            IEnumerable<CustomIndexBasic> list = null;
            using (var conn = OpenConnection())
            {
                list = await conn.QueryAsync<CustomIndexBasic>(
                        sql,
                        new
                        {
                            customerCode,
                            ticketPrice,
                            startDate,
                            endDate,
                            indexWeek
                        },
                        commandType: CommandType.StoredProcedure);
            }

            return list;
        }

        public async Task<IEnumerable<CustomIndexAdvanced>> ListAdvanced(string customerCode,
            int indexWeek, string ticketPrice, DateTime startDate, DateTime endDate,
            int scoreMin, int scoreMax, int isExcludeCrossword, int isExcludeBingo,
            int isExcludeHoliday, int isLicensedProperty, int themeID, int featureID, int playStyleID,
            string gameName, string topPrizeAmt)
        {
            const string sql = "spLottery_GetIndexAdvancedSearch";
            SetDapperCustomMapping();

            IEnumerable<CustomIndexAdvanced> list = null;

            using (var conn = OpenConnection())
            {
                try
                {
                    list = await conn.QueryAsync<CustomIndexAdvanced>(
                            sql,
                            new
                            {
                                CustomerCode = customerCode,
                                TicketPrice = ticketPrice,
                                StartDate = startDate,
                                EndDate = endDate,
                                IndexWeek = indexWeek,
                                ScoreMin = scoreMin,
                                ScoreMax = scoreMax,
                                IsExcludeCrossword = isExcludeCrossword,
                                IsExcludeBingo = isExcludeHoliday,
                                ISExcludeHoliday = isExcludeHoliday,
                                IsLicensedProperty = isLicensedProperty,
                                ThemeID = themeID,
                                FeatureID = featureID,
                                PlayStyleID = playStyleID,
                                GameName = gameName,
                                TopPrizeAmt = topPrizeAmt
                            },
                            commandType: CommandType.StoredProcedure);
                }
                finally
                {
                    CloseConnection(conn);
                }
            }

            return list;
        }

        void SetDapperCustomMapping()
        {
            var columnMaps = new Dictionary<string, string>
            {
                { "Average Sales", "AverageSales" },
                { "Standard Index", "StandardIndex" },
                { "Average RoS", "AverageRoS" },
                { "RoS Index", "RosIndex" },
                { "Active Penetration", "ActivePenetration" }
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (columnMaps.ContainsKey(columnName))
                    return type.GetProperty(columnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var customIndexBasicMap = new CustomPropertyTypeMap(
                typeof(CustomIndexBasic),
                (type, columnName) => mapper(type, columnName)
                );

            var customIndexAdvancedMap = new CustomPropertyTypeMap(
                typeof(CustomIndexAdvanced),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(CustomIndexBasic), customIndexBasicMap);
            SqlMapper.SetTypeMap(typeof(CustomIndexAdvanced), customIndexAdvancedMap);
        }
    }
}
