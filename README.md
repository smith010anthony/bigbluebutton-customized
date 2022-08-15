
# Bigbluebutton html5 development and customization
This is a customized version of bigbluebutton-html5 componenet and mainly whiteboard, screenshare are customized to use third option which is a video game, 
so users can connect and play a video game you can check the full steps here https://avinyaweb.com/bigbluebutton/bigbluebutton-ui-customization-and-development-best-way/

# Steps
## install meteor
- `curl https://install.meteor.com/ | sh`
## get wsUrl from settings.yml
- `grep "wsUrl" /usr/share/meteor/bundle/programs/server/assets/app/config/settings.yml`
## put this wsUrl to new settings.yml
- `vi private/config/settings.yml`
## stop main bbb-html5 application
- `sudo systemctl stop bbb-html5`
## install all dependencies
- `meteor npm install`
## try to run this new application
- `npm start`
## run in production mode
- `NODE_ENV=production npm start`

## change .nginx to use development setup
`/etc/bigbluebutton/nginx/bbb-html5.nginx`

and switch to 4100 

And reload nginx `sudo systemctl reload nginx`

# Make build and replace the orignal bbb-html5
- `meteor build --server-only /home/bigbluebutton/dev/bigbluebutton/bigbluebutton-html5/meteorbundle`
- `sudo tar -xzvf /home/bigbluebutton/dev/bigbluebutton/bigbluebutton-html5/meteorbundle/*.tar.gz -C /usr/share/meteor`
- And Run `sudo systemctl start bbb-html5`

Refrences :
Bigbluebutton development and customization
- https://docs.bigbluebutton.org/2.5/dev.html
- https://avinyaweb.com/
