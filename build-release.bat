sencha app build native --release
cd ./cordova/platforms/android/cordova/
./build.bat --release
cd ../../../../
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./../../_CERTIFICATES/wregen-release-key.keystore -keypass wregen ./cordova/platforms/android/bin/POZdroid-release-unsigned.apk wregen
zipalign -f -v 4 ./cordova/platforms/android/bin/POZdroid-release-unsigned.apk ./cordova/platforms/android/bin/POZdroid.apk
adb install ./cordova/platforms/android/bin/POZdroid.apk