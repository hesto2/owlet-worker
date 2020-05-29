data "aws_secretsmanager_secret_version" "notification_url" {
  secret_id = "NOTIFICATION_SERVICE_URL"
}
data "aws_secretsmanager_secret_version" "owlet_email" {
  secret_id = "OWLET_EMAIL"
}
data "aws_secretsmanager_secret_version" "owlet_password" {
  secret_id = "OWLET_PASSWORD"
}