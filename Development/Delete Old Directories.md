We have changed the following directories:

- `win\win32\vs2017` → `win\win32\vs`
- `win\win32\winclisrv` → `win\win32\xam`
    - `win\win32\winclisrv\GnollHackClient` → `win\win32\xam\GnollHackClient` → `win\win32\xam\GnollHackX`
    - `win\win32\winclisrv\GnollHackCommon` → `win\win32\xam\GnollHackCommon` → *(deleted)*

The old directories can still have some files, such as **obj** and **bin** directories.

**Please delete all old directories.**
- You should be able to find files that are not in `.gitignore` in the **GitHub Changes** tab.
- The rest of the files that are not part of the repository you need to delete using **File Explorer**.