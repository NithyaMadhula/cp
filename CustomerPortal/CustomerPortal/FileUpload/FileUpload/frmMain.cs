using Amazon.S3;
using Amazon.S3.Transfer;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace FileUpload
{
    public partial class frmMain : Form
    {
       
        public frmMain()
        {
            InitializeComponent();
            
            btnUpload_Click(null, EventArgs.Empty);

            Application.Exit();
        }
               
        private void btnUpload_Click(object sender, EventArgs e)
        {
            FileUpload _fileUpload = new FileUpload();

            _fileUpload.ProcessImageGameUpload();

            MessageBox.Show("Printed Game images upload successfully completed");            
        }

        private void btnConcept_Click(object sender, EventArgs e)
        {
            FileUpload _fileUpload = new FileUpload();

            //process concept games
            _fileUpload.ProcessXML();
        }

        private void btnPrinted_Click(object sender, EventArgs e)
        {
            FileUpload _fileUpload = new FileUpload();

            // process printed games
            _fileUpload.ProcessGames();            
        }

        private void button1_Click(object sender, EventArgs e)
        {
            FileUpload _fileUpload = new FileUpload();

            //process concept games
            _fileUpload.MoveImages();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            string _filename = @"D:\Projects\CustomerPortal\Concepts\ReportFile.txt";

            using (StreamWriter fs = File.CreateText(_filename))
            {

                string[] _filePaths = Directory.GetFiles(@"D:\Projects\CustomerPortal\Concepts\Processed\NoImages", "*.xml");
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
                                _imgName = "D:\\Projects\\CustomerPortal\\Concepts\\Processed\\NoImages\\" + _imgName.Replace("xml", "jpg");
                                _imgFile = Path.GetFullPath(_imgName);

                              
                                // check if image file exists, then save concept record and upload image file 
                                if (File.Exists(@_imgFile))
                                {                                   
                                    fs.WriteLine("XML File: " + _file + " Image File: " + _imgFile);                                     
                                }
                                else
                                {
                                    fs.WriteLine("XML File: " + _file + " Image File: NO Images");
                                }
                            }
                        }
                    }
                }
                catch (Exception)
                {
                    throw;
                }


            }
        }

        private void btnMissingGameImages_Click(object sender, EventArgs e)
        {
            FileUpload _fileUpload = new FileUpload();
            // _fileUpload.ProcessFileUpload();

            _fileUpload.MissingGameImages();
        }

        private void btnCheckAWSImages_Click(object sender, EventArgs e)
        {
            FileUpload _fileUpload = new FileUpload();
            // _fileUpload.ProcessFileUpload();

            _fileUpload.CheckAWSImages();
        }
    }
}
