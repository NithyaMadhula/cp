using Microsoft.AspNetCore.Identity.UI.Services;
using System;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Igt.InstantsShowcase.Models
{
    public class EmailSender : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            string smtpIp = "156.24.14.160";
            Regex regex = new Regex(@"(\r\n|\r|\n)+");
            MailMessage emailMessage = new MailMessage
            {
                Body = htmlMessage,
                Subject = subject,
                From = new MailAddress("noreply@brightstarlottery.com"),
            };

            emailMessage.Body = regex.Replace(emailMessage.Body, "<br><br/>");
            emailMessage.IsBodyHtml = true;

            emailMessage.To.Add(email.Trim());

            SmtpClient smtp = new SmtpClient(smtpIp)
            {
                Port = 25,
                DeliveryMethod = SmtpDeliveryMethod.Network
            };

            try
            {
                smtp.Send(emailMessage);
                
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (emailMessage != null)
                {
                    emailMessage.Dispose();
                }
                if (smtp != null)
                {
                    smtp.Dispose();
                }

            }
            return Task.CompletedTask;
        }
    }
}
