using System;

namespace Igt.InstantsShowcase.Models
{
    public class Favorite
    {
        public int FavoriteID { get; set; }
        public int GameID { get; set; }
        public string GameName { get; set; }

        string path;
        public string Path {
            get {
                return string.IsNullOrEmpty(path) ? null : Uri.EscapeUriString(path);
            }
            set { path = value; }
        }
    }
}
