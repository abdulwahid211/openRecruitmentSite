using AdminService.Data;
using BackendService.Authentication;
using BackendService.Model;
using BackendService.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackendService.Repository
{
    public class EmployerRepository : IEmployerRepository
    {
        private readonly LandSeaDbContext _dbContext;
        private readonly ITokenUtil _tokenMethods;
        public EmployerRepository(LandSeaDbContext dbContext, ITokenUtil tokenMethods)
        {
            _dbContext = dbContext;
            _tokenMethods = tokenMethods;
        }

        public async Task<bool> CreateEmployerAsync(Employer employer, IHttpContextAccessor http)
        {
            if (await VerifyEmployerExistsAsync(employer))
            {
                _tokenMethods.ValidateUserToken(http);
                await _dbContext.Employers.AddAsync(employer);
                int result = await SaveAsync();
                return result != 0;
            }
            return false;
        }

        public async Task<bool> VerifyEmployerExistsAsync(Employer employer)
        {
            var result = await _dbContext.Employers.FirstOrDefaultAsync(x => x.Email == employer.Email);

            return result is null;
        }

        public async Task<bool> DeleteEmployerAsync(string email, IHttpContextAccessor http)
        {
            _tokenMethods.ValidateUserToken(http);
            var employer = await _dbContext.Employers.FirstOrDefaultAsync(x => x.Email == email);
            if (employer == null)
            {
                return false;
            }
            _dbContext.Employers.Remove(employer);
            await SaveAsync();
            return true;
        }

        public async Task<IEnumerable<Employer>> GetAllEmployersAsync(IHttpContextAccessor http)
        {
            _tokenMethods.ValidateUserToken(http);
            return await _dbContext.Employers.ToListAsync();
        }
        public async Task<Employer> UpdateEmployerAsync(Employer employer, IHttpContextAccessor http)
        {
            _tokenMethods.ValidateUserToken(http);
            var result = _dbContext.Employers.Update(employer);
            await SaveAsync();
            return result.Entity;
        }

        public async Task<int> SaveAsync() => await _dbContext.SaveChangesAsync();

        public async Task<Employer> GetEmployerAsync(string email, IHttpContextAccessor http)
        {
            _tokenMethods.ValidateUserToken(http);
            return await _dbContext.Employers.FirstOrDefaultAsync(x => x.Email == email);
        }
    }
}
