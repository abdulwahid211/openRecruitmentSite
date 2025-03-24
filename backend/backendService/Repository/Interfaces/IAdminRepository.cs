using BackendService.Model;

namespace BackendService.Repository.Interfaces
{
    public interface IAdminRepository
    {
        public Task<IEnumerable<Admin>> GetAllAdminsAsync(IHttpContextAccessor http);
        public Task<Admin> GetAdminAsync(string email, IHttpContextAccessor http);
        public Task<bool> CreateAdminAsync(Admin admin, IHttpContextAccessor http);
        public Task<Admin> UpdateAdminAsync(Admin admin, IHttpContextAccessor http);
        public Task<bool> DeleteAdminAsync(string email, IHttpContextAccessor http);
        public Task<bool> VerifyAdminExistsAsync(Admin admin);
    }
}
