#!/bin/bash
cd /home/ec2-user
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh
source ~/.bashrc
~/.nvm/nvm.sh
nvm install 8
cd /home/ec2-user/trustpoolapp/trust-pool-app

sudo chmod 777 .
npm install && npm run build
