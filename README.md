# helps-cors-proxy
Expressjs CORS proxy for development

## Running the server
1. Install nvm (https://github.com/creationix/nvm) and git (https://git-scm.com/download/linux)
2. Clone this repository into a linux instance
3. Run `npm install` and `npm install -g forever`
4. Run `npm run start http://[IP or Hostname where your HELPS API is deployed]/api`


## NOTE
The server will listen on port 4000. If you want requests to port 80 or 443 to be mapped to the node server, run the following command:
```
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport [Port to remap] -j REDIRECT --to-port 4000
```
