using AdminService.Data;
using BackendService.Authentication;
using BackendService.Model;
using BackendService.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackendService.Repository
{
    public class CVRepository : ICVRepository
    {
        private readonly LandSeaDbContext _dbContext;
        private readonly ITokenUtil _tokenMethods;
        public CVRepository(LandSeaDbContext dbContext, ITokenUtil tokenMethods)
        {
            _dbContext = dbContext;
            _tokenMethods = tokenMethods;
        }

        public async Task<bool> UploadCVAsync(CV newCvFile)
        {
            _dbContext.CVFiles.Add(newCvFile);
            int result = await SaveAsync();
            return result != 0;
        }

        public async Task<CV> DownloadCVAsync(string email, IHttpContextAccessor http)
        {
            _tokenMethods.ValidateUserToken(http);
            var cv = await _dbContext.CVFiles.FirstOrDefaultAsync(x => x.Email == email);
            if (cv == null)
            {
                return null;
            }
            return cv;

        }
        public async Task<int> SaveAsync() => await _dbContext.SaveChangesAsync();

        public async Task<IEnumerable<CV>> GetAllCVFiles(IHttpContextAccessor http)
        {
            _tokenMethods.ValidateUserToken(http);
            return await _dbContext.CVFiles.ToListAsync();
        }

        public async Task<bool> DeleteCVAsync(string email)
        {
            var cv = await _dbContext.CVFiles.FirstOrDefaultAsync(x => x.Email == email);
            if (cv == null)
            {
                return false;
            }
            _dbContext.CVFiles.Remove(cv);
            await SaveAsync();
            return true;
        }
    }
}
