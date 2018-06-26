#!/bin/bash
cd /home/ec2-user/trustpoolapp
sudo chmod 777 .
npm -v && node -v
npm install && npm run build