var node_mailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var logger = require("./logger");
var sched_config = require("./sched_config");
var mail_server = (function(){

    var that = this;
    that.smtp_transport = node_mailer.createTransport(smtpTransport({
        host: "smtp.qq.com",
        secure: true,
        port: 465,
        auth: {
            user: sched_config.mail_user,
            pass: sched_config.mail_passowrd
        },
        debug: true

    }));
    that.send_mail = function () {

        logger.info("Sending mail now...");
        /*
        var smtp_transport = node_mailer.createTransport("SMTP", {

            host: "smtp.qq.com",
            // secureConnection: true,
            port: 465,
            auth: {

                user: "1193235126@qq.com",
                pass: "Tju6qdiape"
            }

        });
         */
        that.smtp_transport.sendMail({

            from: "1193235126@qq.com",
            to:   "neutronest@gmail.com",
            subject: "The server has Crashed!!",

            html:  " <p>服务挂啦！！！</p> ლ(╹◡╹ლ)"
                +  "<a href=\"http://s890.photobucket.com/user/neutronest/media/0QQWD935LC11J4BT1LL_zpsjbw4jyme.jpg.html\" target=\"_blank\"><img src=\"http://i890.photobucket.com/albums/ac103/neutronest/0QQWD935LC11J4BT1LL_zpsjbw4jyme.jpg\" border=\"0\" alt=\" photo 0QQWD935LC11J4BT1LL_zpsjbw4jyme.jpg\"/></a>",
            text: "hello~"
        }, function(err, info){

            logger.info("mail checking");
            logger.info(err);
            logger.info(info);
        });
    };
    return {

        send_mail: send_mail
    };

})();

module.exports = mail_server;
