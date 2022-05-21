using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using NLog;
using NLog.Common;
using NLog.Config;
using NLog.Targets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PcrTestAPI.Logger
{
    public class NLogConfiguration
    {
        public static LoggingConfiguration ConfigureTarget()
        {
            var config = new LoggingConfiguration();
            var dbTarget = new DatabaseTarget
            {
                ConnectionString = DBSettings.DBConection,
                DBProvider = "sqlserver",
                Name = "database",
                CommandText = "INSERT INTO dbo.__Logs (LogDate, LogMessage, LogLevel, LogIP, LogURL, LogException, LogUserID, LogModule, LogCallSite, LogSessionID) values (@LogDate, @LogMessage, @LogLevel, @LogIP, @LogURL, @LogException, @LogUserId, @LogModule, @LogCallSite, @LogSessionId);"
            };
            dbTarget.Parameters.Add(new DatabaseParameterInfo("@logDate", "${date}"));
            dbTarget.Parameters.Add(new DatabaseParameterInfo("@logMessage", "${message}"));
            dbTarget.Parameters.Add(new DatabaseParameterInfo("@logLevel", "${level:uppercase=true}"));
            dbTarget.Parameters.Add(new DatabaseParameterInfo("@logIP", "${aspnet-request-ip}"));
            dbTarget.Parameters.Add(new DatabaseParameterInfo("@logURL", "${aspnet-request-url}"));
            dbTarget.Parameters.Add(new DatabaseParameterInfo("@logException", "${exception:format=tostring}"));
            dbTarget.Parameters.Add(new DatabaseParameterInfo("@logUserId", "${event-properties:UserId}"));
            dbTarget.Parameters.Add(new DatabaseParameterInfo("@logModule", "${logger}"));
            dbTarget.Parameters.Add(new DatabaseParameterInfo("@logCallSite", "${callsite:filename=true}"));
            dbTarget.Parameters.Add(new DatabaseParameterInfo("@logSessionId", "${aspnet-sessionid}"));
            config.AddTarget("database", dbTarget);
            var rule = new LoggingRule("*", NLog.LogLevel.Trace, NLog.LogLevel.Fatal, dbTarget);
            config.LoggingRules.Add(rule);
            InternalLogger.LogFile = ".\\Logger\\internal_logs\\InternalLog.txt";
            InternalLogger.LogLevel = NLog.LogLevel.Trace;
            return config;
        }
    }
}
