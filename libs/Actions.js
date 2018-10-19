/* Actions.js */

'use strict';

// Core dependency
const talkify = require('talkify');

// Types dependencies
const BotTypes = talkify.BotTypes;
const SingleLineMessage = BotTypes.SingleLineMessage;

// Training dependencies
const TrainingDocument = BotTypes.TrainingDocument;

let wf = require('./Wavefront');

let re = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"/;
let re2 = /<a\s+(?:[^>]*?\s+)?href='([^']*)"/;

const rest = require('./Rest');

Array.prototype.findFirstSubstring = function(s) {
    for(let i = 0; i < this.length;i++)
    {
        if(this[i].indexOf(s) !== -1)
            return i;
    }
    return -1;
};

let urlify = function(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
    })
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
};

let getAlertIDs = function(data) {
    let pa = new Array();

    for(let i=0; i<data.response.items.length; i++) {
        pa.push(wf.getAlertById(data.response.items[i].id));
    }

    return Promise.all(pa).then(function(values) {
        let allIDs = new Array();

        let u = '';

        let reply = new Array();

        for(let i=0; i<values.length; i++) {
            try {
                if(values[i].response.event.hasOwnProperty('annotations')) {
                    reply.push({
                        name: values[i].response.event.name,
                        severity: values[i].response.event.annotations.severity,
                        url: values[i].response.event.annotations.details.match(re)[1],
                        type: values[i].response.event.annotations.type
                    });
                }

                allIDs.push(values[i].response.id);
            }catch(err){

            }
        }

        return reply;
    });

    //return pa;
};

let getAlertsAndReply = function(severity, filter, response, next) {
    wf.getAlerts().then(function(data) {
        let results = new Array();

        for(let i=0; i<data.response.items.length; i++) {

            if(severity != null) {
                if(data.response.items[i].severity == severity) {
                    if(severity == 'WARN') {
                        try {
                            if(data.response.items[i].status.toString().includes('CHECKING')) {
                                let a = '<' + data.response.items[i].event.annotations.details.match(/<a\s+(?:[^>]*?\s+)?href='([^"]*)'/)[1] + '|' + data.response.items[i].name + '> - ' + '(<https://cs.wavefront.com/alerts/' + data.response.items[i].id + '/edit|' + 'Edit' + '>)';
                                results.push(a.replace('try', 'cs'));
                            }
                        }catch(err1){
                            //console.log(data.response.items[i].name);
                        }

                    }else{
                        if(data.response.items[i].status.toString().includes('CHECKING')) {
                            let a = '<' + data.response.items[i].event.annotations.details.match(re)[1] + '|' + data.response.items[i].name + '> - ' + '(<https://cs.wavefront.com/alerts/' + data.response.items[i].id + '/edit|' + 'Edit' + '>)';
                            results.push(a.replace('try', 'cs'));
                        }
                    }
                }
            }else{
                try {
                    console.log(data.response.items[i].status.toString());

                    if(data.response.items[i].status.toString().includes('CHECKING')) {
                        let a = '<' + data.response.items[i].event.annotations.details.match(re)[1] + '|' + data.response.items[i].name + '> - ' + '(<https://cs.wavefront.com/alerts/' + data.response.items[i].id + '/edit|' + 'Edit' + '>)';
                        results.push(a.replace('try', 'cs'));
                    }
                }catch(err1){
                    try {
                        if(data.response.items[i].status.toString().includes('CHECKING')) {
                            let a = '<' + data.response.items[i].event.annotations.details.match(/<a\s+(?:[^>]*?\s+)?href='([^"]*)'/)[1] + '|' + data.response.items[i].name + '> - ' + '(<https://cs.wavefront.com/alerts/' + data.response.items[i].id + '/edit|' + 'Edit' + '>)';
                            results.push(a.replace('try', 'cs'));
                        }
                    }catch(err3){
                        //results.push(data.response.items[i].name + ' - ' + data.response.items[i].status.toString());
                    }
                }
            }
        }

        let displayResults = '';

        if(filter != null) {
            for(let j=0; j<results.length; j++) {
                if(results[j].toUpperCase().includes(filter.toUpperCase())) {
                    displayResults += results[j] + '\n';
                }
            }
        }else{
            for(let j=0; j<results.length; j++) {
                displayResults += results[j] + '\n';
            }
        }

        if(displayResults.length > 0) {
            response.message = new SingleLineMessage(displayResults);
        }else{
            response.message = new SingleLineMessage('No alerts matched your search criteria');
        }

        next();
    });
};



