#!/bin/bash
cd /home/ec2-user
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh
. ~/.nvm/nvm.sh
nvm install --lts

cd /trustpoolapp/trust-pool-app
sudo chmod 777 .
npm install && npm run build