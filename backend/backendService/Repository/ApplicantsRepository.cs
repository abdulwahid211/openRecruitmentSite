using AdminService.Data;
using BackendService.Authentication;
using BackendService.Model;
using BackendService.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackendService.Repository
{
    public class ApplicantsRepository : IApplicantsRepository
    {
        private readonly LandSeaDbContext _dbContext;
        private readonly ITokenUtil _tokenMethods;
        private readonly IMailService _mailService;
        private MailData mailData;

        public ApplicantsRepository(LandSeaDbContext dbContext, ITokenUtil tokenMethods, IMailService mailService)
        {
            _dbContext = dbContext;
            _tokenMethods = tokenMethods;
            _mailService = mailService;
            mailData = new MailData();
        }

        public async Task<bool> CreateApplicantAsync(Applicants applicant)
        {
            if (await VerifyApplicantExistsAsync(applicant))
            {
                var hashPassword = PasswordUtil.HashPassword(applicant.Password);
                applicant.Password = hashPassword;
                await _dbContext.Applicants.AddAsync(applicant);
                await SubmitWelcomeEmail(applicant);
                int result = await SaveAsync();

                return result != 0;
            }

            return false;
        }

        public async Task<string> SubmitWelcomeEmail(Applicants applicant)
        {
            mailData.To = applicant.Email;
            mailData.Subject = "Welcome to Landseastaffing Recruitment!";
            mailData.Body = _mailService.GetEmailTemplate("welcome", applicant);
            return await _mailService.SendAsync(mailData, default);
        }

        public async Task<bool> VerifyApplicantExistsAsync(Applicants applicant)
        {
            var result = await _dbContext.Applicants.FirstOrDefaultAsync(x => x.Email == applicant.Email);

            return result is null;
        }

        public async Task<bool> DeleteApplicantAsync(string email, IHttpContextAccessor http)
        {
            _tokenMethods.ValidateUserToken(http);
            var applicant = await _dbContext.Applicants.FirstOrDefaultAsync(x => x.Email == email);
            if (applicant == null)
            {
                return false;
            }
            _dbContext.Applicants.Remove(applicant);
            await SaveAsync();

            var cv = await _dbContext.CVFiles.FirstOrDefaultAsync(x => x.Email == email);
            if (cv == null)
            {
                return false;
            }
            _dbContext.CVFiles.Remove(cv);
            await SaveAsync();

            return true;
        }

        public async Task<IEnumerable<Applicants>> GetAllApplicantsAsync(IHttpContextAccessor http)
        {
            _tokenMethods.ValidateUserToken(http);
            return await _dbContext.Applicants.ToListAsync();
        }
        public async Task<Applicants> UpdateApplicantAsync(Applicants applicant, IHttpContextAccessor http)
        {
            _tokenMethods.ValidateUserToken(http);
            var hashPassword = PasswordUtil.HashPassword(applicant.Password);
            applicant.Password = hashPassword;
            var result = _dbContext.Applicants.Update(applicant);
            await SaveAsync();
            return result.Entity;
        }

        public async Task<int> SaveAsync() => await _dbContext.SaveChangesAsync();

        public async Task<Applicants> GetApplicantAsync(string email, IHttpContextAccessor http)
        {
            _tokenMethods.ValidateUserToken(http);
            return await _dbContext.Applicants.Where(x => x.Email == email).FirstOrDefaultAsync();
        }
    }
}
