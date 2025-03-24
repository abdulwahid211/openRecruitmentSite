using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendService.Model
{
    [Table("Vacancies")]
    public class Vacancies
    {
        [Key]
        public int? VacancyID { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public int EmployerID { get; set; }
        public string Sector { get; set; }
        public string Salary { get; set; }
        public string Location { get; set; }
        public DateTime Created { get; set; }
        public string Contract { get; set; }
    }
}
