#!/bin/bash
cd /home/ec2-user/trustpoolapp/trust-pool-app
export GOOGLE_CLIENT_ID=87303288866-1a0i47h32fjal3gb8nat484mvegfs0ge.apps.googleusercontent.com
export GOOGLE_CLIENT_SECRET=5lXvwP99trSb0RBEKQ9pWjpk
export AWSPASSWORD=admin123
sudo chmod 777 .
npm install && npm run build
npm start