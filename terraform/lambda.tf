module "timed_lambda" {
  source   = "./node_modules/hesto2-terraform-modules/timed_lambda"
  app_name = "owlet-worker"
  schedule_expression = "rate(10 minutes)"
  is_enabled = false
  lambda_environment_variables = {
    NODE_ENV = "production"
    OWLET_EMAIL= "${data.aws_secretsmanager_secret_version.owlet_email.secret_string}"
    OWLET_PASSWORD= "${data.aws_secretsmanager_secret_version.owlet_password.secret_string}"
    NOTIFICATION_URL = "${data.aws_secretsmanager_secret_version.notification_url.secret_string}/api/slack"
    S3_BUCKET_NAME = "${aws_s3_bucket.owlet_cache.id}"
    TARGET_SLACK_CHANNEL= "owlet"
  }
}
