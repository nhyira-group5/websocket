resource "aws_instance" "websocket_ec2_01" {
  ami               = var.ami
  availability_zone = var.az
  instance_type     = var.inst_type
  
  ebs_block_device {
    device_name = "/dev/sda1"
    volume_size = 8
    volume_type = "gp3"
  }

  key_name                    = "shh_key"
  subnet_id                   = var.subnet_id
  associate_public_ip_address = true
  vpc_security_group_ids      = [var.sg_id]

  tags = {
    Name = "websocket_ec2_01"
  }

 user_data = <<-EOF
  #!/bin/bash

  # Atualizar pacotes
  sudo apt-get update

  # Instalar git, Node.js e npm
  sudo apt-get install -y git nodejs npm

  # Clonar o repositório
  git clone https://github.com/nhyira-group5/websocket.git /home/ubuntu/websocket

  # Navegar até o diretório do repositório clonado
  cd /home/ubuntu/websocket

  # Instalar dependências
  npm ci

  # Apagar dist anterior
  sudo rm -rf /var/www/dist

  # Executar build
  npm run build

  # Copiar o diretório 'dist' para a pasta específica
  sudo cp -r dist /var/www

  # Ajustar permissões
  sudo chown -R ubuntu:ubuntu /var/www

  # Reiniciar nginx
  sudo systemctl restart nginx
EOF

}

resource "aws_instance" "websocket_ec2_02" {
  ami               = var.ami
  availability_zone = var.az
  instance_type     = var.inst_type
  
  ebs_block_device {
    device_name = "/dev/sda1"
    volume_size = 8
    volume_type = "gp3"
  }

  key_name                    = "shh_key"
  subnet_id                   = var.subnet_id
  associate_public_ip_address = true
  vpc_security_group_ids      = [var.sg_id]

  tags = {
    Name = "websocket_ec2_02"
  }

  user_data = <<-EOF
  #!/bin/bash

  # Atualizar pacotes
  sudo apt-get update

  # Instalar git, Node.js e npm
  sudo apt-get install -y git nodejs npm

  # Clonar o repositório
  git clone https://github.com/nhyira-group5/websocket.git /home/ubuntu/websocket

  # Navegar até o diretório do repositório clonado
  cd /home/ubuntu/websocket

  # Instalar dependências
  npm ci

  # Apagar dist anterior
  sudo rm -rf /var/www/dist

  # Executar build
  npm run build

  # Copiar o diretório 'dist' para a pasta específica
  sudo cp -r dist /var/www

  # Ajustar permissões
  sudo chown -R ubuntu:ubuntu /var/www

  # Reiniciar nginx
  sudo systemctl restart nginx
EOF

}

resource "aws_eip_association" "eip_assoc_01" {
  instance_id   = aws_instance.websocket_ec2_01.id
  allocation_id = "eipalloc-0b33881f72855426a"
}

resource "aws_eip_association" "eip_assoc_02" {
  instance_id   = aws_instance.websocket_ec2_02.id
  allocation_id = "eipalloc-01952682e36b66c07"
}
