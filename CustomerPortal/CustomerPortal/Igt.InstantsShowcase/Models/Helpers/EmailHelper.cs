using System.Diagnostics;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System;

namespace Igt.InstantsShowcase.Models.Helpers
{
    public class EmailHelper
    {
        private Email email;
        public EmailHelper(Email email)
        {
            this.email = email;
        }

        public async void SendEmailSMTP()
        {
            Regex regex = new Regex(@"(\r\n|\r|\n)+");
            email.Body = regex.Replace(email.Body, "<br><br/>");
            email.Body = @"<!DOCTYPE html>
<html lang=""en"">
<head>
<meta http-equiv=""Content-Type"" content=""text/html; charset=us-ascii"">
<meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
</head>
<body style=""width: auto; font-family: Verdana, sans-serif;"">
    <table style=""width: 100%; border-collapse: collapse; margin: auto;"">
        <tr height=""10px"">
            <td style=""background-color: #FF4F0F; width: 25px;""></td>
            <td style=""background-color: #0044AB; color: white; text-align: left; padding: 10px; font-weight: bold; font-size:14pt"">" + "Brightstar - Instantsshowcase" + @"</td>
        </tr>
        <tr>
            <td style=""background-color: #0044AB; width: 15px;""></td>
            <td style=""background-color: whitesmoke; text-align: left; padding: 10px;"">
                <pre style=""background-color: whitesmoke; font-family: Verdana, sans-serif; white-space: pre-wrap; margin: 0; font-size:10pt"">Hello,<br><br>" + $"{email.Body}" + @"<br>Thank you,<br>Your Brightstar Team</pre>
            </td>
        </tr>
    </table>
    <table style=""width: 100%; border-collapse: collapse; margin: auto;"">
        <tr>
            <td colspan=""2"" style=""background-color: whitesmoke;""><hr style=""border: none; height: 2px; background-color: grey;""></td>
        </tr>
        <tr>
            <td style=""background-color: whitesmoke; width: 15px;""></td>
            <td style=""background-color: whitesmoke; font-size: x-small; color: grey; padding: 0px; font-size:9pt ; text-align:justify"">
                This email and any accompanying attachments contain confidential information intended only for the individual or entity named above. Any dissemination or action taken in reliance on this email or attachments by anyone other than the intended recipient is strictly prohibited. If you believe you have received this message in error, please delete it and contact Alert-AccountServices@brightstarlottery.com.
            </td>
        </tr>
    </table>
</body>
</html>";

            var smtpIp = "smtp.ourlotto.com";
            email.To = regex.Replace(email.To, "");
            email.Subject = regex.Replace(email.Subject, "");
            var emailAddresses = email.To.Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries);

            MailMessage emailMessage = new MailMessage
            {
                Body = email.Body,
                Subject = email.Subject,
                From = new MailAddress(email.From, email.From),
            };

            emailMessage.IsBodyHtml = true;

            foreach (var attachment in email.Attachments)
            {
                emailMessage.Attachments.Add(new System.Net.Mail.Attachment(attachment.FullName));
            }

            foreach (var item in emailAddresses)
            {
                emailMessage.To.Add(item.Trim());
            }

            email.Cc = regex.Replace(email.Cc, "");
            if (!string.IsNullOrEmpty(email.Cc))
            {
                foreach (var item in email.Cc.Split(';'))
                {
                    emailMessage.CC.Add(item.Trim());
                }
            }

            email.Bcc = regex.Replace(email.Bcc, "");
            if (!string.IsNullOrEmpty(email.Bcc))
            {
                foreach (var item in email.Bcc.Split(';'))
                {
                    emailMessage.Bcc.Add(item.Trim());
                }
            }

            SmtpClient smtp = new SmtpClient(smtpIp)
            {
                DeliveryMethod = SmtpDeliveryMethod.Network
            };

            try
            {
                // Send the message
                await Task.Run(() =>
                {
                    smtp.Send(emailMessage);
                });
            }
            catch (Exception)
            {
                Trace.TraceError("Failed to send email message.");
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
        }

    }

}
