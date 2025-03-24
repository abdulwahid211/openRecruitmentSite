using BackendService.Model;

namespace VacanciesService.Repository
{
    public interface IVacanciesRepository
    {
        public Task<IEnumerable<Vacancies>> GetAllVacanciesAsync();
        public Task<Vacancies> GetVacancyAsync(int vacancyID);
        public Task<bool> CreateVacanciesAsync(Vacancies vacancy, IHttpContextAccessor http);
        public Task<Vacancies> UpdateVacanciesAsync(Vacancies vacancy, IHttpContextAccessor http);
        public Task<bool> DeleteVacanciesAsync(int vacancyID, IHttpContextAccessor http);
    }
}
