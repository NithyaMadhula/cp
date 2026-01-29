using IGT.Oauth.Models;
using System.Threading.Tasks;

namespace IGT.Oauth.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetAsync(string username, string clientid = null, bool fullModel = false);
        bool Insert(User user);
    }
}
