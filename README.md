# wf-slackbot

wf-slackbot is a bot that integrates slack with Wavefront using natural language processing to talk to the bot in a more conversational way than the command line.

# Installation

```
git clone git@gitlab.eng.vmware.com:clarkk/wf-slackbot.git
cd wf-slackbot
npm install
```

# Running

```
node index.js
```

# Commands

The Wavefront Slackbot can be used to query a number of different data points out of the system.  The following are valid commands that can be issued

* wfbot list all alerts
* wfbot list all smoke alerts
* wfbot list all warning alerts
* wfbot list all severe alerts
* wfbot list all alerts for XYZ (Where XYZ is a string in the alert, e.g. Kubernetes)
* wfbot list all smoke alerts for XYZ (Where XYZ is a string in the alert, e.g. Kubernetes)
* wfbot list all warning alerts for XYZ (Where XYZ is a string in the alert, e.g. Kubernetes)
* wfbot list all severe alerts for XYZ (Where XYZ is a string in the alert, e.g. Kubernetes)
* wfbot tell me a joke

# Adding a skill to the code

To add a new skill to the bot you need to add it to training.json.
 
As an example if you wanted to add a new skill named 'birthday_skill' you would append training.json with

libs/Training.js

```json
  "birthday_skill": {
    "topic": "happy_birthday",
    "action": "birthdayAction",
    "training": {
      "happy_birthday": [
        "happy birthday",
        "happy bday",
        "have a great birthday",
        "have a great bday"
      ]
    }
  }
```

1. birthday_skill is the name of your skill
2. birthday_skill.birthdayAction is your method in Actions.js
3. training.happybirthday is an array of training documents for the chat bot so it knows what skill to use based on the user text
4. Don't forget to add happyBirthday() to Actions.js like the following

```javascript
exports.actions = {
    happybirthdayAction: function() {
        // Do things and stuff here
    }
}
```

# Wavefront API Calls

* libs/Actions.js   - The work that's executed when a skill is triggered
* libs/Chatbot.js   - This sets up the Slack real time messaging API and handles listening for defined skills
* libs/Config.js    - This is a helper that allows for everything except the Actions to be defined via resources/training.json
* libs/Endpoints.js - Where the HTTP Endpoints are defined
* libs/NLP.js       - The base config for the NLP engine
* libs/Rest.js      - Where the actual HTTP Request is made
* libs/Skills.js    - This will create an array of skills for the chatbot
* libs/Training.js  - This will create an array of training documents for NLP
* libs/Wavefront.js - Where all Wavefront API calls come from

### Wavefront API Token
The Wavefront API Token is defined as wavefront_key inside of libs/Rest.js but will later be removed in favor of a multi-user implementation.
