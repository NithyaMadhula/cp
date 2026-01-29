using System.Data.SqlClient;
using System.Data;
using Amazon;
using Amazon.S3;
using IGT.AWS.FileUpload.Core;
using Microsoft.Extensions.Configuration;

internal class Program
{
    private const string _bucketName = "igt-customerportal";

    // Specify your bucket region (an example region is shown).
    //private static readonly RegionEndpoint bucketRegion = RegionEndpoint.USEast2; // does not contain the definition error
    //private static readonly RegionEndpoint bucketRegion = RegionEndpoint.GetBySystemName("us-east-2");
    private static readonly RegionEndpoint _bucketRegion = RegionEndpoint.USEast1;
    private static IAmazonS3 _s3Client;
    private static string _dbConnectionString;
    private static string _dbCloudConnectionString;
    private static string _accessKey;
    private static string _secretKey;
    private static string _awsConceptFolder;
    private static string _awsPrintedFolder;
    private static string _publishPath;

    private static string _processPath;
    private static string _noImages;

    private static string _imgFileExt;



    static void Main(string[] args)
    {
        ProcessImageGameUpload();
    }

    private static void Log(string message)
    {
        var path = @"C:\IGT\InstantsShowcase\AWS_S3_FileUpload_Log.txt";
        if (!Directory.Exists(path))
            Directory.CreateDirectory(Path.GetDirectoryName(path));

        using (StreamWriter sw = (File.Exists(path)) ? File.AppendText(path) : File.CreateText(path))
        {
            sw.WriteLine(message);
        }

        Console.WriteLine(message);
    }

    private static void InitializeVariables()
    {
        _accessKey = System.Configuration.ConfigurationManager.AppSettings["AWSAccessKey"];  
        _secretKey = System.Configuration.ConfigurationManager.AppSettings["AWSSecretKey"]; 
        Console.WriteLine($"Access key {_accessKey}");
        Console.WriteLine($"Secret key {_secretKey}");
        _awsConceptFolder = System.Configuration.ConfigurationManager.AppSettings["AWSConceptFolder"];
        _awsPrintedFolder = System.Configuration.ConfigurationManager.AppSettings["AWSPrintedFolder"];

        _publishPath = System.Configuration.ConfigurationManager.AppSettings["PublishConcepts"];
        _processPath = System.Configuration.ConfigurationManager.AppSettings["ProcessConcepts"];
        _imgFileExt = System.Configuration.ConfigurationManager.AppSettings["ImageFileExt"];
        _noImages = System.Configuration.ConfigurationManager.AppSettings["NoImages"];

        //db connection string
        _dbConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["CustomerPortal"].ConnectionString;
        _dbCloudConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["AWSCustomerPortal"].ConnectionString;


        _s3Client = new AmazonS3Client(_accessKey, _secretKey, _bucketRegion);
    }

