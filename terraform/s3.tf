resource "aws_s3_bucket" "owlet_cache" {
  bucket = "owlet-cache"
}

resource "aws_iam_role_policy_attachment" "attachment" {
  role = "${module.timed_lambda.role_name}"
  policy_arn = "${aws_iam_policy.s3_policy.arn}"
}
resource "aws_iam_policy" "s3_policy" {
  name        = "optimal_blue_cacher_logging"
  path        = "/"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
        "Effect": "Allow",
        "Action": [
            "s3:*"
        ],
        "Resource": "arn:aws:s3:::*"
    }
  ]
}
EOF
}