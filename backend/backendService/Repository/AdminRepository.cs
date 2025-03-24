using AdminService.Data;
using BackendService.Authentication;
using BackendService.Model;
using BackendService.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackendService.Repository
{
    public class AdminRepository : IAdminRepository
    {
        private readonly LandSeaDbContext _dbContext;
        private readonly ITokenUtil _tokenMethods;
        public AdminRepository(LandSeaDbContext dbContext, ITokenUtil tokenMethods)
        {
            _dbContext = dbContext;
            _tokenMethods = tokenMethods;
        }

        public async Task<bool> CreateAdminAsync(Admin admin, IHttpContextAccessor http)
        {
            _tokenMethods.ValidateUserToken(http);
            if (await VerifyAdminExistsAsync(admin))
            {
                var hashPassword = PasswordUtil.HashPassword(admin.Password);
                admin.Password = hashPassword;
                await _dbContext.Admins.AddAsync(admin);
                var result = await SaveAsync();
                return result != 0;
            }
            return false;

        }

        public async Task<bool> VerifyAdminExistsAsync(Admin admin)
        {
            var result = await _dbContext.Admins.FirstOrDefaultAsync(x => x.Email == admin.Email);

            return result is null;
        }

        public async Task<bool> DeleteAdminAsync(string email, IHttpContextAccessor http)
        {
            _tokenMethods.ValidateUserToken(http);
            var admin = await _dbContext.Admins.FirstOrDefaultAsync(x => x.Email == email);
            if (admin == null)
            {
                return false;
            }
            _dbContext.Admins.Remove(admin);
            await SaveAsync();
            return true;
        }

        public async Task<IEnumerable<Admin>> GetAllAdminsAsync(IHttpContextAccessor http)
        {
            _tokenMethods.ValidateUserToken(http);
            return await _dbContext.Admins.ToListAsync();
        }
        public async Task<Admin> UpdateAdminAsync(Admin admin, IHttpContextAccessor http)
        {
            _tokenMethods.ValidateUserToken(http);
            var hashPassword = PasswordUtil.HashPassword(admin.Password);
            admin.Password = hashPassword;
            var result = _dbContext.Admins.Update(admin);
            await SaveAsync();
            return result.Entity;
        }

        public async Task<int> SaveAsync() => await _dbContext.SaveChangesAsync();

        public async Task<Admin> GetAdminAsync(string email, IHttpContextAccessor http)
        {
            _tokenMethods.ValidateUserToken(http);
            return await _dbContext.Admins.Where(x => x.Email == email).FirstOrDefaultAsync();
        }
    }

}
