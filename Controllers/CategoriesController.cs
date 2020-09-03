using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CompanyRecommanderSystem.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

namespace CompanyRecommanderSystem.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        [HttpGet]
        public List<Category> Get()
        {
            return AllCategories.Categories;
        }
    }
}
