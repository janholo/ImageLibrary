using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using FileSystemApi.Models;
using FileSystemApi.Services;

namespace FileSystemApi.Controllers
{
    [Route("v1/[controller]")]
    [ApiController] 
    public class DirsController : ControllerBase
    {
        private FileSystemService _fileSystemService;

        public DirsController(FileSystemService fileSystemService)
        {
            _fileSystemService = fileSystemService;
        }

        [HttpGet("{*path}")]
        public virtual IActionResult GetDirectory([FromRoute]string path)
        {
            if(path == null)
            {
                path = "";
            }

            var directoryInfo = _fileSystemService.GetDirectoryInfo(path);

            if(directoryInfo == null)
            {
                return NotFound();
            }

            return Ok(directoryInfo);
        }
    }
}
