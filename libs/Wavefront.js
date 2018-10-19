/* Wavefront.js */

'use strict';

let rest      = require('./Rest');
let endpoints = require('./Endpoints');

exports.getAlertsCount = function() {
    return rest.doPost(endpoints.getEndpointURL.alerts());
};

exports.getAlerts = function() {
    return rest.doPost(endpoints.getEndpointURL.alerts());
};

exports.getAlertById = function(id) {
    //console.log(endpoints.getEndpointURL.alerts() + '/' + id);
    return rest.doPost(endpoints.getEndpointURL.alerts() + '/' + id);
};

exports.getAllIntegrations = function() {
    return rest.doPost(endpoints.getEndpointURL.integrations());
};

exports.getAllDashboards = function() {
    return rest.doPost(endpoints.getEndpointURL.dashboards());
};

exports.snoozeAlert = function(id) {
    return rest.doPost(endpoints.getEndpointURL.snooze(id));
};