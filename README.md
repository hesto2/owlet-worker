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