exports.actions = {
    howAction: function(context, request, response, next) {
        //response.message = new SingleLineMessage('You asked: \"' + request.message.content + '\". I\'m doing well. Thanks for asking.');
        //next();
    },
    helpAction: function(context, request, response, next) {
        response.message = new SingleLineMessage('Implement help here');
        next();
    },
    alertsAction: function(context, request, response, next) {
        console.log('&&&');
        getAlertsAndReply(null, null, response, next);
    },
    friendsAction: function(context, request, response, next) {
        response.message = new SingleLineMessage('My best friends are Connor Jay and Molly Anne');
        next();
    },
    openDoorsAction: function(context, request, response, next) {
        response.message = new SingleLineMessage('https://www.youtube.com/watch?v=7qnd-hdmgfk');
        next();
    },
    listAllIntegrationsAction: function(context, request, response, next) {
        wf.getAllIntegrations().then(function(data) {
            //response.message = new SingleLineMessage('There are ' + data.response.items.length+1 + ' alerts right now.  Not all of them may be firing though.  To check only for alerts that are firing use **TODO**');
            let t = data.response.items;

            let integrations = '';

            try {
                for(let i=0; i<t.length; i++) {
                    integrations += t[i].name + ' - ' + t[i].description + '\n';
                    //response.message = new SingleLineMessage(t[i].name + ' - ' + t[i].description);
                }
            }catch(e){
                console.log(e);
            }

            //console.log(integrations);

            response.message = new SingleLineMessage(integrations);
            next();
        });
    },
    listInstalledIntegrationsAction: function(context, request, response, next) {
        wf.getAllIntegrations().then(function(data) {
            //response.message = new SingleLineMessage('There are ' + data.response.items.length+1 + ' alerts right now.  Not all of them may be firing though.  To check only for alerts that are firing use **TODO**');
            let t = data.response.items;

            let integrations = '';

            try {
                for(let i=0; i<t.length; i++) {
                    if(t[i].status.installStatus == 'INSTALLED') {
                        integrations += t[i].name + ' - ' + t[i].description + '\n';
                    }
                }
            }catch(e){
                console.log(e);
            }

            response.message = new SingleLineMessage(integrations);
            next();
        });
    },
    listAllDashboardsAction: function(context, request, response, next) {
        wf.getAllDashboards().then(function(data) {
            let t = data.response.items;

            let dashboards = '';

            try {
                for(let i=0; i<t.length; i++) {
                    if(t[i].hidden == false) {
                        if(t[i].description != '') {
                            dashboards += t[i].name + ' - ' + t[i].description + '\n';
                        }else{
                            dashboards += t[i].name + '\n';
                        }
                    }
                }
            }catch(e){
                console.log(e);
            }

            response.message = new SingleLineMessage(dashboards);
            next();
        });
    },
    listAlerts: function(context, request, response, next) {
        let content = '';
        content += request.message.content;

        if(content.includes('info')) {
            if(content.includes('for')) {
                let Z = request.message.content.slice(request.message.content.indexOf('for') + 'for'.length+1);
                getAlertsAndReply('INFO', Z, response, next);
            }else{
                getAlertsAndReply('INFO', null, response, next);
            }
        }else if(content.includes('smoke')) {
            if (content.includes('for')) {
                let Z = request.message.content.slice(request.message.content.indexOf('for') + 'for'.length+1);
                getAlertsAndReply('SMOKE', Z, response, next);
            } else {
                getAlertsAndReply('SMOKE', null, response, next);
            }
        }else if(content.includes('warning')) {
            if (content.includes('for')) {
                let Z = request.message.content.slice(request.message.content.indexOf('for') + 'for'.length+1);
                getAlertsAndReply('WARN', Z, response, next);
            } else {
                getAlertsAndReply('WARN', null, response, next);
            }
        }else if(content.includes('severe')) {
            if(content.includes('for')) {
                let Z = request.message.content.slice(request.message.content.indexOf('for') + 'for'.length+1);
                getAlertsAndReply('SEVERE', Z, response, next);
            }else{
                getAlertsAndReply('SEVERE', null, response, next);
            }
        }

        if(content.includes('all') && !content.includes('for')) {
            let Z = request.message.content.slice(request.message.content.indexOf('for') + 'for'.length+1);
            getAlertsAndReply(null, null, response, next);
        }else if(content.includes('all') && content.includes('for')) {
            let Z = request.message.content.slice(request.message.content.indexOf('for') + 'for'.length+1);
            getAlertsAndReply(null, Z, response, next);
        }
    },
    snoozeAlert: function(context, request, response, next) {
        console.log('^^^');
        let splitted = request.sentence.current.split(/\s+/);

        response.message = new SingleLineMessage('Snoozing alert ' + splitted[splitted.length-1]);

        next();
    },
    jokeAction: function(context, request, response, next) {
        let rrr = {
            "text": "Choose a game to play",
            "fallback": "You are unable to choose a game",
            "callback_id": "wopr_game",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "game",
                    "text": "Chess",
                    "type": "button",
                    "value": "chess"
                },
                {
                    "name": "game",
                    "text": "Falken's Maze",
                    "type": "button",
                    "value": "maze"
                },
                {
                    "name": "game",
                    "text": "Thermonuclear War",
                    "style": "danger",
                    "type": "button",
                    "value": "war",
                    "confirm": {
                        "title": "Are you sure?",
                        "text": "Wouldn't you prefer a good game of chess?",
                        "ok_text": "Yes",
                        "dismiss_text": "No"
                    }
                }
            ]
        };
        rest.doPost('https://icanhazdadjoke.com/slack').then(function(data) {
            try {
                let r = new SingleLineMessage(data.attachments[0].text + ' - ' + data.attachments[0].footer);

                let footer = data.attachments[0].footer;
                footer = footer.replace('permalink', 'icanhazdadjoke.com');
                footer = footer.slice(0, -50);

                let rr = new SingleLineMessage(data.attachments[0].text + ' - ' + footer);
                //rr['attachments'] = [rrr];
                //response['attachments']
                response.message = rr;//new SingleLineMessage(data.attachments[0].text + ' - ' + data.attachments[0].footer);
                next();
            }catch(e){
                response.message = new SingleLineMessage('There was an error processing your request.  Please try again');
                next();
            }
        });
    },
};