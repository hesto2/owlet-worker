terraform {
  backend "s3" {
    bucket         = "hesto2-terraform-state"
    key            = "owlet-worker"
    region         = "us-west-2"
    dynamodb_table = "terraform-lock"
  }
}

provider "aws" {
  region = "us-west-2"
}

data "terraform_remote_state" "notification_service" {
  backend = "s3" 
  config = {
    bucket = "hesto2-terraform-state"
    key = "notification_service"
    region="us-west-2"
    dynamodb_table = "terraform-lock"
  }
}