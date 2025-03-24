using AdminService.Data;
using BackendService.Authentication;
using BackendService.Model;
using BackendService.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackendService.Repository
{
    public class UserAuthLogins : IUserAuthLogins
    {
        private readonly LandSeaDbContext _dbContext;
        private readonly ITokenUtil _tokenMethods;
        public UserAuthLogins(LandSeaDbContext dbContext, ITokenUtil tokenMethods)
        {
            _dbContext = dbContext;
            _tokenMethods = tokenMethods;
        }

        private AuthPayLoad payload = new AuthPayLoad
        {
            Token = "",
            Id = 0
        };

        public async Task<AuthPayLoad> AdminLoginAsync(string email, string password)
        {
            var admin = await _dbContext.Admins.SingleOrDefaultAsync(x => x.Email.Equals(email));

            if (admin is not null)
            {
                if (PasswordUtil.VerifyHashPassword(password, admin.Password))
                {
                    payload.Id = (int)admin.AdminID;
                    payload.Token = _tokenMethods.GenerateAccessToken(email);
                    return payload;
                }
                else
                {
                    return IncorrectPasswordPayLoad();
                }

            }
            else
            {
                return NotFoundPayLoad();
            }
        }

        public async Task<AuthPayLoad> ApplicantLoginAsync(string email, string password)
        {
            var applicant = await _dbContext.Applicants.SingleOrDefaultAsync(x => x.Email.Equals(email));

            if (applicant is not null)
            {
                if (PasswordUtil.VerifyHashPassword(password, applicant.Password))
                {
                    payload.Token = _tokenMethods.GenerateAccessToken(email);
                    payload.Id = (int)applicant.ApplicantID;
                    return payload;
                }
                else
                {
                    return IncorrectPasswordPayLoad();
                }
            }
            else
            {
                return NotFoundPayLoad();
            }
        }

        public AuthPayLoad NotFoundPayLoad()
        {
            var payload = new AuthPayLoad();
            payload.Token = "Not Found";
            return payload;
        }

        public AuthPayLoad IncorrectPasswordPayLoad()
        {
            var payload = new AuthPayLoad();
            payload.Token = "Incorrect Password";
            return payload;
        }

        /// <summary>
        /// TO DO!! 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public Task<bool> ForgottenPasswordLoginAsync(string email)
        {
            throw new NotImplementedException();
        }
    }
}
