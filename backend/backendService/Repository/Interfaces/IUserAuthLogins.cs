using BackendService.Model;

namespace BackendService.Repository.Interfaces
{
    public interface IUserAuthLogins
    {
        public Task<AuthPayLoad> AdminLoginAsync(string email, string password);
        public Task<AuthPayLoad> ApplicantLoginAsync(string email, string password);
        public Task<bool> ForgottenPasswordLoginAsync(string email);
    }
}
