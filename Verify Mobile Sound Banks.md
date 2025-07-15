## Sound Bank Verification

GnollHack Android and iOS verify the sound banks on app start up. If you get error popups when the app starts and sounds don't play in the game, you have a **mismatch between installed mobile sound banks and the verification info in [ghsettings.json](https://github.com/hyvanmielenpelit/GnollHack/blob/master/win/win32/winclisrv/GnollHackClient/GnollHackClient/Assets/ghsettings.json)** file. (It is found under the **Assets** directory in the **GnollHackClient** project.) The sound banks can be older or newer than what is listed in the repository. In any case, you need to get new sound bank files or update the right information to the **ghsettings.json** file. 

## Updating Right Information

You need to get the sound banks' **SHA256 fingerprints** (using [7-zip](https://www.7-zip.org/), for example) and put them into **[ghsettings.json](https://github.com/hyvanmielenpelit/GnollHack/blob/master/win/win32/winclisrv/GnollHackClient/GnollHackClient/Assets/ghsettings.json)** file under the **Assets** directory in the **GnollHackClient** project. Additionally, you need to update also the sound banks' file sizes. This information goes to the following JSON fields:

```
    "length": [file-size-in-bytes]
    "sha256": "[sha-256-CRC]"
```
where
- `[file-size-in-bytes]` is the file size in bytes, for example, `73022432`.
- `[sha-256-CRC]` is the SHA256 fingerprint, for example, `d165147e5343e1dc6ec432b477b4dfc137ae5b4dffab996922b42438a6c8f27d`.

## Getting File Size and SHA256 Fingerprint

To get a file's size in bytes and its SHA256 fingerprint, you can do the following:

1. Install [7-zip](https://www.7-zip.org/).
2. Right-click on the file and select **CRC → SHA256**. (In Windows 11, you need to choose **Show more options** first before you can see 7-zip's context commands.)