    public static void ProcessImageGameUpload()
    {
        //call initialize variables
        InitializeVariables();

        string _imgFile = null;
        string _imgName = null;
        string _keyName = null;
        string _return = null;
        SqlParameter[] _sqlParam = new SqlParameter[4];

        // get printed games to process
        var _dt = IGT.AWS.FileUpload.Core.DatabaseMethods.ExecuteStoredProcedureNoParam(_dbConnectionString, "spGame_GetImageToUpload");
        int count = 0;
        try
        {// check to make sure that datatable has rows
            if (_dt.Rows.Count > 0)
            {
                // loop thru the data table
                foreach (DataRow _row in _dt.Rows)
                {
                    count++;
                    //Console.WriteLine(count);
                    // assign data values to local variables                      

                    //if (count == 54)
                    //    continue;

                    _imgName = _row["ImgName"].ToString();
                    _imgFile = _row["ImgPath"].ToString();

#if DEBUG
                    var basePath = "\\\\uslalgsdadmin01\\InstantShowcase\\Graphics";
#else
                    var basePath = "\\\\uslalevadmin04\\Business Intelligence\\Graphics";
#endif
                    _imgFile = _imgFile.Replace("GameImages", basePath);

                    string[] path = _imgFile.Split('\\');

                    DirectoryInfo d;

                    if (path.Length >= 10)
                    {
                        d = new DirectoryInfo(basePath + "\\" + path[5] + "\\" + path[6] + "\\" + path[7] + "\\" + path[8]);

                    }
                    else
                    {
                        if (!path[7].ToLower().Contains(".jpg") && !path[7].Contains(".png") && !path[7].Contains(".gif") && !path[7].ToLower().Contains(".JPG") )
                            d = new DirectoryInfo(basePath + "\\" + path[5] + "\\" + path[6] + "\\" + path[7]);
                        else
                            d = new DirectoryInfo(basePath + "\\" + path[5] + "\\" + path[6]);
                    }
                    var imageCodeName = _imgName.Split('_');
                    FileInfo[] Files = null;
                    try
                    {
                        Files = d.GetFiles(imageCodeName[0] + "*");
                    }
                    catch
                    {
                        continue;
                    }
                    //FileInfo fi = new FileInfo(_imgFile);

                    //check image file
                    if (Files != null && Files.Length > 0 && Files[0].Exists)
                    {
                        // set key name to be uploaded in AWS including subfolder
                        _keyName = _awsPrintedFolder + Files[0].Name;

                        // call aws file upload
                        _return = UploadFile(Files[0].FullName, _keyName, Files[0].Name);

                        if (_return == "success")
                        {
                            //build sql parameters
                            _sqlParam[0] = new SqlParameter("@GraphicID", SqlDbType.Int)
                            {
                                Value = _row["GraphicID"],
                                Direction = ParameterDirection.Input
                            };

                            _sqlParam[1] = new SqlParameter("@GameID", SqlDbType.Int)
                            {
                                Value = _row["GameID"],
                                Direction = ParameterDirection.Input
                            };

                            _sqlParam[2] = new SqlParameter("@IsImageUploaded", SqlDbType.Bit)
                            {
                                Value = 1,
                                Direction = ParameterDirection.Input
                            };

                            _sqlParam[3] = new SqlParameter("@RetVal", SqlDbType.Int)
                            {
                                Direction = ParameterDirection.Output
                            };

                            // call sproc with input parameter to insert printed into AWS database and output param (0 = success, 1 = error)
                            int _retVal = IGT.AWS.FileUpload.Core.DatabaseMethods.ExecuteNonQueryStoredProcedure(_dbConnectionString, "dbo.spGameLog_SetImageUploadInd", _sqlParam);
                            //int _retValCloud  = IGT.AWS.FileUpload.Core.DatabaseMethods.ExecuteNonQueryStoredProcedure(_dbCloudConnectionString, "dbo.spGameLog_SetImageUploadInd", _sqlParam);
                        }
                    }
                }
            }
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }

    // file upload and provide file path and name
    private static string UploadFile(string _publishPath, string _keyName, string _imageName)
    {
        using (StreamWriter sw = File.AppendText(@"C:\IGT\TEST\AWS_S3_FileUpload_Log.txt"))
        {
            try
            {
                //if (Exists(_imageName, _bucketName + "/printedgames"))
                //    return "FileAlreadyExists";
                //else { 


                using (Amazon.S3.Transfer.TransferUtility _fileTransferUtility = new Amazon.S3.Transfer.TransferUtility(_s3Client))
                {
                    Amazon.S3.Transfer.TransferUtilityUploadRequest _fileTransferUtilityRequest = new Amazon.S3.Transfer.TransferUtilityUploadRequest
                    {
                        BucketName = _bucketName,
                        ContentType = "image/jpeg",
                        StorageClass = S3StorageClass.ReducedRedundancy,
                        Key = _keyName,
                        FilePath = _publishPath
                        //CannedACL = S3CannedACL.PublicRead
                    };

                    // upload file to AWS S3 bucket
                    _fileTransferUtility.Upload(_fileTransferUtilityRequest);
                }

                //// generate presigned url
                //var _url = GeneratePreSignedURL(_keyName, _imageName);
                Console.WriteLine($"Image {_imageName} uploaded successfully");
                Log($"Image {_imageName} uploaded successfully - {DateTime.Now}");

                // return success
                return "success";
                //}
            }

            catch (AmazonS3Exception e)
            {
                Log($"Image {_imageName} NOT uploaded: {e.Message} - {DateTime.Now} ");

                //throw new Exception(e.Message);
                return "Error";
            }

            catch (Exception e)
            {
                Log($"Image {_imageName} NOT uploaded: {e.Message} - {DateTime.Now} ");
                //throw new Exception(e.Message);
                return "Error";

            }
        }
    }

}
