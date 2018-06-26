#!/bin/bash
sudo chmod 777 .
sudo yum install gcc-c++ make
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
sudo yum -y install nodejs
npm -v && node -v
npm install && npm run build