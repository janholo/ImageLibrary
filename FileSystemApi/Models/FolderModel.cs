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
    public class FolderModel
    { 
        [DataMember(Name="path")]
        public string Path { get; set; }

        [DataMember(Name="files")]
        public List<FileModel> Files { get; set; }

        [DataMember(Name="childFolders")]
        public List<string> ChildFolders { get; set; }

        public override string ToString()
        {
            var sb = new StringBuilder();
            sb.Append("class FolderModel {\n");
            sb.Append("  Path: ").Append(Path).Append("\n");
            sb.Append("  Files: ").Append(Files).Append("\n");
            sb.Append("  ChildFolders: ").Append(ChildFolders).Append("\n");
            sb.Append("}\n");
            return sb.ToString();
        }
    }
}
