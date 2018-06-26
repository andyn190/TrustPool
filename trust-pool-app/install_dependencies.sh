#!/bin/bash
source /home/ec2-user/.bash_profile
sudo chmod 777 .
npm -v && node -v
npm install && npm run build