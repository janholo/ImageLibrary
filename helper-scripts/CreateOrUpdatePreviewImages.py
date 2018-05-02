import os
import json
from PIL import Image
import time

fileEndings = ['jpg', 'jpeg']

def CreateOrUpdatePreviewImages(sourceFolder, previewFolder):
    progressCounter = 0
    for sourcePath, subDirs, files in os.walk(sourceFolder, followlinks=True):
        previewPath = sourcePath.replace(sourceFolder, previewFolder) 
       
        CreateDirectoryInfo(sourcePath, previewPath, files, subDirs)

        #DeleteObsoleteImagesOrFolderInPreview(previewPath, files, subDirs)

        for img in files:
            progressCounter += 1
            print("Progress: " + str(progressCounter))

            if img.split('.')[-1] not in fileEndings:
                continue

            srcImgPath = os.path.join(sourcePath, img)
            previewImgPath = os.path.join(previewPath, img)

            if os.path.isfile(os.path.join(previewPath, img)):
                continue

            CreatePreviewImage(srcImgPath, previewImgPath)

def CreatePreviewImage(srcImgPath, previewImgPath):
    print("Create preview: " + srcImgPath + " - " + previewImgPath)

    im = Image.open(srcImgPath)
    im.thumbnail((512, 512))
    im.save(previewImgPath)

def DeleteObsoleteImagesOrFolderInPreview(previewPath, srcFiles, srcDirs):
    for f in os.listdir(previewPath):
        if f == "info.json":
            continue
        if f in srcFiles:
            continue
        if f in srcDirs:
            continue
        os.remove(os.path.join(previewPath, f))

def CreateDirectoryInfo(sourcePath, previewPath, files, subDirs):
    dirInfo = {"name" : sourcePath.split("\\")[-1], "sourcePath" : sourcePath, "previewPath" : previewPath, "files" : files, "subDirectories" : subDirs }

    dump = json.dumps(dirInfo, sort_keys=True, indent=3, separators=(',',': '))

    if not os.path.exists(previewPath):
        os.makedirs(previewPath)

    with open(previewPath + "\\info.json", "w") as textFile:
        textFile.write(dump)

    
print("Updating the preview images...")

start = time.time()

CreateOrUpdatePreviewImages("C:\\Users\\Jan.Reinhardt\\Pictures\\src", "C:\\Users\\Jan.Reinhardt\\Pictures\\preview")

end = time.time()

print("Finished updating the preview images!")
print("The operation took " + str(end-start) + "s")
