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
  default     = "ami-0167aed34e622a91c"  # O ID da AMI 
}

variable "inst_type" {
  description = "Instance Type"
  type        = string
  default     = "t2.micro"  
}

variable "subnet_id" {
  description = "Subnet ID"
  type        = string
  default     = "subnet-056440a960646b252" 
}

variable "sg_id" {
  description = "Security Group ID"
  type        = string
  default     = "sg-002628b8078cbb0b0"
}
