variable "az" {  
  description = "Availability Zone"  
  type        = string  
  default     = "us-east-1a"  
}

variable "key_pair_name" {
  description = "Key Pair Name"
  type        = string
  default     = "ti_key"  
}

variable "ami" {
  description = "AMI ID"
  type        = string
  default     = "ami-048c8cb78e740889"  
}

variable "inst_type" {
  description = "Instance Type"
  type        = string
  default     = "t2.micro"  
}

variable "subnet_id" {
  description = "Subnet ID"
  type        = string
  default     = "subnet-0a2e3d5e57607184c" 
}

variable "sg_id" {
  description = "Security Group ID"
  type        = string
  default     = "sg-08a6c790338e94c72" 
}
