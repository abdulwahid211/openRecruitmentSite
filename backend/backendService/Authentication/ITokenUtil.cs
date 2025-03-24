namespace BackendService.Authentication
{
    public interface ITokenUtil
    {
        public string AuthenticateToken(IHttpContextAccessor http);
        public string GenerateAccessToken(string username);
        public void ValidateUserToken(IHttpContextAccessor http);
    }
}
