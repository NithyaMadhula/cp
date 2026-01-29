using System.Collections.Generic;
using System.IO;

namespace Igt.InstantsShowcase.Models
{
    public class Email
    {
        public string From { get; set; }
        public string To { get; set; }
        public string Body { get; set; }
        public string Subject { get; set; }
        public string Cc { get; set; } = "";
        public string Bcc { get; set; } = "";
        public List<FileInfo> Attachments { get; set; }
    }
}
