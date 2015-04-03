var CronJob = require("cron").CronJob;
var warning = require("./warning");

var test_job = new CronJob({

    cronTime: "1 * * * * *",
    onTick: function() {

        console.log("hello world");
    },
    start: false,
    timeZone: 'America/Los_Angeles'
});

var warning_job = new CronJob({

    cronTime: "1 * * * * *",
    onTick: function() {

        warning.ping_server();
    },
    start: false,
    timeZone: 'America/Los_Angeles'
});

// main
test_job.start();
warning_job.start();

module.exports = warning_job;
