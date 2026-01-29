using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Igt.InstantsShowcase.Models
{
    public class KeyValue
    {
        public KeyValue(string key, string value)
        {
            Key = key;
            Value = value;
        }

        public string Key { get; set; }
        public string Value { get; set; }
    }
}
