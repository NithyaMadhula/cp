using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Amazon.S3.Model;
using Amazon.S3.IO;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace FileUpload
{
    class FileUpload
    {
        private const string _bucketName = "igt-customerportal";

        // Specify your bucket region (an example region is shown).
        //private static readonly RegionEndpoint bucketRegion = RegionEndpoint.USEast2; // does not contain the definition error
        //private static readonly RegionEndpoint bucketRegion = RegionEndpoint.GetBySystemName("us-east-2");
        private static readonly RegionEndpoint _bucketRegion = RegionEndpoint.USEast1;
        private static IAmazonS3 _s3Client;

        /// <summary>
        /// Connection string to aws CustomerPortal database
        /// </summary>
        private string _dbConnectionString;

        /// <summary>
        /// AWS S3 access key
        /// </summary>
        private string _accessKey;

        /// <summary>
        /// AWS S3 secret key
        /// </summary>
        private string _secretKey;

        /// <summary>
        /// aws concept image games subfolder
        /// </summary>
        private string _awsConceptFolder;

        /// <summary>
        /// aws printed image games subfolder
        /// </summary>
        private string _awsPrintedFolder;

        /// <summary>
        /// XML files publish folder
        /// </summary>
        private string _publishPath;

        /// <summary>
        /// XML files processed folder
        /// </summary>
        private string _processPath;
        private string _noImages;

        /// <summary>
        /// Image file extension
        /// </summary>
        private string _imgFileExt;

        public void ProcessFileUpload()
        {  
            //call initialize variables
            InitializeVariables();

            UploadFileAsync().Wait();
        }

        public void ProcessImageGameUpload()
        {
            //call initialize variables
            InitializeVariables();

            string _imgFile = null;
            string _imgName = null;           
            string _keyName = null;
            string _return = null;
            SqlParameter[] _sqlParam = new SqlParameter[4];

            // get printed games to process
            var _dt = DatabaseMethods.ExecuteStoredProcedureNoParam(_dbConnectionString, "spGame_GetImageToUpload");
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

                        var basePath = "\\\\uslalevadmin04\\Business Intelligence\\Graphics";
                        _imgFile = _imgFile.Replace("GameImages", basePath);

                        string[] path = _imgFile.Split('\\');

                        DirectoryInfo d;

                        if (path.Length >= 10)
                        {
                            d = new DirectoryInfo(basePath + "\\" + path[5] + "\\" + path[6] + "\\" + path[7] + "\\" + path[8]);

                        }
                        else { 
                            if (!path[7].ToLower().Contains(".jpg") && !path[7].Contains(".png") && !path[7].Contains(".gif"))
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
                        catch {
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
                                int _retVal = DatabaseMethods.ExecuteNonQueryStoredProcedure(_dbConnectionString, "dbo.spGameLog_SetImageUploadInd", _sqlParam);
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

        // process xml files and corresponding images for concept
        public void ProcessXML()
        {
            // call initialize variables
            InitializeVariables();

            string[] _filePaths = Directory.GetFiles(@_publishPath, "*.xml");
            string _imgFile = null;
            string _imgName = null;
            string _theme = null;
            string _playAction = null;
            string _specialtyOption = null;
            string _height = null;
            string _width = null;
            float _prize = 0;
            string _keyName = null;
            string _processedFile = null;
            int _retVal = 1;
            bool _isNumericPrize = false;

            try
            {
                // check to make sure directory is not empty
                if (_filePaths.Length > 0)
                {                    
                    // process xml files here
                    foreach (string _file in _filePaths)
                    {
                        //check if image file exists
                        if (File.Exists(_file))
                        {                          
                            using (FileStream _fileStream = new FileStream(_file, FileMode.Open, FileAccess.Read))
                            {
                                XmlDocument _xmlDoc = new XmlDocument();
                                
                                try
                                {
                                    // load xml
                                    _xmlDoc.Load(_fileStream);

                                    // check null or empty string values
                                    _theme = string.IsNullOrEmpty(_xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("Theme").Value) ? null : _xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("Theme").Value;
                                    _playAction = string.IsNullOrEmpty(_xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("PlayAction").Value) ? null : _xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("PlayAction").Value;
                                    _specialtyOption = string.IsNullOrEmpty(_xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("SpecialtyOptions").Value) ? null : _xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("SpecialtyOptions").Value;
                                    _height = string.IsNullOrEmpty(_xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("TicketHeight").Value) ? null : _xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("TicketHeight").Value;
                                    _width = string.IsNullOrEmpty(_xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("TicketWidth").Value) ? null : _xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("TicketWidth").Value;
                                    
                                    _isNumericPrize = float.TryParse(_xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("PricePoint").Value, out _prize);

                                    //_prize = string.IsNullOrEmpty(_xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("PricePoint").Value) ? null : _xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("PricePoint").Value;
                                    
                                    // image file name
                                    _imgName = _xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("FileName").Value + _imgFileExt;

                                    // image path and file name
                                    _imgFile = Path.Combine(_publishPath, _imgName);
                                    _processedFile = Path.Combine(_processPath, _imgName);
                                    
                                    // check if image file exists, then save concept record and upload image file 
                                    if (File.Exists(@_imgFile) & (_isNumericPrize == true))
                                    {
                                        // set concept key name to be uploaded in AWS including subfolder
                                        _keyName = _awsConceptFolder + _imgName;

                                        // Build SQL parameters
                                        SqlParameter[] _sqlParam = new SqlParameter[10];

                                        _sqlParam[0] = new SqlParameter("@CustomerCode", SqlDbType.NVarChar, 10)
                                        {
                                            Value = _xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("LotteryCode").Value,
                                            Direction = ParameterDirection.Input
                                        };

                                        _sqlParam[1] = new SqlParameter("@GameName", SqlDbType.NVarChar, 60)
                                        {
                                            Value = _xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("GameName").Value,
                                            Direction = ParameterDirection.Input
                                        };

                                        _sqlParam[2] = new SqlParameter("@PricePoint", SqlDbType.Money)
                                        {
                                            Value = _prize, //_xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("PricePoint").Value,
                                            Direction = ParameterDirection.Input
                                        };

                                        _sqlParam[3] = new SqlParameter("@Theme", (object)_theme ?? DBNull.Value);
                                        _sqlParam[4] = new SqlParameter("@PlayAction", (object)_playAction ?? DBNull.Value);
                                        _sqlParam[5] = new SqlParameter("@SpecialtyOptions", (object)_specialtyOption ?? DBNull.Value);

                                        _sqlParam[6] = new SqlParameter("@FileName", SqlDbType.NVarChar, 400)
                                        {
                                            Value = _imgName,
                                            Direction = ParameterDirection.Input
                                        };

                                        _sqlParam[7] = new SqlParameter("@Height", SqlDbType.Float)
                                        {
                                            Value = float.Parse(_height),
                                            Direction = ParameterDirection.Input
                                        };

                                        _sqlParam[8] = new SqlParameter("@Width", SqlDbType.Float)
                                        {
                                            Value = float.Parse(_width),
                                            Direction = ParameterDirection.Input
                                        };

                                        _sqlParam[9] = new SqlParameter("@RetVal", SqlDbType.Int)
                                        {
                                            Direction = ParameterDirection.Output
                                        };

                                        // call sproc with input parameter to insert concept into AWS database and output param (0 = success, 1 = error)
                                        _retVal = DatabaseMethods.ExecuteNonQueryStoredProcedure(_dbConnectionString, "dbo.spConcept_AddData", _sqlParam, 60);
                                    }
                                    else
                                    {
                                        //image file does not exist
                                        // move image file to no
                                        _fileStream.Close();

                                        // move xml file after processing
                                        File.Move(_file, Path.Combine(_noImages, Path.GetFileName(_file)));
                                    }
                                } 
                                catch (XmlException x)
                                {
                                    throw x; 
                                }
                                catch (Exception ex)
                                {
                                    throw ex;
                                }
                                finally
                                {
                                    // close file stream
                                    if (_fileStream!= null)                                     
                                    _fileStream.Close();
                                }                                
                            }

                            // if success, then process image file upload
                            if (_retVal == 0)
                            {   
                                // call aws file upload
                                string _return = UploadFile(_imgFile, _keyName, _imgName);

                                // move image file after processing
                                File.Move(_imgFile, Path.Combine(_processPath, _imgName));
                                                               
                                // move xml file after processing
                                File.Move(_file, Path.Combine(_processPath, Path.GetFileName(_file)));
                            }

                            // if success, then process image file upload
                            if (_retVal == 99999)
                            {   
                                // move image file after processing
                                File.Move(_imgFile, Path.Combine(_processPath, _imgName));

                                // move xml file after processing
                                File.Move(_file, Path.Combine(_processPath, Path.GetFileName(_file)));
                            }

                            // re-initialize value
                            _imgFile = null;
                            _imgName = null;
                            _imgFile = null;
                            _theme = null;
                            _playAction = null;
                            _specialtyOption = null;
                            _height = null;
                            _width = null;
                            _prize = 0;
                            _retVal = 1;
                        }                        
                    }
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }            
        }

        // process printed games and corresponding images
        public void ProcessGames()
        {
            // call initialize variables
            InitializeVariables();

            string _imgName = null;
            string _imgPath = null;
            string _keyName = null;
            string _imgFile = null;

            try
            {  
                SqlParameter[] _sqlParam = new SqlParameter[0];

                // set process date to yesterday
                //_sqlParam[0] = new SqlParameter("@ProcessDate", SqlDbType.SmallDateTime) { Value = DateTime.Now };
                
                // get printed games to process
                var _dt = DatabaseMethods.ExecuteStoredProcedure(_dbConnectionString, "dbo.spGame_GetList", _sqlParam);

                // check to make sure that datatable has rows
                if (_dt.Rows.Count > 0)
                {
                    // loop thru the data table
                    foreach (DataRow _row in _dt.Rows)
                    {
                        // get image name and path
                        _imgName = _row["ImgName"].ToString();
                        _imgPath = _row["ImgPath"].ToString();

                        // initialize sql param 
                        _sqlParam = new SqlParameter[5];

                        //check image file
                        if (File.Exists(@_imgPath))
                        {
                            //build sql parameters
                            _sqlParam[0] = new SqlParameter("@LotteryID", SqlDbType.Int)
                            {
                                Value = _row["LotteryID"],
                                Direction = ParameterDirection.Input
                            };

                            _sqlParam[1] = new SqlParameter("@GameID", SqlDbType.Int)
                            {
                                Value = _row["GameID"],
                                Direction = ParameterDirection.Input
                            };

                            _sqlParam[2] = new SqlParameter("@GraphicID", SqlDbType.Int)
                            {
                                Value = _row["GraphicID"],
                                Direction = ParameterDirection.Input
                            };

                            _sqlParam[3] = new SqlParameter("@ImagePath", SqlDbType.NVarChar, 400)
                            {
                                Value = _imgPath,
                                Direction = ParameterDirection.Input
                            };

                            _sqlParam[4] = new SqlParameter("@RetVal", SqlDbType.Int)
                            {
                                Direction = ParameterDirection.Output
                            };

                            // call sproc with input parameter to insert printed into AWS database and output param (0 = success, 1 = error)
                            int _retVal = DatabaseMethods.ExecuteNonQueryStoredProcedure(_dbConnectionString, "dbo.spGame_Add", _sqlParam);

                            if (_retVal == 0)
                            {
                                // set key name to be uploaded in AWS including subfolder
                                _keyName = _awsPrintedFolder + _imgName;

                                // call aws file upload
                                string _return = UploadFile(_imgFile, _keyName, _imgName);
                            }

                        }
                    }
                }
            }
            catch (AmazonS3Exception e)
            {
                Console.WriteLine("Error encountered on server. Message:'{0}' when writing an object", e.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine("Unknown encountered on server. Message:'{0}' when writing an object", e.Message);
            }
        }
        
        private static async Task UploadFileAsync()
        {
            try
            {
                string _publishPath = ConfigurationManager.AppSettings["PublishConcepts"];
                string[] _filePaths = Directory.GetFiles(@_publishPath, "*.xml");

                string _imgFile = null;
                string _keyName = null;
                string _imgName = null;
                string _theme = null;
                string _playAction = null;
                string _specialtyOption = null;
                string _dbConn = null;

                // check to make sure directory is not empty
                if (_filePaths.Length > 0)                
                {
                    // process files here
                    foreach (string _file in _filePaths)
                    {   
                        //check if image file exists
                        if (File.Exists(_file))
                        {
                            // open file for read only
                            var _fileStream = new FileStream(_file, FileMode.Open, FileAccess.Read);

                            XmlDocument _xmlDoc = new XmlDocument();

                            // load xml
                            _xmlDoc.Load(_fileStream);

                            // check null or empty string values
                            _theme = string.IsNullOrEmpty(_xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("Theme").Value) ? null : _xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("Theme").Value;
                            _playAction = string.IsNullOrEmpty(_xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("PlayAction").Value) ? null : _xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("PlayAction").Value;
                            _specialtyOption = string.IsNullOrEmpty(_xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("SpecialtyOptions").Value) ? null : _xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("SpecialtyOptions").Value;
                            _imgName = _xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("FileName").Value + ".jpg";

                            // set key name to be uploaded in AWS including subfolder
                            _keyName = ConfigurationManager.AppSettings["AWSConceptFolder"] + _imgName;

                            // check if image file exists, then save concept record and upload image file                            
                            _imgFile = Path.Combine(_publishPath, _imgName);
                            
                            if (File.Exists(@_imgFile))
                            {
                                // Build SQL parameters
                                SqlParameter[] _sqlParam = new SqlParameter[8];

                                _sqlParam[0] = new SqlParameter("@CustomerCode", SqlDbType.NVarChar, 10)
                                {
                                    Value = _xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("LotteryCode").Value,
                                    Direction = ParameterDirection.Input
                                };

                                _sqlParam[1] = new SqlParameter("@GameName", SqlDbType.NVarChar, 60)
                                {
                                    Value = _xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("GameName").Value,
                                    Direction = ParameterDirection.Input
                                };
                                
                                _sqlParam[2] = new SqlParameter("@PricePoint", SqlDbType.Money)
                                {
                                    Value = _xmlDoc.ChildNodes.Item(0).Attributes.GetNamedItem("PricePoint").Value,
                                    Direction = ParameterDirection.Input
                                };
                                
                                _sqlParam[3] = new SqlParameter("@Theme", (object) _theme ?? DBNull.Value);
                                _sqlParam[4] = new SqlParameter("@PlayAction", (object) _playAction ?? DBNull.Value);
                                _sqlParam[5] = new SqlParameter("@SpecialtyOptions", (object) _specialtyOption ?? DBNull.Value);
                                
                                _sqlParam[6] = new SqlParameter("@FileName", SqlDbType.NVarChar, 400)
                                {
                                    Value = _imgName,
                                    Direction = ParameterDirection.Input
                                };
                                
                                _sqlParam[7] = new SqlParameter("@RetVal", SqlDbType.Int)
                                {
                                    Direction = ParameterDirection.Output
                                };

                                // call sproc with input parameter to insert concept into AWS database and output param (0 = success, 1 = error)
                                int _retVal = DatabaseMethods.ExecuteNonQueryStoredProcedure(_dbConn, "[dbo].[spConcept_Add]", _sqlParam);

                                if (_retVal == 0)
                                {
                                    using (TransferUtility _fileTransferUtility = new TransferUtility(_s3Client))
                                    {   
                                        TransferUtilityUploadRequest _fileTransferUtilityRequest = new TransferUtilityUploadRequest
                                        {
                                            BucketName = _bucketName,
                                            FilePath = _imgFile,
                                            Key = _keyName,                                           
                                            CannedACL = S3CannedACL.PublicRead
                                        };

                                        // upload file to AWS S3 bucket
                                        await _fileTransferUtility.UploadAsync(_fileTransferUtilityRequest);
                                        //await _fileTransferUtility.UploadAsync(_imgFile, _bucketName, _keyName);
                                        
                                        Console.WriteLine("Upload completed");
                                    }

                                    // delete image file
                                    File.Delete(@_imgFile);
                                    Console.WriteLine("image file exists");
                                }

                                // delete file after processing
                                File.Delete(_file);
                                Console.WriteLine("file exists");
                            }
                        }
                    }
                }
            }
            catch (AmazonS3Exception e)
            {
                Console.WriteLine("Error encountered on server. Message:'{0}' when writing an object", e.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine("Unknown encountered on server. Message:'{0}' when writing an object", e.Message);
            }

        }

        // initialize private variables
        private void InitializeVariables()
        {
            _accessKey = ConfigurationManager.AppSettings["AWSAccessKey"];
            _secretKey = ConfigurationManager.AppSettings["AWSSecretKey"];
            _awsConceptFolder = ConfigurationManager.AppSettings["AWSConceptFolder"];
            _awsPrintedFolder = ConfigurationManager.AppSettings["AWSPrintedFolder"];

            _publishPath = ConfigurationManager.AppSettings["PublishConcepts"];
            _processPath = ConfigurationManager.AppSettings["ProcessConcepts"];
            _imgFileExt = ConfigurationManager.AppSettings["ImageFileExt"];
            _noImages = ConfigurationManager.AppSettings["NoImages"];

            //db connection string
            _dbConnectionString = ConfigurationManager.ConnectionStrings["CustomerPortal"].ConnectionString;

            _s3Client = new AmazonS3Client(_accessKey, _secretKey, _bucketRegion);
        }



        public static bool Exists(string fileKey, string bucketName)
        {
            try
            {
                var respponse = _s3Client.GetObject(bucketName, fileKey);
                return true;
            }

            catch (Amazon.S3.AmazonS3Exception ex)
            {
                if (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
                    return false;

                //status wasn't not found, so throw the exception
                throw;
            }
        }

        // file upload and provide file path and name
        private static string UploadFile(string _publishPath, string _keyName, string _imageName)
        {            
            try
            {
                //if (Exists(_imageName, _bucketName + "/printedgames"))
                //    return "FileAlreadyExists";
                //else { 
             
                    using (TransferUtility _fileTransferUtility = new TransferUtility(_s3Client))
                    {
                        TransferUtilityUploadRequest _fileTransferUtilityRequest = new TransferUtilityUploadRequest
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

                // return success
                return "success";
                //}
            }
            
            catch (AmazonS3Exception e)
            {
                Console.WriteLine($"Image {_imageName} NOT uploaded: {e.Message}");
                //throw new Exception(e.Message);
                return "Error";
            }

            catch (Exception e)
            {
                Console.WriteLine($"Image {_imageName} NOT uploaded: {e.Message}");
                //throw new Exception(e.Message);
                return "Error";

            }
        }

        // generate image presigned url 
        private static string GeneratePreSignedURL(string _keyName, string _imageName)
        {
            string _url = null;

            try
            {
                GetPreSignedUrlRequest _getPreSignedUrlRequest = new GetPreSignedUrlRequest()
                {
                    BucketName = _bucketName,
                    Key = _keyName,
                    Expires = DateTime.UtcNow.AddDays(7),
                    Verb = HttpVerb.GET,
                };

                _url = _s3Client.GetPreSignedURL(_getPreSignedUrlRequest);
            }

            catch (AmazonS3Exception e)
            {
                throw new Exception(e.Message);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

            return _url;
        }
        
        private static async Task ImageUploadAsync(string _publishPath, string _keyName, string _imageName)
        {
            try
            {
                using (TransferUtility _fileTransferUtility = new TransferUtility(_s3Client))
                {
                    TransferUtilityUploadRequest _fileTransferUtilityRequest = new TransferUtilityUploadRequest
                    {
                        BucketName = _bucketName,
                        ContentType = "image/jpeg",
                        StorageClass = S3StorageClass.ReducedRedundancy,
                        Key = _keyName,
                        FilePath = _publishPath,
                        CannedACL = S3CannedACL.PublicRead
                    };

                    // upload file to AWS S3 bucket
                    await _fileTransferUtility.UploadAsync(_fileTransferUtilityRequest);

                }
            }
            catch (AmazonS3Exception e)
            {
                throw new Exception(e.Message);
            }

            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }

        //return content type based on the file extension
        private string GetContentType(string _fileExtension)
        {
            string _contentType = string.Empty;

            switch (_fileExtension)
            {
                case "bmp":
                    _contentType = "image/bmp";
                    break;
                case "jpeg":
                    _contentType = "image/jpeg";
                    break;
                case "jpg":
                    _contentType = "image/jpg";
                    break;
                case "gif":
                    _contentType = "image/gif";
                    break;
                case "tiff":
                    _contentType = "image/tiff";
                    break;
                case "png":
                    _contentType = "image/png";
                    break;
                case "plain":
                    _contentType = "text/plain";
                    break;
                case "rtf":
                    _contentType = "text/rtf";
                    break;
                case "msword":
                    _contentType = "application/msword";
                    break;
                case "zip":
                    _contentType = "application/zip";
                    break;
                case "mpeg":
                    _contentType = "audio/mpeg";
                    break;
                case "pdf":
                    _contentType = "application/pdf";
                    break;
                case "xgzip":
                    _contentType = "application/x-gzip";
                    break;
                case "xcompressed":
                    _contentType = "application/x-compressed";
                    break;
            }

            return _contentType;
        }

        public void MoveImages()
        {
            // call initialize variables
            InitializeVariables();

            string[] _filePaths = Directory.GetFiles(@_publishPath, "*.jpg");
            string _imgFile = null;
            string _imgName = null;

            try
            {
                // check to make sure directory is not empty
                if (_filePaths.Length > 0)
                {
                    // process xml files here
                    foreach (string _file in _filePaths)
                    {
                        //check if image file exists
                        if (File.Exists(_file))
                        {
                            _imgName = Path.GetFileName(_file);
                            _imgName = "D:\\Projects\\CustomerPortal\\Concepts\\Processed\\NoImages\\" +_imgName.Replace("jpg", "xml");
                            _imgFile = Path.GetFullPath(_imgName);

                            // check if image file exists, then save concept record and upload image file 
                            if (File.Exists(@_imgFile))
                            {
                                // move xml file after processing
                                File.Move(_file, Path.Combine(_noImages, Path.GetFileName(_file)));
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

        public void MissingGameImages()
        {
            //call initialize variables
            InitializeVariables();

            string _imgFile = null;
            string _imgName = null;
            string _keyName = null;
            string _return = null;
            SqlParameter[] _sqlParam = new SqlParameter[4];

            // get printed games to process
            var _dt = DatabaseMethods.ExecuteStoredProcedureNoParam(_dbConnectionString, "dbo.spGame_GetImage");

            try
            {// check to make sure that datatable has rows
                if (_dt.Rows.Count > 0)
                {
                    // loop thru the data table
                    foreach (DataRow _row in _dt.Rows)
                    {
                        // assign data values to local variables                      
                        _imgName = _row["ImgName"].ToString();
                        _imgFile = _row["ImgPath"].ToString();

                        // set key name to be uploaded in AWS including subfolder
                        _keyName = _awsPrintedFolder + _imgName;

                        FileInfo fi = new FileInfo(_imgFile);
                                               
                        //if (fi.Exists)
                        //{
                        //    S3FileInfo info = new S3FileInfo(_s3Client, _bucketName, _keyName);
                        //    bool fileExists = info.Exists; // true if the key Exists in other case false

                        //    if (fileExists == false)
                        //    {
                        //        // call aws file upload
                        //        _return = UploadFile(_imgFile, _keyName, _imgName);

                        //        if (_return == "success")
                        //        {
                        //            //build sql parameters
                        //            _sqlParam[0] = new SqlParameter("@GraphicID", SqlDbType.Int)
                        //            {
                        //                Value = _row["GraphicID"],
                        //                Direction = ParameterDirection.Input
                        //            };

                        //            _sqlParam[1] = new SqlParameter("@GameID", SqlDbType.Int)
                        //            {
                        //                Value = _row["GameID"],
                        //                Direction = ParameterDirection.Input
                        //            };

                        //            _sqlParam[2] = new SqlParameter("@IsImageUploaded", SqlDbType.Bit)
                        //            {
                        //                Value = 1,
                        //                Direction = ParameterDirection.Input
                        //            };

                        //            _sqlParam[3] = new SqlParameter("@RetVal", SqlDbType.Int)
                        //            {
                        //                Direction = ParameterDirection.Output
                        //            };

                        //            // call sproc with input parameter to insert printed into AWS database and output param (0 = success, 1 = error)
                        //            int _retVal = DatabaseMethods.ExecuteNonQueryStoredProcedure(_dbConnectionString, "dbo.spGameLog_SetImageUploadInd", _sqlParam);
                        //        }
                        //    }
                        //}
                        
                        //check image file
                        if (fi.Exists == false)
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

                            _sqlParam[2] = new SqlParameter("@ImgPath", SqlDbType.NVarChar, 400)
                            {
                                Value = _row["ImgPath"].ToString(),
                                Direction = ParameterDirection.Input
                            };

                            _sqlParam[3] = new SqlParameter("@RetVal", SqlDbType.Int)
                            {
                                Direction = ParameterDirection.Output
                            };

                            // call sproc with input parameter to insert printed into AWS database and output param (0 = success, 1 = error)
                            int _retVal = DatabaseMethods.ExecuteNonQueryStoredProcedure(_dbConnectionString, "[dbo].[spGameImage_Insert]", _sqlParam);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public void CheckAWSImages()
        {
            //call initialize variables
            InitializeVariables();

            string _imgFile = null;
            string _imgName = null;
            string _keyName = null;
            string _return = null;
            SqlParameter[] _sqlParam = new SqlParameter[4];

            // get printed games to process
            var _dt = DatabaseMethods.ExecuteStoredProcedureNoParam(_dbConnectionString, "dbo.spGame_GetImage");

            try
            {// check to make sure that datatable has rows
                if (_dt.Rows.Count > 0)
                {
                    // loop thru the data table
                    foreach (DataRow _row in _dt.Rows)
                    {
                        // assign data values to local variables                      
                        _imgName = _row["ImgName"].ToString();
                        _imgFile = _row["ImgPath"].ToString();

                        // set key name to be uploaded in AWS including subfolder
                        _keyName = _awsPrintedFolder + _imgName;

                        FileInfo fi = new FileInfo(_imgFile);

                        if (fi.Exists)
                        {
                            S3FileInfo info = new S3FileInfo(_s3Client, _bucketName, _keyName);
                            bool fileExists = info.Exists; // true if the key Exists in other case false

                            if (fileExists == false)
                            {
                                // call aws file upload
                                _return = UploadFile(_imgFile, _keyName, _imgName);

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
                                    int _retVal = DatabaseMethods.ExecuteNonQueryStoredProcedure(_dbConnectionString, "dbo.spGameLog_SetImageUploadInd", _sqlParam);
                                }
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

    }
}
