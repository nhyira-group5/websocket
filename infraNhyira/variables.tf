variable "az" {
  description = "Availability Zone"
  type        = string
  default     = "us-east-1b"
}

variable "key_pair_name" {
  description = "Key Pair Name"
  type        = string
  default     = "tf_key"  # Altere conforme necessário
}

variable "ami" {
  description = "AMI ID"
  type        = string
  default     = "ami-08c6a39626fa63ad7"  # Verifique se esta AMI é adequada para seu uso
}

variable "inst_type" {
  description = "Instance Type"
  type        = string
  default     = "t2.micro"  # Ajuste conforme sua necessidade
}

variable "subnet_id" {
  description = "Subnet ID"
  type        = string
  default     = "subnet-03538fa6c1081c33b"  # Atualize com o ID da sub-rede correta
}

variable "sg_id" {
  description = "Security Group ID"
  type        = string
  default     = "sg-041d7ba94beddfa4e"  # Atualize com o ID do grupo de segurança correto
}
