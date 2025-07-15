If rebuilding fails with a _compile time error_ or there is a _runtime error_, in which the runtime does not find a Java wrapper class, this may be caused by **your GnollHack repository path being too long**. To be sure, you can set your build output verbosity to Diagnostics as follows:

In Visual Studio, set **Tools → Options → Project and Solutions _[section]_ → Build and Run _[subsection]_ → MSBuild project build output verbosity** to **Diagnostic**.

## Compile Time Error

Open the **View → Output window** and set **Show output from** to **Build** and then choose **File → Save Output As**. This saves the output log to a file.

## Runtime Error

1. After the project is deployed, open the **View → Output window**, and set Show output from to Deploy (also for Build).
2. Make sure the **Output window** is selected, and then choose **File → Save Output As** to save the contents to a text file.
3. In the **View → Output window**, change **Show output from** to **Xamarin Diagnostics**.
4. Once again make sure the **Output window** is selected, and then choose **File → Save Output As** to save the contents to a text file.
