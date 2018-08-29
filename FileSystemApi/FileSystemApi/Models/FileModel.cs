using System;
using System.Linq;
using System.IO;
using System.Text;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace FileSystemApi.Models
{
    public enum FileType
    {
        None = 0,
        Image = 1,
        Video = 2,
        Other = 3
    }

    [DataContract]
    public partial class FileModel
    {
        public FileModel(string path)
        {
            Path = path;
            string extension = System.IO.Path.GetExtension(Path).ToLower();
            switch(extension)
            {
                case ".png":
                case ".jpg":
                case ".jpeg":
                case ".gif":
                case ".bmp":
                    FileType = FileType.Image;
                    break;
                case ".mp4":
                    FileType = FileType.Video;
                    break;
                default:
                    FileType = FileType.Other;
                    break;
            }
        }

        [DataMember(Name="path")]
        public string Path { get; set; }

        [DataMember(Name="fileType")]
        public FileType FileType { get; set; }

        public override string ToString()
        {
            var sb = new StringBuilder();
            sb.Append("class FileInfo {\n");
            sb.Append("  Path: ").Append(Path).Append("\n");
            sb.Append("  FileType: ").Append(FileType).Append("\n");
            sb.Append("}\n");
            return sb.ToString();
        }
    }
}
