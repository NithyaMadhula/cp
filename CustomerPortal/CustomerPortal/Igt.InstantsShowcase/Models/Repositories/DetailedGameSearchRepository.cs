using Dapper;
using Igt.InstantsShowcase.Models;
using IGT.Utils.Databases;
using System;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.Reflection;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class DetailedGameSearchRepository : Repository
    {
        public DetailedGameSearchRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<DetailedGameSearch>> List(string customerCode, string gameName,
            int ticketPrice = -1, int year = -1, string theme = null, string color = null, string playStyle = null, int pagesize = -1, int pageindex = -1)
        {
            string sql = "spGame_GetDetailedDataByGameSearch";
            SetDapperCustomMapping();

            IEnumerable<DetailedGameSearch> result = new List<DetailedGameSearch>();

            dynamic param = new ExpandoObject();
            if (!string.IsNullOrEmpty(customerCode))
            {
                param.CustomerCode = customerCode;
            }
            param.GameName = gameName;
            param.TicketPrice = ticketPrice;
            param.Year = year;
            param.Theme = theme;
            param.Color = color;
            param.PlayStyle = playStyle;
            if (pageindex != -1 && pagesize != -1)
            {
                param.PageSize = pagesize;
                param.PageIndex = pageindex;
            }

            using (var connection = OpenConnection())
            {
                result = await connection.QueryAsync<DetailedGameSearch>(
                        sql,
                        (object)param,
                        commandType: CommandType.StoredProcedure);
            }


            return result;
        }

        public IEnumerable<DetailedGameSearch> Test(string customerCode, string gameName,
            int ticketPrice = -1, int year = -1, string theme = null, string color = "", string playStyle = "", int pagesize = -1, int pageindex = -1)
        {
            string sql = "spGame_GetDetailedDataByGameSearch";
            SetDapperCustomMapping();

            IEnumerable<DetailedGameSearch> result = new List<DetailedGameSearch>();

            dynamic param = new ExpandoObject();
            if (!string.IsNullOrEmpty(customerCode))
            {
                param.CustomerCode = customerCode;
            }
            param.GameName = gameName;
            param.TicketPrice = ticketPrice;
            param.Year = year;
            param.ThemeID = theme;
            param.ColorID = color;
            param.PlayStyle = playStyle;
            if (pageindex != -1 && pagesize != -1)
            {
                param.PageSize = pagesize;
                param.PageIndex = pageindex;
            }

            using (var connection = OpenConnection())
            {
                result = connection.Query<DetailedGameSearch>(
                        sql,
                        (object)param,
                        commandType: CommandType.StoredProcedure);
            }


            return result;
        }

        public async Task<IEnumerable<ConceptDetailedGameSearch>> ListConcept(string customerCode, string gameName = null,
            int ticketPrice = -1, int theme = -1, int color = -1, int playStyle = -1, int feature = -1,
            int pagesize = -1, int pageindex = -1, string currencyCode = null)
        {
            string sql = "spConcept_GetDetailsByGameSearch";
            SetDapperCustomMapping();

            IEnumerable<ConceptDetailedGameSearch> result = new List<ConceptDetailedGameSearch>();

            //           @CustomerCode nvarchar(10) = NULL,
            //@GameName nvarchar(100) = NULL,    
            //@TicketPrice money = -1,
            //   @Theme nvarchar(100) = NULL,  
            //@PlayAction nvarchar(100) = NULL,  
            //@SpecialtyOption nvarchar(100) = NULL, 
            //@PageIndex int = NULL,
            //   @PageSize int = NULL

            dynamic param = new ExpandoObject();
            //param.CustomerCode = customer;
            //param.GameName = gameName;
            //param.TicketPrice = ticketPrice;
            //param.Theme = theme;
            //param.ColorID = color;
            //param.PlayStyleID = playStyle;
            //param.FeatureID = feature;
            if (pageindex != -1 && pagesize != -1)
            {
                param.PageSize = pagesize;
                param.PageIndex = pageindex;
            }
            if (!string.IsNullOrEmpty(currencyCode))
            {
                param.CurrencyCode = currencyCode;
            }

            using (var connection = OpenConnection())
            {
                result = await connection.QueryAsync<ConceptDetailedGameSearch>(
                        sql,
                        new
                        {
                            customerCode
                        },
                        commandType: CommandType.StoredProcedure);
            }

            return result;
        }

        /// <summary>
        /// Deprecated - use ListMetadata<Field>
        /// </summary>
        /// <param name="customerCode"></param>
        /// <returns></returns>
        public async Task<IEnumerable<DetailedGameSearch>> ListMetadata(string customerCode)
        {
            string sql = "spGame_GetDetailsByCustomerCode";

            object param = null;
            if (!string.IsNullOrEmpty(customerCode))
            {
                param = new { CustomerCode = customerCode };
            }

            IEnumerable<DetailedGameSearch> reader;
            using (var connection = OpenConnection())
            {
                reader = await connection.QueryAsync<DetailedGameSearch>(
                        sql,
                        param,
                        commandType: CommandType.StoredProcedure);
            }

            return reader;
        }

        public async Task<IEnumerable<string>> ListMetadataTicketPrice(string customerCode)
        {
            string sql = "spGame_GetTicketPriceByCustomer";

            object param = null;
            if (!string.IsNullOrEmpty(customerCode))
            {
                param = new { CustomerCode = customerCode };
            }

            IEnumerable<string> reader;
            using (var connection = OpenConnection())
            {
                reader = await connection.QueryAsync<string>(
                        sql,
                        param,
                        commandType: CommandType.StoredProcedure);
            }

            return reader;
        }

        public async Task<IEnumerable<string>> ListMetadataPrimaryColorName(string customerCode)
        {
            string sql = "spGame_GetPrimaryColorNameByCustomer";

            object param = null;
            if (!string.IsNullOrEmpty(customerCode))
            {
                param = new { CustomerCode = customerCode };
            }

            IEnumerable<string> reader;
            using (var connection = OpenConnection())
            {
                reader = await connection.QueryAsync<string>(
                        sql,
                        param,
                        commandType: CommandType.StoredProcedure);
            }

            return reader;
        }

        public async Task<IEnumerable<string>> ListMetadataPrimaryThemeName(string customerCode)
        {
            string sql = "spGame_GetPrimaryThemeNameByCustomer";

            object param = null;
            if (!string.IsNullOrEmpty(customerCode))
            {
                param = new { CustomerCode = customerCode };
            }

            IEnumerable<string> reader;
            using (var connection = OpenConnection())
            {
                reader = await connection.QueryAsync<string>(
                        sql,
                        param,
                        commandType: CommandType.StoredProcedure);
            }

            return reader;
        }

        public async Task<IEnumerable<string>> ListMetadataPrimaryPlayStyleName(string customerCode)
        {
            string sql = "spGame_GetPrimaryPlayStyleNameByCustomer";

            object param = null;
            if (!string.IsNullOrEmpty(customerCode))
            {
                param = new { CustomerCode = customerCode };
            }

            IEnumerable<string> reader;
            using (var connection = OpenConnection())
            {
                reader = await connection.QueryAsync<string>(
                        sql,
                        param,
                        commandType: CommandType.StoredProcedure);
            }

            return reader;
        }

        void SetDapperCustomMapping()
        {
            var columnMaps = new Dictionary<string, string>
            {
                { "Current Year Sales", "CurrentYearSales" },
                { "Last Year Sales", "LastYearSales" },
                { "Last 2 Year Sales", "Last2YearSales" }
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (columnMaps.ContainsKey(columnName))
                    return type.GetProperty(columnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var detailedGameSearchMap = new CustomPropertyTypeMap(
                typeof(DetailedGameSearch),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(DetailedGameSearch), detailedGameSearchMap);
        }

    }
}
