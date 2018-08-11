##INSTALLASI
```
- Java SE Development Kit 8u102
- jdk-8u102-windows-x64.exe

1-install jdk
2-add java/jdk…/bin to path
3-add sdk/tools/bin to path
4-run command line and write sdkmanager --licenses
5-Download the rest of the packages by following the instructions
6-You should get the following message:
All SDK package licenses accepted.======] 100% Computing updates
```

STEP by STEP

A. JAVA INSTALL AND SETTING 
```
  -URL: http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
  Control Panel\System and Security\System -> ENVIRONMENT VARIABLE
  -System variable
   JDK_HOME
	C:\Program Files\Java\jdk1.8.0_102
   JRE_HOME
	C:\Program Files\Java\jre1.8.0_102
   Path
	C:\ProgramData\Oracle\Java\javapath;%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;%SYSTEMROOT%\System32\WindowsPowerShell\v1.0\;%JDK_HOME%\bin;%JRE_HOME%\bin;
```

C:\ProgramData\Oracle\Java\javapath;C:\Program Files (x86)\Intel\iCLS Client\;C:\Program Files\Intel\iCLS Client\;%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;%SYSTEMROOT%\System32\WindowsPowerShell\v1.0\;C:\Program Files\Intel\Intel(R) Management Engine Components\DAL;C:\Program Files\Intel\Intel(R) Management Engine Components\IPT;C:\Program Files (x86)\Intel\Intel(R) Management Engine Components\DAL;C:\Program Files (x86)\Intel\Intel(R) Management Engine Components\IPT;D:\xampp\php;C:\Program Files\TortoiseSVN\bin;C:\Program Files\doxygen\bin;C:\Program Files\nodejs\;D:\code\Editor\adt-bundle-windows-x86_64-20130911\adt-bundle-windows-x86_64-20130911\sdk\tools;D:\code\Editor\adt-bundle-windows-x86_64-20130911\adt-bundle-windows-x86_64-20130911\sdk\platform-tools;C:\ProgramData\ComposerSetup\bin;C:\Program Files\MySQL\MySQL Utilities 1.6\
```
   TEST CMD prom:
   c:\user\userlogin>
   c:\user\userlogin>javac
   if show parameter -> success config
```

B. NOTE JS INSTALL /NPM 
```
  https://nodejs.org/en/  
  LTS
  Control Panel\System and Security\System -> ENVIRONMENT VARIABLE
  user variable
  PATH
  	C:\Users\Lukison - NB1\AppData\Roaming\npm
  path
  C:\ProgramData\Oracle\Java\javapath;%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;%SYSTEMROOT%\System32\WindowsPowerShell\v1.0\;%JDK_HOME%\bin;%JRE_HOME%\bin;C:\Program Files\nodejs\;

  a.install bower via NPM
  b.install cordova via NPM
```

C. RENAME AND COPY apache-ant
```
   rename folder apache-ant-1.9.6-bin to apache-ant
   copy apache-ant to C:\Program Files\
   Control Panel\System and Security\System -> ENVIRONMENT VARIABLE
   -System variable
   Path 
   	C:\ProgramData\Oracle\Java\javapath;%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;%SYSTEMROOT%\System32\WindowsPowerShell\v1.0\;%JDK_HOME%\bin;%JRE_HOME%\bin;C:\Program Files\nodejs\;C:\Program Files\apache-ant\bin;
```

D.INSTALL ANDROID SDK
```
  https://developer.android.com/studio/index.html#downloads
  https://developer.android.com/studio/
  installer_r24.4.1-windows
  --> RUN LICENSE
      Path : Android/sdk/tools/bin
      run cmd :sdkmanager --licenses
  Control Panel\System and Security\System -> ENVIRONMENT VARIABLE
  -System variable 
  Path 
	C:\ProgramData\Oracle\Java\javapath;%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;%SYSTEMROOT%\System32\WindowsPowerShell\v1.0\;%JDK_HOME%\bin;%JRE_HOME%\bin;C:\Program Files\nodejs\;C:\Program Files\apache-ant\bin;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools;
  ANDROID_HOME
	D:\AndroidSDK	
```

E. INSTALL GENYMOTION & Virtual Box
```
	https://www.genymotion.com/download/
```
F. INSTALL Eclipse

G. Install Xampp, develope mengunakan browser.

H. COMPAILE 
```   
   put data htdoct\folder to cordova folder project.
```

J. ERROR BUILD ANDROID SDK
```
   - Manifest target android ver 6.0.0

C:\Program Files (x86)\Common Files\Oracle\Java\javapath;C:\ProgramData\Oracle\Java\javapath;%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;%SYSTEMROOT%\System32\WindowsPowerShell\v1.0\;%JDK_HOME%\bin;%JRE_HOME%\bin;C:\Program Files (x86)\Intel\iCLS Client\;C:\Program Files\Intel\iCLS Client\;%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;%SYSTEMROOT%\System32\WindowsPowerShell\v1.0\;C:\Program Files\Intel\Intel(R) Management Engine Components\DAL;C:\Program Files\Intel\Intel(R) Management Engine Components\IPT;C:\Program Files (x86)\Intel\Intel(R) Management Engine Components\DAL;C:\Program Files (x86)\Intel\Intel(R) Management Engine Components\IPT;D:\xampp\php;C:\Program Files\TortoiseSVN\bin;C:\Program Files\doxygen\bin;C:\Program Files\nodejs\;D:\code\Editor\adt-bundle-windows-x86_64-20130911\adt-bundle-windows-x86_64-20130911\sdk\tools;D:\code\Editor\adt-bundle-windows-x86_64-20130911\adt-bundle-windows-x86_64-20130911\sdk\platform-tools;C:\ProgramData\ComposerSetup\bin;C:\Program Files\MySQL\MySQL Utilities 1.6\;C:\Program Files\nodejs\;C:\Program Files\apache-ant\bin;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools;C:\Program Files\Git\cmd;C:\Program Files\PuTTY\
```