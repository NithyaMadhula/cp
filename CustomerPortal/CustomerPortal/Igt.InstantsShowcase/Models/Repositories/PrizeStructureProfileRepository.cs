using Dapper;
using IGT.CustomerPortal.API.DTO.Request;
using IGT.Utils.Databases;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class PrizeStructureProfileRepository : Repository
    {
        public PrizeStructureProfileRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {

        }

        public async Task<object> Get(PrizeStructureProfileRequest request)
        {
            using (var conn = OpenConnection())
            {
                try
                {
                    var results = new Dictionary<string, object>();
                    var customerOnly = new
                    {
                        request.CustomerCode,
                        request.TicketPrice,
                        request.StartDate,
                        request.EndDate
                    };

                    var customerExclusion = new
                    {
                        request.CustomerCode,
                        request.TicketPrice,
                        request.StartDate,
                        request.EndDate,
                        request.ExcludeGameID
                    };

                    string sql = "spLottery_GetPrizeStructureClassficationByCustomer";
                    results.Add("ClassficationByCustomer", (await conn.QueryAsync(
                            sql,
                            customerOnly,
                            commandType: CommandType.StoredProcedure)).ToList());

                    //sql = "spLottery_GetPrizeStructureClassficationByExclusion";
                    //results.Add("ClassficationByExclusion", (await conn.QueryAsync(
                    //        sql,
                    //        customerExclusion,
                    //        commandType: CommandType.StoredProcedure)).ToList());

                    sql = "spLottery_GetPrizeStructurePercentByExclusion";
                    results.Add("PercentByExclusion", (await conn.QueryAsync(
                            sql,
                            customerExclusion,
                            commandType: CommandType.StoredProcedure)).ToList());

                    sql = "spLottery_GetPrizeStructurePercentTotalByExclusion";
                    results.Add("PercentTotalByExclusion", (await conn.QueryAsync(
                            sql,
                            customerExclusion,
                            commandType: CommandType.StoredProcedure)).ToList());

                    sql = "spLottery_GetPrizeStructureTopPrizeByExclusion";
                    results.Add("TopPrizeByExclusion", (await conn.QueryAsync(
                            sql,
                            customerExclusion,
                            commandType: CommandType.StoredProcedure)).ToList());

                    sql = "spLottery_GetPrizeStructureGameNameByCustomer";
                    results.Add("Games", (await conn.QueryAsync(
                            sql,
                            customerOnly,
                            commandType: CommandType.StoredProcedure)).ToList());

                    sql = "spLottery_GetPrizeStructurePercentByCustomer";
                    results.Add("PercentByCustomer", (await conn.QueryAsync(
                            sql,
                            customerOnly,
                            commandType: CommandType.StoredProcedure)).ToList());

                    sql = "spLottery_GetPrizeStructurePercentTotalByCustomer";
                    results.Add("PercentTotalByCustomer", (await conn.QueryAsync(
                            sql,
                            customerOnly,
                            commandType: CommandType.StoredProcedure)).ToList());

                    sql = "spLottery_GetPrizeStructureTopPrizeByCustomer";
                    results.Add("TopPrizeByCustomer", (await conn.QueryAsync(
                            sql,
                            customerOnly,
                            commandType: CommandType.StoredProcedure)).ToList());

                    if (!String.IsNullOrWhiteSpace(request.CustomerCodes))
                    {
                        var customers = new
                        {
                            request.CustomerCodes,
                            request.TicketPrice,
                            request.StartDate,
                            request.EndDate,
                            request.ExcludeGameID
                        };

                        sql = "spLottery_GetPrizeStructureClassificationByComparison";
                        results.Add("ClassficationByComparison", (await conn.QueryAsync(
                                sql,
                                customers,
                                commandType: CommandType.StoredProcedure)).ToList());

                        sql = "spLottery_GetPrizeStructurePercentTotalByComparison";
                        results.Add("PercentTotalByComparison", (await conn.QueryAsync(
                                sql,
                                customers,
                                commandType: CommandType.StoredProcedure)).ToList());

                        sql = "spLottery_GetPrizeStructureTopPrizeByComparison";
                        results.Add("TopPrizeByComparison", (await conn.QueryAsync(
                                sql,
                                customers,
                                commandType: CommandType.StoredProcedure)).ToList());
                    }
                    

                    return results;
                }
                finally
                {
                    CloseConnection(conn);
                }
            }
            //
            //exec[spLottery_GetPrizeStructureClassificationByComparison] 'VA', 1, '12/1/2019', '6/1/2020'
        }
    }
}
