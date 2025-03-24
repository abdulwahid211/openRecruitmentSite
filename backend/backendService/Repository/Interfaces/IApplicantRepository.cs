using BackendService.Model;

namespace BackendService.Repository.Interfaces
{
    public interface IApplicantsRepository
    {
        public Task<IEnumerable<Applicants>> GetAllApplicantsAsync(IHttpContextAccessor http);
        public Task<Applicants> GetApplicantAsync(string email, IHttpContextAccessor http);
        public Task<bool> CreateApplicantAsync(Applicants applicant);
        public Task<Applicants> UpdateApplicantAsync(Applicants applicant, IHttpContextAccessor http);
        public Task<bool> DeleteApplicantAsync(string email, IHttpContextAccessor http);
        public Task<bool> VerifyApplicantExistsAsync(Applicants applicant);
    }
}
