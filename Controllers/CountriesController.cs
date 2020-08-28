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
    [Route("[controller]")]
    public class CountriesController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Country> Get()
        {
            List<Country> countries = new List<Country>();
            using (StreamReader r = new StreamReader("Countries.json"))
            {
                string json = r.ReadToEnd();
                countries = JsonConvert.DeserializeObject<List<Country>>(json);
                countries.ForEach(c => { c.FlagLink = "/assets/images/" + c.CountryShortCode.ToUpperInvariant()+".png"; });
            }
            return countries;
        }
    }
}
