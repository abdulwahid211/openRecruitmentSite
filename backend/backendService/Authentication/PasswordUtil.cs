namespace BackendService.Authentication
{
    public static class PasswordUtil
    {
        public static string HashPassword(string password) => BCrypt.Net.BCrypt.HashPassword(password);

        public static bool VerifyHashPassword(string originalPassword, string hashPassword) => BCrypt.Net.BCrypt.Verify(originalPassword, hashPassword);

    }
}
