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
using FileSystemApi.Services;

namespace FileSystemApi.Controllers
{ 
    [Route("v1/[controller]")]
    [ApiController] 
    public class FilesController : Controller
    {
        private FileSystemService _fileSystemService;

        public FilesController(FileSystemService fileSystemService)
        {
            _fileSystemService = fileSystemService;
        }

        [HttpGet("{*path}")]
        public virtual IActionResult GetFile([FromRoute][Required]string path)
        {
            FileHandle file = _fileSystemService.GetFileHandle(path); 

            if(file == null)
            {
                return NotFound();
            }
          
            return PhysicalFile(file.Path, file.ContentType);
        }
    }
}
