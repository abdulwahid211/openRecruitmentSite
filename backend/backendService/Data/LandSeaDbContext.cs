using BackendService.Model;
using Microsoft.EntityFrameworkCore;

namespace AdminService.Data
{
    public class LandSeaDbContext : DbContext
    {
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Applicants> Applicants { get; set; }
        public DbSet<AppliedJobs> AppliedJobs { get; set; }
        public DbSet<Employer> Employers { get; set; }
        public DbSet<Vacancies> Vacancies { get; set; }
        public DbSet<CV> CVFiles { get; set; }
        public LandSeaDbContext(DbContextOptions<LandSeaDbContext> options) : base(options) { }
    }

}
