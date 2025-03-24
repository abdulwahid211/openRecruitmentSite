using AdminService.Data;
using BackendService.Authentication;
using BackendService.Model;
using Microsoft.EntityFrameworkCore;
using VacanciesService.Repository;

namespace BackendService.Repository
{
    public class VacanciesRepository : IVacanciesRepository
    {
        private readonly LandSeaDbContext _dbContext;
        private readonly ITokenUtil _tokenMethods;
        public VacanciesRepository(LandSeaDbContext dbContext, ITokenUtil tokenMethods)
        {
            _dbContext = dbContext;
            _tokenMethods = tokenMethods;
        }

        public async Task<bool> CreateVacanciesAsync(Vacancies admin, IHttpContextAccessor http)
        {
            _tokenMethods.ValidateUserToken(http);
            await _dbContext.Vacancies.AddAsync(admin);
            int result = await SaveAsync();
            return result != 0;
        }

        public async Task<bool> DeleteVacanciesAsync(int id, IHttpContextAccessor http)
        {
            _tokenMethods.ValidateUserToken(http);
            var vacancy = await _dbContext.Vacancies.FirstOrDefaultAsync(x => x.VacancyID == id);
            if (vacancy == null)
            {
                return false;
            }
            _dbContext.Vacancies.Remove(vacancy);
            await SaveAsync();
            return true;
        }

        public async Task<IEnumerable<Vacancies>> GetAllVacanciesAsync() => await _dbContext.Vacancies.ToListAsync();
        public async Task<Vacancies> UpdateVacanciesAsync(Vacancies vacancy, IHttpContextAccessor http)
        {
            _tokenMethods.ValidateUserToken(http);
            var result = _dbContext.Vacancies.Update(vacancy);
            await SaveAsync();
            return result.Entity;
        }

        public async Task<int> SaveAsync() => await _dbContext.SaveChangesAsync();

        public async Task<Vacancies> GetVacancyAsync(int id) => await _dbContext.Vacancies.FirstOrDefaultAsync(x => x.VacancyID == id);
    }
}
