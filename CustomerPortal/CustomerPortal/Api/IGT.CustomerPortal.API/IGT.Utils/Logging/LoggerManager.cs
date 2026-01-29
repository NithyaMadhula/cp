using NLog;
using NLog.Config;
using NLog.Targets;
using System.Configuration;
using System.Runtime.CompilerServices;

namespace IGT.Utils.Logging
{
    public class LoggerManager : ILoggerManager
    {
        static readonly Logger logger = LogManager.GetCurrentClassLogger();

        public LoggerManager()
        {
            var config = new LoggingConfiguration();
            var logfile = new FileTarget("logfile") {
                FileName = ConfigurationManager.AppSettings["LogFile"],
                Layout = "${longdate}|${level: uppercase = true}|${event-context:CallerType}|${event-context:CallerMember}|${message}"
            };
            config.AddRuleForAllLevels(logfile);

            LogManager.Configuration = config;
        }

        public void Log(LogLevel level, string message, object caller = null, [CallerMemberName] string membername = "")
        {
            NLog.LogLevel logLevel = NLog.LogLevel.Off;
            switch (level)
            {
                case LogLevel.Trace:
                    logLevel = NLog.LogLevel.Trace;
                    break;
                case LogLevel.Debug:
                    logLevel = NLog.LogLevel.Debug;
                    break;
                case LogLevel.Info:
                    logLevel = NLog.LogLevel.Info;
                    break;
                case LogLevel.Warn:
                    logLevel = NLog.LogLevel.Warn;
                    break;
                case LogLevel.Error:
                    logLevel = NLog.LogLevel.Error;
                    break;
                case LogLevel.Fatal:
                    logLevel = NLog.LogLevel.Fatal;
                    break;
                default:
                    logLevel = NLog.LogLevel.Off;
                    break;
            }
            LogEventInfo eventInfo = new LogEventInfo(logLevel, logger.Name, message);
            eventInfo.Properties["CallerType"] = (caller != null) ? caller.GetType().FullName : "";
            eventInfo.Properties["CallerMember"] = membername;
            logger.Log(eventInfo);
        }
    }
}
