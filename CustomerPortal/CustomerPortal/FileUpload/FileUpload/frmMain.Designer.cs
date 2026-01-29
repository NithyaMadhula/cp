namespace FileUpload
{
    partial class frmMain
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        private System.Windows.Forms.Button btnUpload;
        private System.Windows.Forms.OpenFileDialog openFileDialog1;
        private System.Windows.Forms.ColorDialog colorDialog1;
        private System.Windows.Forms.PictureBox pictureBox1;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.btnUpload = new System.Windows.Forms.Button();
            this.openFileDialog1 = new System.Windows.Forms.OpenFileDialog();
            this.colorDialog1 = new System.Windows.Forms.ColorDialog();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.btnConcept = new System.Windows.Forms.Button();
            this.btnPrinted = new System.Windows.Forms.Button();
            this.button1 = new System.Windows.Forms.Button();
            this.button2 = new System.Windows.Forms.Button();
            this.btnMissingGameImages = new System.Windows.Forms.Button();
            this.btnCheckAWSImages = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout();
            // 
            // btnUpload
            // 
            this.btnUpload.Location = new System.Drawing.Point(556, 96);
            this.btnUpload.Name = "btnUpload";
            this.btnUpload.Size = new System.Drawing.Size(190, 23);
            this.btnUpload.TabIndex = 0;
            this.btnUpload.Text = "Process Games Image Upload";
            this.btnUpload.UseVisualStyleBackColor = true;
            this.btnUpload.Click += new System.EventHandler(this.btnUpload_Click);
            // 
            // openFileDialog1
            // 
            this.openFileDialog1.FileName = "openFileDialog1";
            this.openFileDialog1.Filter = "JPEG Files (*.jpg)|*.jpg|PNG Files (*.png)|*.png|BMP Files (*.bmp)|*.bmp|All file" +
    "s (*.*)|*.*";
            this.openFileDialog1.Title = "Select a picture file";
            // 
            // pictureBox1
            // 
            this.pictureBox1.Location = new System.Drawing.Point(219, 90);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(265, 29);
            this.pictureBox1.TabIndex = 1;
            this.pictureBox1.TabStop = false;
            // 
            // btnConcept
            // 
            this.btnConcept.Location = new System.Drawing.Point(555, 125);
            this.btnConcept.Name = "btnConcept";
            this.btnConcept.Size = new System.Drawing.Size(191, 23);
            this.btnConcept.TabIndex = 2;
            this.btnConcept.Text = "Process Concept Data";
            this.btnConcept.UseVisualStyleBackColor = true;
            this.btnConcept.Click += new System.EventHandler(this.btnConcept_Click);
            // 
            // btnPrinted
            // 
            this.btnPrinted.Location = new System.Drawing.Point(219, 154);
            this.btnPrinted.Name = "btnPrinted";
            this.btnPrinted.Size = new System.Drawing.Size(105, 23);
            this.btnPrinted.TabIndex = 3;
            this.btnPrinted.Text = "Process Games";
            this.btnPrinted.UseVisualStyleBackColor = true;
            this.btnPrinted.Click += new System.EventHandler(this.btnPrinted_Click);
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(219, 183);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(75, 23);
            this.button1.TabIndex = 4;
            this.button1.Text = "Image Move";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // button2
            // 
            this.button2.Location = new System.Drawing.Point(219, 125);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(75, 23);
            this.button2.TabIndex = 5;
            this.button2.Text = "WriteFile";
            this.button2.UseVisualStyleBackColor = true;
            this.button2.Click += new System.EventHandler(this.button2_Click);
            // 
            // btnMissingGameImages
            // 
            this.btnMissingGameImages.Location = new System.Drawing.Point(219, 238);
            this.btnMissingGameImages.Name = "btnMissingGameImages";
            this.btnMissingGameImages.Size = new System.Drawing.Size(148, 23);
            this.btnMissingGameImages.TabIndex = 6;
            this.btnMissingGameImages.Text = "Missing Game Image";
            this.btnMissingGameImages.UseVisualStyleBackColor = true;
            this.btnMissingGameImages.Click += new System.EventHandler(this.btnMissingGameImages_Click);
            // 
            // btnCheckAWSImages
            // 
            this.btnCheckAWSImages.Location = new System.Drawing.Point(219, 268);
            this.btnCheckAWSImages.Name = "btnCheckAWSImages";
            this.btnCheckAWSImages.Size = new System.Drawing.Size(148, 23);
            this.btnCheckAWSImages.TabIndex = 7;
            this.btnCheckAWSImages.Text = "Check AWS Images";
            this.btnCheckAWSImages.UseVisualStyleBackColor = true;
            this.btnCheckAWSImages.Click += new System.EventHandler(this.btnCheckAWSImages_Click);
            // 
            // frmMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.btnCheckAWSImages);
            this.Controls.Add(this.btnMissingGameImages);
            this.Controls.Add(this.button2);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.btnPrinted);
            this.Controls.Add(this.btnConcept);
            this.Controls.Add(this.pictureBox1);
            this.Controls.Add(this.btnUpload);
            this.Name = "frmMain";
            this.Text = "Main";
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false);

        }
        #endregion

        private System.Windows.Forms.Button btnConcept;
        private System.Windows.Forms.Button btnPrinted;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.Button button2;
        private System.Windows.Forms.Button btnMissingGameImages;
        private System.Windows.Forms.Button btnCheckAWSImages;
    }

}

