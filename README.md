# Google Cloud Functions - Mood Service

## Summary
The mood service will analyze the text of slack messages, analyze the mood of the message and responding
back with an appropriate message.

## Create The Project
Go to https://console.cloud.google.com/cloud-resource-manager and create a project with the name of your preference. We chose the name _mood_.

## Create The Cloud Storage Bucket
```Bash
gsutil mb -p [PROJECT_NAME] gs://[BUCKET_NAME]
```

## Deploy The Function
```Bash
gcloud beta functions deploy [PROJECT_NAME] --stage-bucket gs://[BUCKET_NAME] --trigger-http
```



