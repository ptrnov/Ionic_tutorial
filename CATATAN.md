# Ionic_tutorial
```
#ionic info
jika backend Pro, suport dari ionic resource.
jika backend legacy, local resource.
#ionic config set -g backend legacy

==SDK ==
https://androidsdkoffline.blogspot.com/p/android-sdk-tools.html

#cordova prepare android
#cordova platform ls
# cordova requirements
#ionic cordova run android --list

=JDK=
#emulator -avd "avd_name"


=== PLATFORM ==
$ ionic cordova platform 
$ ionic cordova platform add ios
$ ionic cordova platform add android@6.4.0
$ ionic cordova platform rm ios
$ ionic cordova platform rm android
$ionic cordova platforms add browser
$ionic cordova platforms rm  browser


note: check manifeist ver android <26
ionic cordova platform add android
or version
ionic cordova platform add android@6.0.0
ionic cordova platform add android@6.4.0
ionic cordova platform add android@6.3.0
Issue ver 6.0.0
 2. sqlite issue.
Issue ver 7.0.0
 1. keyboard issue.

=== SQLITE KEYBOARD ISSUE ==
ionic cordova plugin remove cordova-sqlite-plugin
ionic cordova plugin add cordova-sqlite-plugin@2.2.0
to
ionic cordova plugin remove cordova-sqlite-storage
ionic cordova plugin add cordova-sqlite-storage@2.2.0
And
cordova plugin rm cordova-plugin-ionic-keyboard --save
cordova plugin add cordova-plugin-ionic-keyboard --save
OR
cordova plugin add ionic-plugin-keyboard

cordova plugin add cordova-plugin-ionic-keyboard
Codding: SQLIte On Browser
https://www.techiediaries.com/mocking-native-sqlite-plugin/
https://www.techiediaries.com/mocking-native-sqlite-plugin/
https://github.com/kripken/sql.js
Coding : Sqlite websql browser
https://www.thepolyglotdeveloper.com/2015/02/using-websql-instead-local-storage-web-app/
https://www.thepolyglotdeveloper.com/2014/11/use-sqlite-instead-local-storage-ionic-framework/
https://stackoverflow.com/questions/50693802/websql-ios-ionic-3-data-fetch-issue

==Tambahkan platform windows==
== Untuk sqlite d browser
#ionic cordova platform add windows
https://github.com/Microsoft/cordova-plugin-websql

=== Release / Build APK ===
1-install jdk
2-add java/jdk…/bin to path
3-add sdk/tools/bin to path
4-run command line and write sdkmanager --licenses
5-Download the rest of the packages by following the instructions
6-You should get the following message:
All SDK package licenses accepted.======] 100% Computing updates

=== ANDROID CODE ==
ionic g provider rest
ionic g page welcome
ionic g page adduser


=== Form Builder ==
http://masteringionic.com/blog/2017-01-26-form-validation-with-angulars-formbuilder-class/
== refresh main_menu ==
https://forum.ionicframework.com/t/refresh-page-after-modal-is-closed/64586/2


=== page load =
https://github.com/ionic-team/ionic/issues/8449

==start ionic ===
ionic start myBlank blank

==icon Spinner ==
https://loading.io/spinners/gears/index.dual-gear-loading-icon.gif

== filter ==
https://stackoverflow.com/questions/48556826/ionic-3-search-bar-using-ionic-3-php-and-sql-server

==SQLite Error code ==
https://www.sqlite.org/c3ref/c_abort.html
https://www.sqlite.org/c3ref/c_abort_rollback.html
https://medium.com/@agarwalkartik/how-to-use-the-power-of-sqlite-db-in-your-ionic-apps-325d4915da3a

==validation form ==
https://stackoverflow.com/questions/49863165/ionic-3-form-validation-confirm-password
https://toddmotto.com/reactive-formgroup-validation-angular-2
	


122432205648@wifi.id
12345678910

=== promise -observables ===
http://coenraets.org/blog/2016/02/angular2-ionic2-data-services-promises-observables/
https://medium.com/@balramchavan/using-async-await-feature-in-angular-587dd56fdc77
==object object ==
https://alligator.io/js/dealing-with-objects/

== ADD ICON FONT AWESOME ==
reff: https://charlouze.github.io/ionic/2017/05/31/Ionic-3-and-Font-Awesome.html
npm install font-awesome --save --save-exact

```
