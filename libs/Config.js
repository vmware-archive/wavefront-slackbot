/* Config.js */

'use strict';

// Core dependency
const talkify = require('talkify');
const BotTypes = talkify.BotTypes;
const Skill = BotTypes.Skill;
const fs = require('fs');
const TrainingDocument = BotTypes.TrainingDocument;

let actionDefs = require('./Actions');

let trainingDoc = JSON.parse(fs.readFileSync('resources/training.json', 'utf8'));

let getSkills = function() {
    let skillsArray = new Array();

    for(let x in trainingDoc) {
        skillsArray.push(new Skill(x, trainingDoc[x].topic, actionDefs.actions[trainingDoc[x].action]));
    }

    return skillsArray;
};

let getTraining = function() {

    let allTrainingDocs = new Array();

    for(let skill in trainingDoc) {
        for(let trainingWord in trainingDoc[skill].training) {
            trainingDoc[skill].training[trainingWord].forEach(function(x) {
                allTrainingDocs.push(new TrainingDocument(trainingWord, x));
            });
        }
    }

    return allTrainingDocs;
};

exports.skills = getSkills;
exports.training = getTraining;