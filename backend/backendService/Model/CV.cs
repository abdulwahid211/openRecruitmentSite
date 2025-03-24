using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendService.Model
{
    [Table("CV")]
    public class CV
    {
        [Key]
        public int? Id { get; set; }
        public string Email { get; set; }
        public string Filename { get; set; }
        public string File { get; set; }
        public string Type { get; set; }
        public DateTime Uploaded { get; set; }
        public int Size { get; set; }
    }
}
