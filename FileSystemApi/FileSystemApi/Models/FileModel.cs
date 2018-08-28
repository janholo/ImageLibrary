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
    [DataContract]
    public partial class FileModel : IEquatable<FileModel>
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
                    FileType = FileTypeEnum.ImageEnum;
                    break;
                case ".mp4":
                    FileType = FileTypeEnum.VideoEnum;
                    break;
                default:
                    FileType = FileTypeEnum.OtherEnum;
                    break;
            }
        }

        [DataMember(Name="path")]
        public string Path { get; set; }

        public enum FileTypeEnum
        { 
            [EnumMember(Value = "image")]
            ImageEnum = 1,
            
            [EnumMember(Value = "video")]
            VideoEnum = 2,
            
            [EnumMember(Value = "other")]
            OtherEnum = 3
        }

        [DataMember(Name="fileType")]
        public FileTypeEnum? FileType { get; set; }

        public override string ToString()
        {
            var sb = new StringBuilder();
            sb.Append("class FileInfo {\n");
            sb.Append("  Path: ").Append(Path).Append("\n");
            sb.Append("  FileType: ").Append(FileType).Append("\n");
            sb.Append("}\n");
            return sb.ToString();
        }

        public string ToJson()
        {
            return JsonConvert.SerializeObject(this, Formatting.Indented);
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            return obj.GetType() == GetType() && Equals((FileModel)obj);
        }

        public bool Equals(FileModel other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;

            return 
                (
                    Path == other.Path ||
                    Path != null &&
                    Path.Equals(other.Path)
                ) && 
                (
                    FileType == other.FileType ||
                    FileType != null &&
                    FileType.Equals(other.FileType)
                );
        }

        public override int GetHashCode()
        {
            unchecked // Overflow is fine, just wrap
            {
                var hashCode = 41;
                // Suitable nullity checks etc, of course :)
                    if (Path != null)
                    hashCode = hashCode * 59 + Path.GetHashCode();
                    if (FileType != null)
                    hashCode = hashCode * 59 + FileType.GetHashCode();
                return hashCode;
            }
        }
    }
}
