# Wavefront Slackbot

**_VMware has ended active development of this project, this repository will no longer be updated._**

Wavefront Slackbot is a Slack integration for Wavefront that allows you
to speak to Wavefront in a Slack channel to get quick answers to common
metrics monitoring questions out of Wavefront


[![Alt text](https://s3-us-west-2.amazonaws.com/wavefront-integration/slackbot-thumbnail.png)](https://s3-us-west-2.amazonaws.com/wavefront-integration/slackbot.mp4)

# How to use it

Wavefront slackbot can be invoked using a number of different text
based commands just like you would do with other voice assistants.

Currently supported commands

```
wfbot list alerts
wfbot list alerts for FILTER CONDITION
wfbot list fatal alerts
wfbot list fatal alerts for FILTER CONDITION
wfbot list warning alerts
wfbot list warning alerts for FILTER CONDITION
wfbot list smoke alerts
wfbot list smoke alerts for FILTER CONDITION
wfbot list info alerts
wfbot list info alerts for FILTER CONDITION
wfbot tell me a joke
```

Where FILTER CONDITION is some string you want to filter by.  Assume you
have three alerts firing in Wavefront

```
Kubernetes CPU Usage High
Disk Space Full
High Network Utilization
```

You could then look for these alerts using a command like this

```
wfbot list alerts for Kubernetes
wfbot list alerts for CPU Usage
wfbot list alerts for CPU
wfbot list alerts for Disk Space
wfbot list alerts Network Utilization
```

There are of course a number of ways to apply the filter condition.  As
long as that string is in the alert text then Wavefront Slackbot will
find it as it looks to see if any alerts contain your condition.

# How to install

## Prerequisites

1. [A Wavefront Account](https://www.wavefront.com/sign-up/?utm_source=SlackbotGithub)
2. [A Wavefront API Token](https://docs.wavefront.com/wavefront_api.html#generating-an-api-token/?utm_source=SlackbotGithub)
3. [Your Wavefront URL](https://docs.wavefront.com/wavefront_api.html#generating-an-api-token/?utm_source=SlackbotGithub)
4. [A Slack OAuth Token](https://api.slack.com/apps)
    * You must create a slackbot for your workspace or this will not work
    * Your app must have the following permissions
        * chat:write:bot
        * channels:history
        * chat:write:user
        * groups:history
        * im:history
        * mpim:history
        * bot


### Standalone

#### Prerequisites
* NodeJS v8.0.0 (though others might work this is what it was tested on)
* NPM v5.0.0 (though others might work this is what it was tested on)

Wavefront Slackbot is a NodeJS application that can be executed standalone.
To do this following

```
git clone https://github.com/wavefrontHQ/wavefront-slackbot.git
cd wavefront-slackbot
npm install
export WAVEFRONT_TOKEN=YOUR_WAVEFRONT_TOKEN
export WAVEFRONT_URL=YOUR_WAVEFRONT_URL
node ./index.js
```

### Docker

Wavefront Slackbot can be deployed to docker

```
docker pull krisclarkdev/wfslackbot:latest
docker run krisclarkdev/wfslackbot \
-e WAVEFRONT_TOKEN='' \
-e WAVEFRONT_URL='' \
-e SLACK_OAUTH=''
```

### Kubernetes

Wavefront Slackbot can be deployed to Kubernetes as well

```
git clone https://github.com/wavefrontHQ/wavefront-slackbot.git
cd wavefront-slackbot/kubernetes/
***IMPORTANT: EDIT wfslackbot.yaml AND CHANGE SLACK_OAUTH, WAVEFRONT_TOKEN, AND WAVEFRONT_URL***
kubectl apply -f ./wfslackbot.yaml
```
