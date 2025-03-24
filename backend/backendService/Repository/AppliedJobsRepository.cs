using AdminService.Data;
using AppliedJobsService.Repository;
using BackendService.Authentication;
using BackendService.Model;
using BackendService.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackendService.Repository
{

    public class AppliedJobsRepository : IAppliedJobsRepository
    {
        private readonly LandSeaDbContext _dbContext;
        private readonly ITokenUtil _tokenMethods;
        private readonly IMailService _mailService;
        private MailData mailData;

        public AppliedJobsRepository(ITokenUtil tokenMethods, LandSeaDbContext dbContext, IMailService mailService)
        {
            _tokenMethods = tokenMethods;
            _dbContext = dbContext;
            _mailService = mailService;
            mailData = new MailData();
        }
        public async Task<bool> CreateAppliedJobsAsync(AppliedJobs job)
        {
            if (!await VerifyAlreadyAppliedJobAsync(job.ApplicantID, job.VacancyID))
            {
                await _dbContext.AppliedJobs.AddAsync(job);
                int result = await SaveAsync();
                await SubmitRecivedEmail(job.ApplicantID);
                return result != 0;
            }
            return false;
        }

        public async Task SubmitRecivedEmail(int applicantId)
        {
            var applicant = await _dbContext.Applicants.FirstOrDefaultAsync(ap => ap.ApplicantID == applicantId);
            mailData.To = applicant.Email;
            mailData.Subject = "Thank you for applying with us!";
            mailData.Body = _mailService.GetEmailTemplate("applying", applicant);
            await _mailService.SendAsync(mailData, default);
        }

        public async Task<bool> DeleteAppliedJobsAsync(int id)
        {
            var job = await _dbContext.AppliedJobs.FirstOrDefaultAsync(x => x.AppliedJobsID == id);
            if (job == null)
            {
                return false;
            }
            _dbContext.AppliedJobs.Remove(job);
            await SaveAsync();
            return true;
        }

        public async Task<ApplicantApplied> GetAllAppliedJobsAsync(IHttpContextAccessor http, int employerId)
        {
            _tokenMethods.ValidateUserToken(http);
            var ap = from applicants in _dbContext.Applicants
                     from appliedJobs in _dbContext.AppliedJobs
                     from vacancies in _dbContext.Vacancies
                     from employer in _dbContext.Employers
                     where (employerId == vacancies.EmployerID && appliedJobs.ApplicantID == applicants.ApplicantID && appliedJobs.VacancyID == vacancies.VacancyID)
                     orderby applicants.ApplicantID ascending
                     select new ApplicantApplied { ApplicantID = (int)applicants.ApplicantID, FirstName = applicants.FirstName, LastName = applicants.LastName, Telephone = applicants.Telephone, City = applicants.City, Email = applicants.Email, VacancyID = (int)vacancies.VacancyID, JobTitle = vacancies.Title };

            return ap.FirstOrDefault();
        }
        public async Task<AppliedJobs> UpdateAppliedJobsAsync(AppliedJobs job)
        {
            var result = _dbContext.AppliedJobs.Update(job);
            await SaveAsync();
            return result.Entity;
        }

        public async Task<int> SaveAsync() => await _dbContext.SaveChangesAsync();

        public async Task<AppliedJobs> GetAppliedJobsAsync(int id) => await _dbContext.AppliedJobs.Where(x => x.VacancyID == id).FirstOrDefaultAsync();


        public async Task<bool> VerifyAlreadyAppliedJobAsync(int ApplicantID, int VacancyID)
        {
            if (ApplicantID == 0) { return false; }

            var restult = await _dbContext.AppliedJobs.FirstOrDefaultAsync(x => x.VacancyID == VacancyID && x.ApplicantID == ApplicantID);
            return (restult is not null);
        }
    }
}
