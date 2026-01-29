using System;

namespace IGT.CustomerPortal.API.Model
{
    public class SalesWeekEndingsForYear
    {
        public string WeekEnding { get; set; }
        public DateTime WeekEndDate { get; set; }
        public string WeekStart { get; set; }
        public DateTime WeekStartDate { get; set; }
    }
}
