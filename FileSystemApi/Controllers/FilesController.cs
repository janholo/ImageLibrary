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
        private ILogger<FilesController> _logger;

        public FilesController(FileSystemService fileSystemService, ILogger<FilesController> logger)
        {
            _fileSystemService = fileSystemService;
            _logger = logger;
        }

        [HttpGet("{*path}")]
        public virtual IActionResult GetFile([FromRoute][Required]string path)
        {
            FileHandle file = _fileSystemService.GetFileHandle(path);

            if (file == null)
            {
                return NotFound();
            }

            return PhysicalFile(file.Path, file.ContentType);
        }

        [HttpPut("{*path}")]
        public IActionResult UploadFile(IFormFile file, [FromRoute]string path)
        {
            if (file.Length <= 0)
            {
                return BadRequest("File size was 0");
            }

            try
            {
                _fileSystemService.CreateFile(path, file.OpenReadStream());
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
            
            return Ok();
        }   
    }
}
