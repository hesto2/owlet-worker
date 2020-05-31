module "sns_subscription" {
  source = "./node_modules/hesto2-terraform-modules/lambda_sns_subscription"
  lambda_function_name="${module.timed_lambda.function_name}"
  lambda_arn="${module.timed_lambda.arn}"
  topic_arn="${data.terraform_remote_state.notification_service.outputs.app_interaction_sns_topic_arn}"
  receiver_id="owlet-worker"
}