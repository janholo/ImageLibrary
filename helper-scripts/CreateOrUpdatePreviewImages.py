import os
import json
from PIL import Image
import time
import shutil

fileEndings = ['jpg', 'jpeg', 'png']

def CreateOrUpdatePreviewImages(sourceFolder, previewFolder):
    progressCounter = 0
    for sourcePath, subDirs, files in os.walk(sourceFolder, followlinks=True):
        previewPath = sourcePath.replace(sourceFolder, previewFolder) 
       
        CreateDirectoryInfo(sourcePath, previewPath, files, subDirs)

        DeleteObsoleteImagesOrFolderInPreview(previewPath, files, subDirs)

        for img in files:
            progressCounter += 1
            print("Progress: " + str(progressCounter))

            if img.split('.')[-1].lower() not in fileEndings:
                continue

            srcImgPath = os.path.join(sourcePath, img)
            previewImgPath = os.path.join(previewPath, img)

            if os.path.isfile(os.path.join(previewPath, img)):
                continue

            CreatePreviewImage(srcImgPath, previewImgPath)

def CreatePreviewImage(srcImgPath, previewImgPath):
    print("Create preview: " + srcImgPath + " - " + previewImgPath)
    try:
        im = Image.open(srcImgPath)
        im.thumbnail((512, 512))
        im.save(previewImgPath, quality=50)
    except:
        print("Could not create preview of the following file: " + srcImgPath)

def DeleteObsoleteImagesOrFolderInPreview(previewPath, srcFiles, srcDirs):
    for f in os.listdir(previewPath):
        if f == "info.json":
            continue
        if f in srcFiles:
            continue
        if f in srcDirs:
            continue
        f = os.path.join(previewPath, f)
        print("Remove: " + f)
        if os.path.isfile(f):
            os.remove(f)
        else:
            shutil.rmtree(f)

def CreateDirectoryInfo(sourcePath, previewPath, files, subDirs):
    dirInfo = {"name" : os.path.basename(os.path.normpath(sourcePath)), "sourcePath" : sourcePath, "previewPath" : previewPath, "files" : files, "subDirectories" : subDirs }

    dump = json.dumps(dirInfo, sort_keys=True, indent=3, separators=(',',': '))

    if not os.path.exists(previewPath):
        os.makedirs(previewPath)

    with open(os.path.join(previewPath, "info.json"), "w") as textFile:
        textFile.write(dump)


print("Updating the preview images...")

start = time.time()

CreateOrUpdatePreviewImages("/var/www/data/images", "/var/www/data/preview")

end = time.time()

print("Finished updating the preview images!")
print("The operation took " + str(end-start) + "s")

