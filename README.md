# helps-cors-proxy
Expressjs CORS proxy for development

## Running the server
1. Install nvm (https://github.com/creationix/nvm) and git (https://git-scm.com/download/linux)
2. Clone this repository into a linux instance
3. Run `npm install` and `npm install -g forever`
4. Run `npm run start http://[IP or Hostname where your HELPS API is deployed]/api`

## SMTP Mail NOTE from Jason
You must have config file ready in order to use SMTP mail feature.
1. You must acquire SMTP details from your SMTP provider such as Gmail or Mandrill

2. Create smtp.js file under config/smtp.json

3. Insert following configuration detail into the smtp.json file

```
module.exports = {
    server: 'smtp.gmail.com',
    port: %PORT_NUMBER:Int%,
    credentials: {
        user: %USER_NAME:String%,
        pass: %PASSWORD:String%
    }
};
```

## NOTE
The server will listen on port 4000. If you want requests to port 80 or 443 to be mapped to the node server, run the following command:
```
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport [Port to remap] -j REDIRECT --to-port 4000
```
