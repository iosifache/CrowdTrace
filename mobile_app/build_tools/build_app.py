#!/usr/bin/env python3

# Import libraries
import click
import os
from shutil import copyfile

# Define used locations, paths and commands
class Locations:
    MOBILE_APP_PROJECT = ""
    ANDROID_APP_BUILD = MOBILE_APP_PROJECT + "android/"
    ANDROID_APK_OUTPUT = ANDROID_APP_BUILD + "app/build/outputs/apk/debug/"
    FINAL = ""
    PROGRAMS = ""
class FileFullPaths:
    INTERMEDIATE_APK = Locations.ANDROID_APK_OUTPUT + "app-debug.apk"
    FINAL_APK = Locations.FINAL + "app-debug.apk"
    UBER_APK_SIGNER = Locations.PROGRAMS + "uber-apk-signer-1.1.0.jar"
class Commands:
    BUILD_CAPACITOR = "ionic capacitor build android --no-interactive"
    CREATE_RESOURCES = "capacitor-resources -p android"
    MOVE_RESOURCES = "npm run move_resources"
    BUILD_GRANDLE = ""
    SIGN = "java -jar " + FileFullPaths.UBER_APK_SIGNER + " -a . --overwrite"
    ANDROID_EXPORT = "adb install -g " + FileFullPaths.FINAL_APK

@click.command()
@click.option('--skip-to-signing/--all', default = False)
@click.option('--skip-to-debug/--all', default = False)
@click.option('--no-deploy/--all', default = False)
def main(skip_to_signing, skip_to_debug, no_deploy):

    # Verify that the script will be runned as root
    uid = os.getuid()
    if (uid != 0):
        print("[!] Please run this script as root")
        exit(0)

    # Build Ionic and Grundle projects
    if (not skip_to_signing and not skip_to_debug):
        
        os.chdir(Locations.MOBILE_APP_PROJECT)
        os.system(Commands.BUILD_CAPACITOR)
        os.system(Commands.CREATE_RESOURCES)
        os.system(Commands.MOVE_RESOURCES)

        os.chdir(Locations.ANDROID_APP_BUILD)
        os.system(Commands.BUILD_GRANDLE)

    # Move resulting .apk to final location and sign it
    os.chdir(Locations.FINAL)
    if (not skip_to_debug):

        try:
            os.remove(FileFullPaths.FINAL_APK)
        except:
            pass
        copyfile(FileFullPaths.INTERMEDIATE_APK, FileFullPaths.FINAL_APK)

        os.chdir(Locations.FINAL)
        os.system(Commands.SIGN)

    else:

        os.chdir(Locations.FINAL)

    # Move .apk to Android
    if (not no_deploy):
        os.system(Commands.ANDROID_EXPORT)

if __name__ == "__main__":

    main()