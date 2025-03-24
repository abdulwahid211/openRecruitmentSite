using BackendService.Model;

namespace BackendService.Repository.Interfaces
{
    public interface ICVRepository
    {
        public Task<CV> DownloadCVAsync(string email, IHttpContextAccessor http);
        public Task<IEnumerable<CV>> GetAllCVFiles(IHttpContextAccessor http);
        public Task<bool> DeleteCVAsync(string email);
        public Task<bool> UploadCVAsync(CV file);
    }
}
