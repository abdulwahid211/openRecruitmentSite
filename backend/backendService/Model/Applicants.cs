using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendService.Model
{
    [Table("Applicants")]
    public class Applicants
    {
        [Key]
        public int? ApplicantID { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Password { get; set; }
        public string City { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
    }
}
