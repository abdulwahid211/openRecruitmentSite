using BackendService.Model;

namespace BackendService.Repository.Interfaces
{
    public interface IEmployerRepository
    {
        public Task<IEnumerable<Employer>> GetAllEmployersAsync(IHttpContextAccessor http);
        public Task<Employer> GetEmployerAsync(string email, IHttpContextAccessor http);
        public Task<bool> CreateEmployerAsync(Employer employer, IHttpContextAccessor http);
        public Task<Employer> UpdateEmployerAsync(Employer employer, IHttpContextAccessor http);
        public Task<bool> DeleteEmployerAsync(string email, IHttpContextAccessor http);
        public Task<bool> VerifyEmployerExistsAsync(Employer employer);
    }
}
