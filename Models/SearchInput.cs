using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanyRecommanderSystem.Models
{
    public class SearchInput
    {
        public int minAge { get; set; }
        public int maxAge { get; set; }
        public string size { get; set; }
        public List<string> categories { get; set; }
        public List<ExtendedRegion> regionsAndCountries { get; set; }

        public bool rankedByAgeDesc { get; set; }
        public bool rankedByScoreDesc { get; set; }
        public bool rankedByRaisedMoneyDesc { get; set; }
    }
}
