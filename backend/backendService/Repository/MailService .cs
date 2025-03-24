using BackendService.Model;
using BackendService.Repository.Interfaces;
using Microsoft.Extensions.Options;
using PostmarkDotNet;
using PostmarkDotNet.Legacy;
using RazorEngineCore;
using System.Text;

namespace BackendService.Repository
{
    public class MailService : IMailService
    {
        private readonly MailSettings _settings;

        PostmarkClient client;

        public MailService(IOptions<MailSettings> settings)
        {
            _settings = settings.Value;
            client = new PostmarkClient(_settings.APIKey);
        }

        public async Task<string> SendAsync(MailData mailData, CancellationToken ct = default)
        {

            PostmarkResponse response;
            try
            {
                var message = CreateMessage(mailData, From: _settings.From);

                response = client.SendMessage(message);

                if (response.Status != PostmarkStatus.Success)
                {
                    Console.WriteLine("Response was: " + response.Message);
                }

                return response.Message;

            }
            catch (Exception e)
            {

                return e.Message;
            }
        }

        public PostmarkMessage CreateMessage(MailData mailData, string From)
        {
            PostmarkMessage message = new PostmarkMessage()
            {
                From = From,
                To = mailData.To,
                Subject = mailData.Subject,
                HtmlBody = mailData.Body,
                TextBody = "",
                ReplyTo = From,
                TrackOpens = true
            };

            var imageContent = File.ReadAllBytes(GetImagePath("logo"));
            message.AddAttachment(imageContent, "logo.png", "image/png", "cid:logo.png");

            return message;
        }

        public string GetEmailTemplate<T>(string emailTemplate, T emailTemplateModel)
        {
            string mailTemplate = LoadTemplate(emailTemplate);

            IRazorEngine razorEngine = new RazorEngine();
            IRazorEngineCompiledTemplate modifiedMailTemplate = razorEngine.Compile(mailTemplate);

            return modifiedMailTemplate.Run(emailTemplateModel);
        }

        private string GetImagePath(string imageFile)
        {
            string baseDir = AppDomain.CurrentDomain.BaseDirectory;
            string AssetDir = System.IO.Path.Combine(baseDir, "Asset");
            return System.IO.Path.Combine(AssetDir, $"{imageFile}.png");
        }

        private string LoadTemplate(string emailTemplate)
        {
            string baseDir = AppDomain.CurrentDomain.BaseDirectory;
            string templateDir = System.IO.Path.Combine(baseDir, "EmailTemplates");
            string templatePath = System.IO.Path.Combine(templateDir, $"{emailTemplate}.cshtml");

            using FileStream fileStream = new FileStream(templatePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
            using StreamReader streamReader = new StreamReader(fileStream, Encoding.Default);

            string mailTemplate = streamReader.ReadToEnd();
            streamReader.Close();

            return mailTemplate;
        }










    }
}