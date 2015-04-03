var request = require("request");
var logger = require("./logger");
var mail_server = require("./mail_server");
var warning = (function(){

    var that = this;
    var server_ip = "118.192.65.79";
    var test_ip = "neutronest.org"; // error ip
    var port = "3000";

    that.ping_server = function() {

        var url = "http://" + test_ip + ":" + port + "/index";
        logger.info(url);
        request(url, function(error, response, body){

            logger.info(error);

            if(!error && response.statusCode == 200) {

                logger.info(["The server is safe now", Date.now()]);
            }
            if (error) {
                // TODO
                logger.info("Crash somehow...");
                mail_server.send_mail();
                logger.info(["The server has crashed!! Send mail to the Manager...."]);
            }
        });
    };

    return {

        ping_server: ping_server
    };
})();


module.exports = warning;
