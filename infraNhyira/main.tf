resource "aws_instance" "websocket_ec2_01" {
  ami               = var.ami
  availability_zone = var.az
  instance_type     = var.inst_type

  ebs_block_device {
    device_name = "/dev/sda1"
    volume_size = 8
    volume_type = "gp3"
  }

  key_name                    = var.key_pair_name
  subnet_id                   = var.subnet_id
  associate_public_ip_address = true
  vpc_security_group_ids      = [var.sg_id]

  tags = {
    Name = "websocket_ec2_01"
  }

  user_data = <<-EOF
    #!/bin/bash

    # Atualizar pacotes
    sudo apt-get update -y
    sudo apt-get upgrade -y

    # Instalar Node.js e npm
    sudo apt-get install -y curl
    curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    sudo apt-get install -y nodejs

    # Instalar Nginx
    sudo apt install nginx -y

    # Clonar o repositório
    git clone https://github.com/nhyira-group5/websocket.git /home/ubuntu/websocket

    # Navegar até o diretório do repositório clonado
    cd /home/ubuntu/websocket

    # Instalar dependências
    npm install --force

    # Ajustar permissões
    sudo chown -R ubuntu:ubuntu /home/ubuntu/websocket

    # Instalar PM2 para gerenciamento do processo Node.js
    sudo npm install -g pm2

    # Iniciar a aplicação com PM2
    pm2 start /home/ubuntu/websocket/server.js --name websocket-app

    # Configurar o PM2 para iniciar na inicialização do sistema
    pm2 startup
    pm2 save

    # Iniciar o Nginx
    sudo systemctl start nginx
    sudo systemctl enable nginx
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

  key_name                    = var.key_pair_name
  subnet_id                   = var.subnet_id
  associate_public_ip_address = true
  vpc_security_group_ids      = [var.sg_id]

  tags = {
    Name = "websocket_ec2_02"
  }

  user_data = <<-EOF
    #!/bin/bash

    # Atualizar pacotes
    sudo apt-get update -y
    sudo apt-get upgrade -y

    # Instalar Node.js e npm
    sudo apt-get install -y curl
    curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    sudo apt-get install -y nodejs

    # Instalar Nginx
    sudo apt install nginx -y

    # Clonar o repositório
    git clone https://github.com/nhyira-group5/websocket.git /home/ubuntu/websocket

    # Navegar até o diretório do repositório clonado
    cd /home/ubuntu/websocket

    # Instalar dependências
    npm install --force

    # Ajustar permissões
    sudo chown -R ubuntu:ubuntu /home/ubuntu/websocket

    # Instalar PM2 para gerenciamento do processo Node.js
    sudo npm install -g pm2

    # Iniciar a aplicação com PM2
    pm2 start /home/ubuntu/websocket/server.js --name websocket-app

    # Configurar o PM2 para iniciar na inicialização do sistema
    pm2 startup
    pm2 save

    # Iniciar o Nginx
    sudo systemctl start nginx
    sudo systemctl enable nginx
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
