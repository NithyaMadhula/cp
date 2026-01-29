using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace IGT.EmailLogSender
{
    public static class EmailSender 
    {
        public static bool SendEmail(List<string> emails, string subject, string htmlMessage, List<FileInfo> attachments)
        {
            string smtpIp = "smtp.igt.com";
            //string smtpIp = "156.24.14.160";
            Regex regex = new Regex(@"(\r\n|\r|\n)+");
            MailMessage emailMessage = new MailMessage
            {
                Body = htmlMessage,
                Subject = subject,
                From = new MailAddress("noreply@igt.com"),
            };

            emailMessage.Body = regex.Replace(emailMessage.Body, "<br><br/>");
            emailMessage.IsBodyHtml = true;

            foreach (var email in emails)
                emailMessage.To.Add(email.Trim());

            foreach (var attachment in attachments)
            {
                emailMessage.Attachments.Add(new Attachment(attachment.FullName));
            }

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
                return false;
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
            return true;
        }
    }
}
