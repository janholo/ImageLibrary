using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using SixLabors.Primitives;

namespace FileSystemApi.Services
{
    public class PreviewService
    {
        private string _previewTempPath;
        private int _previewPixelSize = 256;
        private int _previewQuality = 50;
        private ILogger<PreviewService> _logger;

        public PreviewService(IConfiguration configuration, ILogger<PreviewService> logger)
        {
            _previewTempPath = Path.Combine(configuration["RootFileSystemPath"], configuration["RelativePreviewPath"]);
            Directory.CreateDirectory(_previewTempPath);

            _logger = logger;

            _logger.LogInformation("Preview Temp Path: " + _previewTempPath);
        }

        public string ContentType => "image/jpeg";

        public string GetPath(string path)
        {
            string previewFileName = GetHash(path) + ".jpg";

            string previewPath = Path.Combine(_previewTempPath, previewFileName);

            _logger.LogInformation("Preview Path: " + previewPath);

            if(File.Exists(previewPath) == false)
            {
                CreatePreview(path, previewPath);
            }

            return previewPath;            
        }

        private string GetHash(string path)
        {
            using (var hashMethod = MD5.Create())  
            {  
                byte[] bytes = hashMethod.ComputeHash(Encoding.UTF8.GetBytes(path));  
  
                StringBuilder builder = new StringBuilder();  
                for (int i = 0; i < bytes.Length; i++)  
                {  
                    builder.Append(bytes[i].ToString("x2"));  
                }  
                return builder.ToString();  
            }
        }

        private void CreatePreview(string path, string previewPath)
        {
            using (Image<Rgba32> image = Image.Load(path)) 
            {
                image.Mutate(ctx=>ctx.Resize(_previewPixelSize, 0));
                image.Save(previewPath, new JpegEncoder()
                {
                    Quality = _previewQuality
                });
            }
        }
    }
}