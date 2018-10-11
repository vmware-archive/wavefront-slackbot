/* NLP.js */

'use strict';

// Core dependency
const talkify = require('talkify');
const Bot = talkify.Bot;

// Types dependencies
const BotTypes = talkify.BotTypes;
const Message = BotTypes.Message;
const SingleLineMessage = BotTypes.SingleLineMessage;
const MultiLineMessage = BotTypes.MultiLineMessage;

// Skills dependencies
const Skill = BotTypes.Skill;

// Training dependencies
const TrainingDocument = BotTypes.TrainingDocument;

const bot = new Bot();
let training = require('./Training');

bot.trainAll(training.training, function() {});

let actions = require('./Actions');
let skills = require('./Skills');

for(let i=0; i<skills.skills.length;i++) {
    bot.addSkill(skills.skills[i]);
}

let resolved = function(err, messages) {
    if(err) return console.error(err);

    return console.log(messages);
};


exports.userText = function(text) {
    return new Promise(function(resolve, reject) {
        bot.resolve(123, text, function(err, message) {
            if(err){
                reject(err);
            }else{
                resolve(message);
            }
        });
    });
};