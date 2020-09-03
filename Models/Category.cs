using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanyRecommanderSystem.Models
{
    public class Category
    {
        public string ParentCategory { get; set; }
        public string ChildCategory { get; set; }
    }
}
