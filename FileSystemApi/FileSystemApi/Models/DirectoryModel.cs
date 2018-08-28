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
    public class DirectoryModel : IEquatable<DirectoryModel>
    { 
        [DataMember(Name="path")]
        public string Path { get; set; }

        [DataMember(Name="files")]
        public List<FileModel> Files { get; set; }

        [DataMember(Name="childDirs")]
        public List<string> ChildDirs { get; set; }

        public override string ToString()
        {
            var sb = new StringBuilder();
            sb.Append("class DirectoryInfo {\n");
            sb.Append("  Path: ").Append(Path).Append("\n");
            sb.Append("  Files: ").Append(Files).Append("\n");
            sb.Append("  ChildDirs: ").Append(ChildDirs).Append("\n");
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
            return obj.GetType() == GetType() && Equals((DirectoryModel)obj);
        }


        public bool Equals(DirectoryModel other)
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
                    Files == other.Files ||
                    Files != null &&
                    Files.SequenceEqual(other.Files)
                ) && 
                (
                    ChildDirs == other.ChildDirs ||
                    ChildDirs != null &&
                    ChildDirs.SequenceEqual(other.ChildDirs)
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
                    if (Files != null)
                    hashCode = hashCode * 59 + Files.GetHashCode();
                    if (ChildDirs != null)
                    hashCode = hashCode * 59 + ChildDirs.GetHashCode();
                return hashCode;
            }
        }
    }
}
