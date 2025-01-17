﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanyRecommanderSystem.Models
{
    public class Country
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string FlagLink { get; set; }

        public Country(string name, string code, string flagLink)
        {
            Name = name;
            Code = code;
            FlagLink = flagLink;
        }
    }
}
