# Submiting

Update your app.json previously to set the nw version number

Then, you have to create a build.

```
eas build
```

Select all (or the platform you need)

Then, submit the builds by using:

```
eas submit
```

Note: In case you want to generate an apk, use this command instead (the default config will generate an aab):
```
expo build:android -t apk
```