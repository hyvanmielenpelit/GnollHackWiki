## Secrets File

The secrets file is a json file called `ghsecrets.sjson`. It is used for storing private webhook links and other secret information. You can create a new file containing the following text:

```
{
   "EncodedDefaultGamePostAddress": "",
   "EncodedDefaultDiagnosticDataPostAddress": "",
   "EncodedDefaultXlogRegisterationAddress": "",
   "EncodedDefaultXlogPostAddress": "",
   "EncodedDefaultXlogAntiForgeryToken": "",
   "EncodedDefaultAzureBlobStorageConnectionString": ""
}
```

## Installing the File

1. Copy the **secrets file** to the `win\win32\xpl\GnollHackX\GnollHackX\Assets` directory.
2. Copy the **secrets file** to the `win\win32\xpl\GnollHackM\GnollHackM\Assets` directory.