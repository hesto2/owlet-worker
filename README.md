# Owlet worker

Checks every 5 minutes if the owlet sock is unplugged. If the sock is unplugged
and the owner forgot to turn on the base station, it will automatically turn on
the base station.

## Required Environment Variables

- `OWLET_EMAIL`
- `OWLET_PASSWORD`
- `S3_BUCKET_NAME` for caching the auth token (optional, if you do this then you
  will need the appropriate aws env vars as well)
- `NOTIFICATION_URL` for sending notifications based on the result (optional)

# Notes on how to decompile the apk if they change things:

- download `apktool`
  - follow the detailed instructions
- install `java`
- download the apk:
  `https://apps.evozi.com/apk-downloader/?id=com.owletcare.owletcare`
- run `apktool` on the downloaded file to decompile it to smali bytecode
