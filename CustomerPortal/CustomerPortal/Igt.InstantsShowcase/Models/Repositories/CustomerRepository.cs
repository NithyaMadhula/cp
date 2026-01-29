using Dapper;
using Igt.InstantsShowcase.Models;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class CustomerRepository : Repository
    {
        public CustomerRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<Customer>> List(int domesticOrInternationalId)
        {
            string sql = "dbo.spLottery_GetCustomerList";
            List<Customer> list = null;

            using (var conn = OpenConnection())
            {
                try
                {
                    var temp = await conn.QueryAsync(
                            sql,
                            new { isInternational = domesticOrInternationalId }, 
                            commandType: CommandType.StoredProcedure);

                    if (temp.Any())
                    {
                        list = new List<Customer>();
                        foreach (var item in temp)
                        {
                            list.Add(new Customer
                            {
                                Code = item.CustomerCode,
                                Name = item.BusinessName,
                                LogoUri = item.LogoPath,
                                SubdivisionCode = item.SubDivisionCode
                            });
                        }
                    }
                }
                finally
                {
                    CloseConnection(conn);
                }
            }

            return list;
        }

        public async Task<CustomerLogo> GetLogo(string code)
        {
            string sql = "spLottery_GetLogo";
            CustomerLogo model = null;

            using (var conn = OpenConnection())
            {
                try
                {
                    var temp = await conn.QueryFirstOrDefaultAsync(
                            sql,
                            new { CustomerCode = code },
                            commandType: CommandType.StoredProcedure);

                    if (temp != null)
                    {
                        model = new CustomerLogo
                        {
                            Name = temp.BusinessName,
                            LogoPath = temp.LogoPath
                        };
                    }
                }
                finally
                {
                    CloseConnection(conn);
                }
            }

            return model;
        }

        public async Task<IEnumerable<int>> ListYear(string customerCode)
        {
            string sql = "dbo.spLottery_GetYearByCustomerCode";
            List<int> list = null;

            using (var conn = OpenConnection())
            {
                try
                {
                    var temp = await conn.QueryAsync(
                            sql,
                            new { CustomerCode = customerCode },
                            commandType: CommandType.StoredProcedure);

                    if (temp.Any())
                    {
                        list = new List<int>();
                        foreach (var item in temp)
                        {
                            list.Add(item.Year);
                        }
                    }
                }
                finally
                {
                    CloseConnection(conn);
                }
            }

            return list;
        }

        public async Task<IEnumerable<TicketPriceByCustomer>> ListTicketPrice(string customerCode)
        {
            string sql = "dbo.spLottery_GetTicketPriceByCustomerCode";
            List<TicketPriceByCustomer> list = null;

            using (var conn = OpenConnection())
            {
                try
                {
                    var temp = await conn.QueryAsync(
                            sql,
                            new { CustomerCodes = customerCode },
                            commandType: CommandType.StoredProcedure);

                    if (temp.Any())
                    {
                        list = new List<TicketPriceByCustomer>();
                        foreach (var item in temp)
                        {
                            var properties = (IDictionary<string, object>)item;

                            list.Add(new TicketPriceByCustomer
                            {
                                RawPricePoint = GetValue<decimal>(properties, "Raw Price Point"),
                                TicketPrice = GetValue<string>(properties, "TicketPrice"),
                                PricePoint = GetValue<decimal>(properties, "Price Point")
                            });
                        }
                    }
                }
                finally
                {
                    CloseConnection(conn);
                }
            }

            return list;
        }

        public async Task<IEnumerable<Color>> ListColor(string customerCode)
        {
            string sql = "spColor_GetListByCustomer";
            List<Color> list = null;

            using (var conn = OpenConnection())
            {
                try
                {
                    var temp = await conn.QueryAsync(
                            sql,
                            new { CustomerCode = customerCode },
                            commandType: CommandType.StoredProcedure);

                    if (temp.Any())
                    {
                        list = new List<Color>();
                        foreach (var item in temp)
                        {
                            list.Add(new Color
                            {
                                Id = item.ColorID,
                                Name = item.ColorName
                            });
                        }
                    }
                }
                finally
                {
                    CloseConnection(conn);
                }
            }

            return list;
        }

        public async Task<IEnumerable<PlayStyle>> ListPlayStyle(string customerCode)
        {
            string sql = "spPlaystyle_GetListByCustomer";
            List<PlayStyle> list = null;

            using (var conn = OpenConnection())
            {
                try
                {
                    var temp = await conn.QueryAsync(
                            sql,
                            new { CustomerCode = customerCode },
                            commandType: CommandType.StoredProcedure);

                    if (temp.Any())
                    {
                        list = new List<PlayStyle>();
                        foreach (var item in temp)
                        {
                            list.Add(new PlayStyle
                            {
                                Id = item.PlaystyleID,
                                Name = item.PlaystyleName
                            });
                        }
                    }
                }
                finally
                {
                    CloseConnection(conn);
                }
            }

            return list;
        }

        public async Task<IEnumerable<Theme>> ListTheme(string customerCode)
        {
            string sql = "spTheme_GetListByCustomer";
            List<Theme> list = null;

            using (var conn = OpenConnection())
            {
                try
                {
                    var temp = await conn.QueryAsync(
                            sql,
                            new { CustomerCode = customerCode },
                            commandType: CommandType.StoredProcedure);

                    if (temp.Any())
                    {
                        list = new List<Theme>();
                        foreach (var item in temp)
                        {
                            list.Add(new Theme
                            {
                                Id = item.ThemeID,
                                Name = item.ThemeName
                            });
                        }
                    }
                }
                finally
                {
                    CloseConnection(conn);
                }
            }

            return list;
        }



    }
}
