/* Skills.js */

'use strict';

// Core dependency
const talkify  = require('talkify');
const BotTypes = talkify.BotTypes;
const Skill    = BotTypes.Skill;
const fs       = require('fs');

let actionDefs = require('./Actions');
let config     = require('./Config');

exports.skills = config.skills();