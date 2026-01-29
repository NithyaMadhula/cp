using IGT.CustomerPortal.API.DAL;
using IGT.CustomerPortal.API.DTO.Request;
using IGT.CustomerPortal.API.DTO.Response;
using IGT.CustomerPortal.API.Mail;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using System.Threading.Tasks;
using System.Web.Http;
using Thinktecture.IdentityModel.WebApi;

namespace IGT.CustomerPortal.API.Controllers
{
    public class UserController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        //[ScopeAuthorize(new[] { "cpapi_read" })]
        //[NullFilter]
        //public async Task<UserResponse> Get()
        //{
        //    string userName = null;
        //    if (!this.TryGetUsername(out userName)) return null;

        //    User userModel = await new UserRepository(ConnectionFactory).Get(userName);
        //    if (userModel == null) return null;

        //    return new UserResponse
        //    {
        //        Name = userModel.Name,
        //        Username = userModel.Username,
        //        Customer = new CustomerResponse
        //        {
        //            Name = userModel.Customer?.Name,
        //            Code = userModel.Customer?.Code,
        //            LogoUri = userModel.Customer?.LogoUri
        //        }
        //    };
        //}

        public async Task<RegisterUserResponse> Post([FromBody]RegisterUserRequest model)
        {
            var user = new RegistrationUser
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Jurisdiction = model.Jurisdiction,
                Lottery = model.Lottery,
                Role = model.Role,
                Email = model.Email,
                Password = model.Password
            };
            //await new RegistrationUserRepository(ConnectionFactory).Insert(user);

            //new Mailer().Send();

            return new RegisterUserResponse { Message = "ok" };
        }
    }
}
