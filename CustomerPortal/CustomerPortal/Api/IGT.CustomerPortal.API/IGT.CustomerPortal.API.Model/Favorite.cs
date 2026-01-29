using System;

namespace IGT.CustomerPortal.API.Model
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

    public class DetailedFavorite : GameDetails
    {
        public int FavoriteID { get; set; }
    }
}
