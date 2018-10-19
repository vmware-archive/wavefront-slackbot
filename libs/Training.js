/* Training.js */

'use strict';

// Core dependency
const talkify          = require('talkify');
const Bot              = talkify.Bot;
const BotTypes         = talkify.BotTypes;
const TrainingDocument = BotTypes.TrainingDocument;
const fs               = require('fs');

let config = require('./Config');

module.exports.training = config.training();