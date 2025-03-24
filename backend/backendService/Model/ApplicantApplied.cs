namespace BackendService.Model
{
    public class ApplicantApplied
    {
        public int VacancyID { get; set; }
        public string JobTitle { get; set; }
        public int ApplicantID { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string City { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
    }
}
