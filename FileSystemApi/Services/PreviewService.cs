using System;
using System.IO;
using System.Diagnostics;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using NetVips;
using System.Runtime.InteropServices;

namespace FileSystemApi.Services
{
    public class PreviewService
    {
        private string _previewTempPath;
        private int _previewPixelSize = 256;
        private int _previewQuality = 50;
        private ILogger<PreviewService> _logger;

        private Object lockObject = new Object();

        public PreviewService(IConfiguration configuration, ILogger<PreviewService> logger)
        {
            if (Directory.Exists(configuration["RootFileSystemPath"]) == false)
            {
                throw new ArgumentException("Invalid RootFileSystemPath in appsettings.json!");
            }

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

            if (File.Exists(previewPath) == false)
            {
                lock(lockObject)
                {
                    CreatePreviewLibVips(path, previewPath);
                }
            }

            return previewPath;
        }

        private void CreatePreviewLibVips(string path, string previewPath)
        {
            Stopwatch sw = new Stopwatch();
            sw.Start();

            var thumbnail = Image.Thumbnail(path, _previewPixelSize);
            thumbnail.WriteToFile(previewPath);
            
            sw.Stop();
            _logger.LogInformation("CreatePreview took: " + sw.ElapsedMilliseconds + "ms");
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


        // private void CreatePreviewImageSharp(string path, string previewPath)
        // {
        //     using (Image<Rgba32> image = Image.Load(path))
        //     {
        //         image.Mutate(ctx => ctx.Resize(_previewPixelSize, 0));
        //         image.Save(previewPath, new JpegEncoder()
        //         {
        //             Quality = _previewQuality
        //         });
        //     }
        // }

        // private void CreatePreviewLibVipsCmd(string path, string previewPath)
        // {
        //     Stopwatch sw = new Stopwatch();
        //     sw.Start();

        //     string command = "vipsthumbnail -s " + _previewPixelSize + " -o \"" + previewPath + "\" \"" + path + "\"";

        //     _logger.LogInformation("Create Preview Command: " + command);

        //     if(RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
        //     {
        //         string result = Powershell(command);
        //         _logger.LogInformation("Create Preview Powershell Result: " + result);
        //     }
        //     else
        //     {
        //         string result = Bash(command);
        //         _logger.LogInformation("Create Preview Bash Result: " + result);
        //     }   

        //     sw.Stop();
        //     _logger.LogInformation("CreatePreview took: " + sw.ElapsedMilliseconds + "ms");
        // }

        // public string Bash(string cmd)
        // {
        //     var escapedArgs = cmd.Replace("\"", "\\\"");

        //     var process = new Process()
        //     {
        //         StartInfo = new ProcessStartInfo
        //         {
        //             FileName = "/bin/bash",
        //             Arguments = $"-c \"{escapedArgs}\"",
        //             RedirectStandardOutput = true,
        //             UseShellExecute = false,
        //             CreateNoWindow = true,
        //         }
        //     };
        //     process.Start();
        //     string result = process.StandardOutput.ReadToEnd();
        //     process.WaitForExit();
        //     return result;
        // }

        // public string Powershell(string cmd)
        // {
        //     var escapedArgs = cmd.Replace("\"", "\\\"");

        //     var process = new Process()
        //     {
        //         StartInfo = new ProcessStartInfo
        //         {
        //             FileName = "powershell.exe",
        //             Arguments = escapedArgs,
        //             RedirectStandardOutput = true,
        //             RedirectStandardError = true,
        //             UseShellExecute = false,
        //             CreateNoWindow = true,
        //         }
        //     };
        //     process.Start();
        //     string result = process.StandardOutput.ReadToEnd();
        //     result += Environment.NewLine + process.StandardError.ReadToEnd();

        //     process.WaitForExit();
        //     return result;
        // }
    }
}
