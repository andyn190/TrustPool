#!/bin/bash
cd /home/ec2-user/trustpoolapp/trust-pool-app
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh
. ~/.nvm/nvm.sh
sudo npm install -g npm@latest
nvm install --lts
nvm use 8

sudo chmod 777 .
sudo npm install && npm run build
