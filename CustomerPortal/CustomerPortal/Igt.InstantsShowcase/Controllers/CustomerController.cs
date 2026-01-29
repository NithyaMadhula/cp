using Igt.InstantsShowcase.Models;
using IGT.CustomerPortal.API.DAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace Igt.InstantsShowcase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CustomerController : InstantsShowcaseControllerBase
    {
        public CustomerController(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager) : base(context, customerPortal, userManager) { }

        /// <summary>
        /// Returns a list of customer
        /// </summary>
        /// <remarks>
        /// Used in Game Search
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpGet]
        [Route("{customerType:int}")]
        public async Task<IEnumerable<ApiSelectOption>> GetCustomers(int customerType)
        {
            IEnumerable<Customer> lotteries = await new CustomerRepository(ConnectionFactory).List(customerType);
            if (!lotteries.Any()) return null;

            var data = new List<ApiSelectOption>();
            foreach (var lottery in lotteries)
            {
                data.Add(new ApiSelectOption(lottery.Code, lottery.Name, false));
            }

            if (!this.IsIGT())
            {
                string customerCode;
                this.GetCustomer(out customerCode);

                data = data.FindAll(s => s.Id == customerCode);
            }

            return data.Any() ? data : null;
        }

        /// <summary>
        /// Returns a list of years for a customer
        /// </summary>
        /// <remarks>
        /// Used in Game Search
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpGet]
        [Route("{customerCode}/year")]
        public async Task<IEnumerable<int>> GetYear(string customerCode)
        {
            if (!this.IsIGT())
            {
                this.GetCustomer(out customerCode);
            }

            if (string.IsNullOrEmpty(customerCode))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            return await new CustomerRepository(ConnectionFactory).ListYear(customerCode);
        }

        /// <summary>
        /// Returns a list of colors for a specific customer
        /// </summary>
        /// <remarks>
        /// Used in Game Search
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpGet]
        [Route("{customerCode}/color")]
        public async Task<IEnumerable<Color>> GetColor(string customerCode)
        {
            if (!this.IsIGT())
            {
                this.GetCustomer(out customerCode);
            }

            if (string.IsNullOrEmpty(customerCode))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            return await new CustomerRepository(ConnectionFactory).ListColor(customerCode);
        }

        /// <summary>
        /// Returns a list of playstyle for a specific customer
        /// </summary>
        /// <remarks>
        /// Used in Game Search
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpGet]
        [Route("{customerCode}/playstyle")]
        public async Task<IEnumerable<PlayStyle>> GetPlayStyle(string customerCode)
        {
            if (!this.IsIGT())
            {
                this.GetCustomer(out customerCode);
            }

            if (string.IsNullOrEmpty(customerCode))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            return await new CustomerRepository(ConnectionFactory).ListPlayStyle(customerCode);
        }

        /// <summary>
        /// Returns a list of themes for a specific customer
        /// </summary>
        /// <remarks>
        /// Used in Game Search
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpGet]
        [Route("{customerCode}/theme")]
        public async Task<IEnumerable<Theme>> GetTheme(string customerCode)
        {
            if (!this.IsIGT())
            {
                this.GetCustomer(out customerCode);
            }

            if (string.IsNullOrEmpty(customerCode))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            return await new CustomerRepository(ConnectionFactory).ListTheme(customerCode);
        }

        /// <summary>
        /// Returns a list of ticket prices for a customer
        /// </summary>
        /// <remarks>
        /// Used in Game Search
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpGet]
        [Route("{customerCode}/ticketprice")]
        public async Task<IEnumerable<TicketPriceByCustomer>> GetTicketPrice(string customerCode)
        {
            if (!this.IsIGT())
            {
                this.GetCustomer(out customerCode);
            }

            if (string.IsNullOrEmpty(customerCode))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            return await new CustomerRepository(ConnectionFactory).ListTicketPrice(customerCode);
        }

        //public async Task<IEnumerable<CustomerResponse>> Get(string filterSales = null)
        //{
        //    var customers = await new CustomerRepository(ConnectionFactory).List();
        //    if (customers.Any())
        //    {
        //        var list = new List<CustomerResponse>();
        //        foreach (var customer in customers)
        //        {
        //            list.Add(new CustomerResponse
        //            {
        //                Name = customer.Name,
        //                Code = customer.Code.Trim()
        //            });
        //        }
        //        return list;
        //    }
        //    return null;
        //}
    }
}
