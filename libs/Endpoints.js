/* Endpoints.js */

'use strict';

let instance = process.env.WAVEFRONT_URL;

let endpoints = {
    alerts:       '/api/v2/alert',
    integrations: '/api/v2/integration',
    dashboards:   '/api/v2/dashboard',
    snooze:       '/api/v2/alert/{id}/snooze'
};

module.exports.getEndpointURL = {
    alerts: function() {
        return instance + endpoints.alerts;
    },
    integrations: function() {
        return instance + endpoints.integrations;
    },
    dashboards: function() {
        return instance + endpoints.dashboards;
    },
    snooze: function(id) {
        return instance + endpoints.snooze.replace('{id}', id);
    }
};