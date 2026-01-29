using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.Mail
{
    public class Mailer
    {
        public void Send()
        {
            //Approval – Your registration for the IGT iGRADE LITE tool has been APPROVED to review information regarding “California’s” lottery games analytics, printed games, and concepts.
            //Decline – Your registration to access the IGT iGRADE LITE tool to review infor - mation regarding “California’s” lottery games analytics, printed games, and concepts has been Declined.Please contact your IGT Account Representative.

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Carlos Oliveira", "carlos.xavierdeoliveira@igt.com"));
            message.To.Add(new MailboxAddress("Carlos Oliveira", "carlos.xavierdeoliveira@igt.com"));
            message.Subject = "Test";

            message.Body = new TextPart("plain")
            {
                Text = @"Testing 1,2,3..."
            };

            using (var client = new SmtpClient())
            {
                // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
                client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                client.Connect("smtp.office365.com", 587, SecureSocketOptions.StartTls);
                client.Authenticate("carlos.xavierdeoliveira@igt.com", "");

                client.Send(message);
                client.Disconnect(true);
            }
        }
    }
}
