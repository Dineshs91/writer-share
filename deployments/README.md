## Deployment
The app is run by PM2. 

```
pm2 init
sudo vi ecosystem.config.js
```

The content of the file `ecosystem.config.js` is in `deployments/pm2/ecosystem.config.js`

Start the server

```
pm2 start writer-share
```

### Deploy updates

- ssh into the server
- cd into `writer-share`
- Pull latest code from Github `git pull --rebase origin main`
- Build the code `yarn build`
- Restart PM2. `pm2 restart writer-share`

### Install Nginx

`sudo apt install nginx`

Add the custom nginx conf `deployments/nginx/share.conf` to `etc/nginx/conf.d/`.

Restart nginx

`sudo service restart nginx`

## References
https://mxd.codes/articles/hosting-next-js-private-server-pm2-github-webhooks-ci-cd
