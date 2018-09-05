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
    public class FoldersController : ControllerBase
    {
        private FileSystemService _fileSystemService;

        public FoldersController(FileSystemService fileSystemService)
        {
            _fileSystemService = fileSystemService;
        }

        [HttpGet("{*path}")]
        public virtual IActionResult GetFolder([FromRoute]string path)
        {
            if(path == null)
            {
                path = "";
            }

            var folderInfo = _fileSystemService.GetFolderInfo(path);

            if(folderInfo == null)
            {
                return NotFound();
            }

            return Ok(folderInfo);
        }

        [HttpPut("{*path}")]
        public virtual IActionResult CreateFolder([FromRoute]string path)
        {
            if(path == null)
            {
                return BadRequest("Cannot create root folder!");
            }

            var folderInfo = _fileSystemService.GetFolderInfo(path);

            if(folderInfo != null)
            {
                return BadRequest("Folder already exists!");
            }

            if(_fileSystemService.CreateFolder(path) == false)
            {
                return BadRequest("Unknown error - could not create folder!");
            }

            return Ok();
        }

    }
}
