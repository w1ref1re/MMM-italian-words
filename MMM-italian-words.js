'use strict'


Module.register("MMM-italian-words", {


    defaults: {},
    start: function() {
        Log.log(this.name + " is started");

        this.sendSocketNotification("GET_FILE", {path: this.file("italian-words.json")});

        this.vocab = {};
        this.vocab_length = 0;
        this.vocab_str = "not initialized";

        this.initialized = false;


        /*Log.log(`${this.file("italian-words.json")}, ${data}`)

        this.vocab = JSON.parse(data);
        
        
        this.vocab_length = Object.getOwnPropertySymbols(this.vocab).length;

        this.vocab_str = "empty string"*/
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.className = "container";

        var p = document.createElement("p");
        p.className = "medium thin bright";
        p.innerText = this.vocab_str;

        wrapper.appendChild(p);
		return wrapper;
    }, 
    notificationReceived: function(notification, payload) {
        switch (notification) {

            case "DOM_OBJECTS_CREATED":

                var timer = setInterval(() => {
                    this.updateVocab();
                }, 3000);

                break;
        
        }

    },    
    socketNotificationReceived: function(notification, payload) {
        switch (notification) {

            case "DATA":

                Log.log("data received");
                Log.log(payload);

                this.vocab = JSON.parse(payload);
                this.vocab_length = this.vocab["vocab"].length;

                this.initialized = true;

                break;
        
        }
    },

    updateVocab: function() {
        if (this.initialized) {

            var index = Math.floor(Math.random() * Math.floor(this.vocab_length));

            vocab_object = this.vocab[index]

            this.vocab_str = `${vocab_object["name"]}, ${vocab_object["genus"]}, ${vocab_object["translation"]}`;

            this.updateDom();
        }
    },

   /* defaults: {

    },

    start: function() {
        Log.log(this.name + " is started");

        this.vocab = JSON.parse(this.file("italian-words.json"));
        this.vocab_length = Object.getOwnPropertySymbols(this.vocab).length;

        this.vocab_str = "empty string"
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.className = "container";

        var p = document.createElement("p");
        p.className("medium thin bright");
        p.innerText(this.vocab_str);

        wrapper.appendChild(p);
		return wrapper;
    },

    notificationReceived: function(notification, payload) {
        switch (notification) {

            case "DOM_OBJECTS_CREATED":
                
                var timer = setInterval(() => {
                    this.updateVocab();
                }, 3000);

                break;
        
            }

    },


    updateVocab: function() {
        if (this.initialized) {

            var index = Math.floor(Math.random() * Math.floor(this.vocab_length));

            vocab_object = this.vocab[index]

            this.vocab_str = `${vocab_object["name"]}, ${vocab_object["genus"]}, ${vocab_object["translation"]}`;

            this.updateDom();
        }
    },*/

});