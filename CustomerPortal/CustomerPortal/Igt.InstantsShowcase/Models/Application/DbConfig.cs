using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Igt.InstantsShowcase.Models.Application
{
    /// <summary>
    /// 
    /// </summary>
    public class DbConfig : IDbConfig
    {
        /// <summary>
        /// 
        /// </summary>
        public string ConnectionString { get; set; }
    }
}
