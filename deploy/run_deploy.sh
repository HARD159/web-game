SERVER_IP=
SERVER_USER=

echo "Deploy code to $SERVER_IP"
SERVER_IP=$SERVER_IP SERVER_USER=$SERVER_USER node deploy.js
read -p "Press enter to continue..."