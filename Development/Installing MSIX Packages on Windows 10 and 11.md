![installing-msix-packages](/uploads/Installing%20MSIX%20Packages%20on%20Windows%2010%20and%2011/installing-msix-packages.webp)

## Overview

These are the instructions how to install a **signed MSIX package**. You can't install it directly but you need to accept the signing certificate first.

You need **administrator priviledges** on your computer to do this.

## Installing the Certificate

If you haven't installed the GnollHack MSIX certificate, you need to first follow these steps to do so.

1. Right-click the MSIX package and select **Properties**.
2. Go to the **Digital Signatures** tab.
3. Select the certificate in Embedded Signatures and click **Details**.
    - Note that if there are no certificates under Embedded Signatures, the MSIX package is not signed and you won't be able to install it. You must ask the developer to sign the package first.
4. In the Digital Signature Details, in the General tab, click **View Certificate**.
5. In the Certificate dialog, in the General tab, click **Install Certificate**.
6. In the Certificate Import Wizard, choose **Local Machine** as Store Location, and click Next.
    - This requires **administrator priviledges** and Windows will prompt you to allow the installation to continue.
7. In the Certificate Store step, select **Place all certificates in the following store** and click **Browse...**
8. In the Select Certificate Store popup, select **Trusted Root Certification Authorities** and click OK.
9. Click Next and then click Finish.
10. The Certificate Import Wizard should say **"The import was successful"** if everything succeeded.
11. You can now close all popups by clicking OK in each of them.

## Installing the MSIX package

You can now double click the MSIX package and it should allow you to install GnollHack on Windows 10 and 11.
