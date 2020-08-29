using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanyRecommanderSystem.Models
{
    public class ExtendedRegion
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string CountryCode { get; set; }

        public ExtendedRegion(string name, string code, string countryCode)
        {
            Name = name;
            Code = code;
            CountryCode = countryCode;
        }
    }
}
