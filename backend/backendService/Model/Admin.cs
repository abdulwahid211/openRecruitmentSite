using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendService.Model
{
    [Table("Admin")]
    public class Admin
    {
        [Key]
        public int? AdminID { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}
