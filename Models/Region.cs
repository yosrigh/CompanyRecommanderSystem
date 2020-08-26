using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanyRecommanderSystem.Models
{
    public class Region
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("shortCode", NullValueHandling = NullValueHandling.Ignore)]
        public string ShortCode { get; set; }
    }
}
