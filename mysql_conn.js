var config = require("./config");
var mysql = require("mysql");
var logger = require("./logger");

var MysqlClient = (function(){

    var that = this;
    that.conn = null;
    that.createConnection = function() {
        var conn = mysql.createConnection({
            host: config.mysql_connect.host,
            port: config.mysql_connect.port,
            user: config.mysql_connect.user,
            password: config.mysql_connect.password,
            database: config.mysql_connect.database,
            charset: config.mysql_connect.charset
        });
        that.conn = conn;
        return that.conn;
    };

    that.getCountofValidByUser = function(keyword, username, callback) {

        var _query = "SELECT COUNT(id) as amount FROM ?? "
                + " WHERE (user1 = ? or user2 = ? ) "
                + " AND ( valid IS NOT NULL )";

        conn.query(_query, [keyword, username], function(err, rows, fields){
            if(err) {
                logger.info([err, "ERROR: getCountofValidByUser"]);
                callback(1, "DB ERROR");
            } else {

                callback(0, rows[0]);
            }
        });
    };

    return {

        getCountofValidByUser: getCountofValidByUser
    };

});