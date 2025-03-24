using BackendService.Model;

namespace AppliedJobsService.Repository
{
    public interface IAppliedJobsRepository
    {
        public Task<ApplicantApplied> GetAllAppliedJobsAsync(IHttpContextAccessor http, int employerId);
        public Task<AppliedJobs> GetAppliedJobsAsync(int email);
        public Task<bool> CreateAppliedJobsAsync(AppliedJobs appliedJobs);
        public Task<AppliedJobs> UpdateAppliedJobsAsync(AppliedJobs appliedJobs);
        public Task<bool> DeleteAppliedJobsAsync(int AppliedJobsID);
        public Task<bool> VerifyAlreadyAppliedJobAsync(int ApplicantID, int VacancyID);
    }
}
