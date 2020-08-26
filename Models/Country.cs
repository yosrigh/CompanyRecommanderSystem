using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanyRecommanderSystem.Models
{
    public class Country
    {
        [JsonProperty("countryName")]
        public string CountryName { get; set; }

        [JsonProperty("countryShortCode")]
        public string CountryShortCode { get; set; }

        [JsonProperty("regions")]
        public List<Region> Regions { get; set; }
    }
}
