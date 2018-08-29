using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace FileSystemApi.Services
{
    public class FileHandle
    {
        private Dictionary<string, string> _imageFileEndingsAndContentTypes = new Dictionary<string, string>()
        {
            {".jpg", "image/jpeg"},
            {".jpeg", "image/jpeg"},
            {".png", "image/png"},
            {".gif", "image/gif"},
            {".bmp", "image/bmp"}
        };

        private PreviewService _previewService;

        public FileHandle(string path, PreviewService previewService)
        {
            Path = path;
            _previewService = previewService;

            string extension = System.IO.Path.GetExtension(Path);
            extension = extension.ToLower();

            if(_imageFileEndingsAndContentTypes.TryGetValue(extension, out var contentType))
            {
                IsImage = true;
                ContentType = contentType;
            }
            else
            {
                ContentType = "application/octet-stream";
            }
        }
        
        public string Path { get; }

        public bool IsImage { get; }

        public string ContentType { get; }
        public string PreviewPath => _previewService.GetPath(Path);
        public string PreviewContentType => _previewService.ContentType;
    }
}