#!/bin/bash
cd /home/ec2-user
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh
. ~/.nvm/nvm.sh
npm install -g npm@latest
nvm install --lts
nvm use 8

cd /trustpoolapp/trust-pool-app
sudo chmod 777 .
sudo npm install && npm run build