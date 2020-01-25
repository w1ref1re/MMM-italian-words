const NodeHelper = require("node_helper");

const fs = require("fs")

module.exports = NodeHelper.create({
    start: function() {
    },

    socketNotificationReceived: function(notification, payload) {
        switch(notification) {
            case "GET_FILE":
                this.config = payload;
                this.readData(this.config.path);            
        }
    },


    readData: function(path) {
        fs.readFile(path, (err, data) => {
            if (err) throw err;
            this.sendSocketNotification('DATA', data);
        });
    },

});