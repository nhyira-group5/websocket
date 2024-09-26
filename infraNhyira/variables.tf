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
  default     = "ami-0ca4ccec8a47bfad6"  # Verifique se esta AMI é adequada para seu uso
}

variable "inst_type" {
  description = "Instance Type"
  type        = string
  default     = "t2.micro"  # Ajuste conforme sua necessidade
}

variable "subnet_id" {
  description = "Subnet ID"
  type        = string
  default     = "subnet-064d97d9e621c39db"  # Atualize com o ID da sub-rede correta
}

variable "sg_id" {
  description = "Security Group ID"
  type        = string
  default     = "sg-0a69c3d9f7fc1fed6"  # Atualize com o ID do grupo de segurança correto
}
