import os
import json

fileEndings = ['.jpg', 'jpeg']

def CreateOrUpdatePreviewImages(sourceFolder, previewFolder):

    for sourcePath, subDirs, files in os.walk(sourceFolder, followlinks=True):
        previewPath = sourcePath.replace(sourceFolder, previewFolder) 
       
        dirInfo = {"name" : sourcePath.split("/")[-1], "sourcePath" : sourcePath, "previewPath" : previewPath, "files" : files, "subDirectories" : subDirs }

        dump = json.dumps(dirInfo, sort_keys=True, indent=3, separators=(',',': '))
        
        if not os.path.exists(previewPath):
            os.makedirs(previewPath)
        
        with open(previewPath + "/info.json", "w") as textFile:
            textFile.write(dump)
        
    
print("Updating the preview images...")

CreateOrUpdatePreviewImages("/var/www/data/images", "/var/www/data/preview")

print("Finished updating the preview images!")
