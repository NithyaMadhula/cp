using Amazon.DynamoDBv2;
using Amazon.IdentityManagement.Model;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Bibliography;
using IGT.EmailLogSender;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using static System.Runtime.InteropServices.JavaScript.JSType;

try
{
    var awsConnectionString = ConfigurationManager.ConnectionStrings["Log"];

    SqlConnection connection = new SqlConnection(awsConnectionString.ConnectionString);
    connection.Open();
    DataTable dt = new DataTable();
    SqlCommand command = new SqlCommand("SELECT * FROM[LOG] WHERE MONTH([Date]) = MONTH(DATEADD(month, -1, GETDATE())) AND YEAR([Date]) = YEAR(DATEADD(month, -1, GETDATE())) AND [User] IS NOT NULL", connection);

    SqlDataReader reader = command.ExecuteReader();

    if (reader.HasRows)
    {
        dt.Load(reader);
    }

    connection.Close();

    XLWorkbook wb = new XLWorkbook();
    var ws = wb.Worksheets.Add(dt, "Log File");
    var directory = new DirectoryInfo(Directory.GetCurrentDirectory());
    string path = $@"{directory.Parent.Parent.Parent}\LogFiles\Instantsshowcase - Log File - {(DateTime.Now.AddMonths(-1)):MMMM} {DateTime.Now.Year}.xlsx";
    ws.Column(2).Width = 15;
    ws.Column(2).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
    ws.Column(3).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
    ws.Column(4).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
    ws.Column(5).Width = 50;
    ws.Column(6).Width = 60;
    ws.Column(7).Width = 50;

    ws.Column(8).Width = 25;
    ws.Column(9).Width = 25;
    wb.SaveAs(path);
    Console.WriteLine("File saved successfully ...");

    List<string> emails = new List<string> { "Gonzalo.Garcia@igt.com" };
    //List<string> emails = new List<string> { "Gonzalo.Garcia@igt.com", "Samantha.Carl@igt.com", "Ryan.Mcshane@igt.com", "Nicholas.Schell@igt.com", "Samad.Patton@igt.com", "Allen.Valdes@igt.com" };
    List<FileInfo> attachments = new List<FileInfo>();
    attachments.Add(new FileInfo(path));
    var result = EmailSender.SendEmail(
        emails,
        $"Instantsshowcase - Log File {DateTime.Now:MMMM} {DateTime.Now.Year}",
        "Hello, login log file is attached for the present month. <br></br> <img src=\"https://igt-customerportal.s3.amazonaws.com/eog/IgtLogo_noback_new.png\">", attachments);

    if (result) Console.WriteLine("Log file sent successfully ...");
    else Console.WriteLine("Could not send email ...");
}
catch (Exception exception)
{
    Console.WriteLine("Error: " + exception.Message);

}

