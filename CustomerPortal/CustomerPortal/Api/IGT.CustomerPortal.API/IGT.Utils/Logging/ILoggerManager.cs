using System.Runtime.CompilerServices;

namespace IGT.Utils.Logging
{
    public interface ILoggerManager
    {
        void Log(LogLevel level, string message, object caller = null, [CallerMemberName] string membername = "");
    }
}
