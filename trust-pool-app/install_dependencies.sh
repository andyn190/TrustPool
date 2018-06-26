#!/bin/bash
sudo chmod 777 .
yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_6.x | sudo -E bash -
yum install nodejs
npm -v && node -v
npm install && npm run build