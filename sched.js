var CronJob = require("cron").CronJob;

var warning = require("./warning");
var mysql_conn = require("./mysql_conn");
var conn = mysql_conn.createConnection();
var sched_config = require("./sched_config");
var logger = require("./logger");
var async = require("async");

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

var update_validnum_job = new CronJob({

    cronTime: "* * 1 * * *",
    onTick: function() {
        mysql_conn.getAllUsers(function(status, msg){
            if(status != 0) return msg;
            var rows = msg;
            logger.info(["users: ", rows ]);
            var keywordList = sched_config.keywordList;
            async.eachSeries(rows, function(row, next_out){
                var username = row['username'];
                var validnum = 0;
                async.eachSeries(keywordList, function(keyword, next_in){

                    mysql_conn.getCountofValidByUser(keyword, username, function(status, msg){

                        if(status != 0) return;
                        validnum = validnum + msg['amount'];
                        logger.info(["user:", username, "valid+", msg['amount']]);
                        next_in();
                    });
                }, function(err){
                    if(err) {
                        logger.info("update_validnum: error");
                    } else {
                        logger.info(["user: valid", username, validnum]);
                        mysql_conn.updateUserValidnum(username, validnum, function(status, msg){
                            // update
                            next_out();
                        });
                    } // end else
                }); // end inner async
            },function(err){

                if(err) logger.info("update_validnum: error");
                else {
                    //
                    logger.info("UPDATE COMPELTE!!");
                    logger.info("===============================");
                }
            });
        }); // end getAullUsers
    },
    start: false,
    timeZone: 'America/Los_Angeles'
});


// main
test_job.start();
warning_job.start();
update_validnum_job.start();

module.exports = warning_job;
