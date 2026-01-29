using System.Text.Encodings.Web;

namespace Igt.InstantsShowcase.Models
{
    public class EmailTemplate
    {
        private string Body { get; set; }

        public EmailTemplate(string body)
        {
            Body = body;
        }

        public string GetTemplate() {
            var htmlBody = @"<!DOCTYPE html>
<html lang=""en"">
<head>
<meta http-equiv=""Content-Type"" content=""text/html; charset=us-ascii"">
<meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
</head>
<body style=""width: auto; font-family: Verdana, sans-serif;"">
    <table style=""width: 100%; border-collapse: collapse; margin: auto;"">
        <tr height=""10px"">
            <td style=""background-color: #FF4F0F; width: 25px;""></td>
            <td style=""background-color: #0044AB; color: white; text-align: left; padding: 10px; font-weight: bold; font-size:14pt"">" + "Instantsshowcase - Brightstar" + @"</td>
        </tr>
        <tr>
            <td style=""background-color: #0044AB; width: 15px;""></td>
            <td style=""background-color: whitesmoke; text-align: left; padding: 10px;"">
                <pre style=""background-color: whitesmoke; font-family: Verdana, sans-serif; white-space: pre-wrap; margin: 0; font-size:10pt"">Hello,<br><br>" + $"{Body}" + @"<br><br>Thank you,<br>Your Brightstar Team</pre>
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
            htmlBody = htmlBody.Replace("\r\n", "");
            return htmlBody;
        }
    }
}
