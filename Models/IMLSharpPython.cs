using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanyRecommanderSystem.Models
{
    interface IMLSharpPython
    {
        string ExecutePythonScript(string filePythonScript, out string standardError);
    }
}
