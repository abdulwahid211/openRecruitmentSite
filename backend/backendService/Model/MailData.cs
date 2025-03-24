namespace BackendService.Model
{
    public class MailData
    {
        // Receiver
        public string To { get; set; }

        // Sender
        public string? From { get; set; }

        public string? DisplayName { get; set; }

        // Content
        public string Subject { get; set; }

        public string? Body { get; set; }
    }
}
