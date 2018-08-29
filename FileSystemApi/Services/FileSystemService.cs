using System;
using System.IO;
using System.Linq;
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

            return folderInfo;
        }

        private string ToRelativePath(string path)
        {
            string relPath = Path.GetRelativePath(_rootPath, path);
            _logger.LogInformation("Old path: " + path + ", new path: " + relPath);

            return relPath;
        }
    }
}