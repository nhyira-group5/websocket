resource "aws_instance" "websocket_ec2_01" {
  ami               = var.ami
  availability_zone = var.az
  instance_type     = var.inst_type
  
  ebs_block_device {
    device_name = "/dev/sda1"
    volume_size = 8
    volume_type = "gp3"
  }

  key_name                    = "ti_key"  
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

    # Instalar git, Node.js e npm, se necessário
    which git || sudo apt-get install -y git
    which node || sudo apt-get install -y nodejs npm

    # Criar a pasta se não existir
    mkdir -p /home/ubuntu/websocket

    # Clonar ou atualizar o repositório
    if [ ! -d "/home/ubuntu/websocket/.git" ]; then
      sudo git clone https://github.com/nhyira-group5/websocket.git /home/ubuntu/websocket
    else
      cd /home/ubuntu/websocket
      sudo git pull origin main  # Atualiza o repositório
    fi

    # Instalar o MySQL
    sudo apt update
    sudo apt install -y mysql-server

    cd /home/ubuntu/websocket
    # Instalar dependências
    sudo npm ci

    # (Opcional) Instalar o pm2 para gerenciar o processo Node.js
    sudo npm install -g pm2

    # Iniciar a aplicação Node.js
    pm2 start app.js --name websocket --watch

    # Registrar logs
    echo "Script de inicialização concluído" | tee -a /var/log/user_data.log
  EOF
}


resource "aws_eip_association" "eip_assoc_01" {
  instance_id   = aws_instance.websocket_ec2_01.id
  allocation_id = "eipalloc-01c12d8f8fd81ef4f"  
}

