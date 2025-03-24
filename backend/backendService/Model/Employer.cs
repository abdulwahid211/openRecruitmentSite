using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendService.Model
{
    [Table("Employer")]
    public class Employer
    {
        [Key]
        public int? EmployerID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Postcode { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
    }
}
