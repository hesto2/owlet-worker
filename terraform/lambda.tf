module "timed_lambda" {
  source = "./node_modules/hesto2-terraform-modules/timed_lambda"
  app_name = "owlet-worker"
  lambda_environment_variables = {
    NODE_ENV = "production"
  }
  schedule_expression = "rate(5 minutes)"
}