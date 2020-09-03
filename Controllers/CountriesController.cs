using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CompanyRecommanderSystem.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CompanyRecommanderSystem.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("[controller]")]
    public class CountriesController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Country> Get()
        {
            using (StreamReader r = new StreamReader("Countries.json"))
            {
                string json = r.ReadToEnd();
                var extendedCountries = JsonConvert.DeserializeObject<List<extendedCountry>>(json);
                return extendedCountries.Select(c => new Country(
                    c.CountryName,
                    c.CountryShortCode,
                    "/assets/images/" + c.CountryShortCode.ToUpperInvariant() + ".png")).ToList();
            }
        }
        [HttpPost]
        public List<ExtendedRegion> GetRegions([FromBody] List<string> countriesCodes)
        {
            if (countriesCodes == null || countriesCodes.Count == 0)
                return null;

            List<ExtendedRegion> regions = new List<ExtendedRegion>();
            using (StreamReader r = new StreamReader("Countries.json"))
            {
                string json = r.ReadToEnd();
                var extendedCountries = JsonConvert.DeserializeObject<List<extendedCountry>>(json);
                var filtredCountries = extendedCountries.Where(c => countriesCodes.Contains(c.CountryShortCode)).ToList();

                var extendedRegions = new List<ExtendedRegion>();
                foreach(var country in filtredCountries)
                {
                    foreach(var region in country.Regions)
                    {
                        var extReg = new ExtendedRegion();
                        extReg.Name = region.Name;
                        extReg.Code = region.ShortCode;
                        extReg.CountryCode = country.CountryName;
                        extendedRegions.Add(extReg);
                    }
                }
                return extendedRegions; 
            }
        }
    }
}
