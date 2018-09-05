using System;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using FileSystemApi.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace FileSystemApi.Services
{
    public class FileSystemService
    {
        private string _rootPath;
        private ILogger<FileSystemService> _logger;
        private PreviewService _previewService;
        private string _previewFolderPath;

        public FileSystemService(PreviewService previewService, IConfiguration configuration, ILogger<FileSystemService> logger)
        {
            _rootPath = configuration["RootFileSystemPath"];
            _logger = logger;
            _previewService = previewService;
            _previewFolderPath = configuration["RelativePreviewPath"];

            _logger.LogInformation("RootPath: " + _rootPath);
        }

        internal FileHandle GetFileHandle(string path)
        {
            string absolutePath = Path.Combine(_rootPath, path);

            if(File.Exists(absolutePath) == false)
            {
                return null;
            }

            return new FileHandle(absolutePath, _previewService);
        }

        public FolderModel GetFolderInfo(string path)
        {
            string absolutePath = Path.Combine(_rootPath, path);

            if(Directory.Exists(absolutePath) == false)
            {
                return null;
            }            

            var folderInfo = new FolderModel()
            {
                Path = path,
                ChildFolders = Directory.EnumerateDirectories(absolutePath)
                                     .Select(s => ToRelativePath(s))
                                     .Where(s => !string.Equals(s, _previewFolderPath, StringComparison.OrdinalIgnoreCase))
                                     .ToList(),
                Files = Directory.EnumerateFiles(absolutePath)
                                     .Select(s => new FileModel(ToRelativePath(s)))
                                     .ToList()
            };

            folderInfo.CleanupPaths();

            return folderInfo;
        }

        public bool CreateFolder(string path)
        {
            string absolutePath = Path.Combine(_rootPath, path);

            if(Directory.Exists(absolutePath))
            {
                return false;
            }

            Directory.CreateDirectory(absolutePath);

            return true;  
        }

        public void CreateFile(string path, Stream dataStream)
        {
            string absolutePath = Path.Combine(_rootPath, path);

            string folder = Path.GetDirectoryName(absolutePath);

            if(Directory.Exists(folder) == false)
            {
                _logger.LogError("Could not create file: " + path + " because folder: " + folder + " does not exist");
                throw new FileSystemServiceException("Could not create file: " + path + " because folder: " + folder + " does not exist");
            }

            if(File.Exists(absolutePath))
            {
                _logger.LogError("File: " + path + " does already exist");
                throw new FileSystemServiceException("File: " + path + " does already exist");

            }

            using(var f = new FileStream(absolutePath, FileMode.CreateNew))
            {
                dataStream.CopyTo(f);
            }

            _logger.LogInformation("Created file: " + path);
        }

        private string ToRelativePath(string path)
        {
            string relPath = Path.GetRelativePath(_rootPath, path);
            return relPath;
        }
    }

    [Serializable]
    public class FileSystemServiceException : Exception
    {
        public FileSystemServiceException()
        {
        }

        public FileSystemServiceException(string message) : base(message)
        {
        }

        public FileSystemServiceException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected FileSystemServiceException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}