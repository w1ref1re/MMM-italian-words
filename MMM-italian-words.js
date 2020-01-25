'use strict'


Module.register("MMM-italian-words", {


    defaults: {
        update_interval: 20000,

    },
    start: function() {
        Log.log(this.name + " is started");

        this.sendSocketNotification("GET_FILE", {path: this.file("italian-words.json")});

        this.vocab = {};
        this.vocab_length = 0;
        this.vocab_obj = {name: "none", genus: "none", translation: "none"};

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
        p.className = "medium bright";
        p.innerText = this.vocab_obj.name;

        var p2 = document.createElement("p");
        p2.className = "medium";
        p2.innerText = `${this.vocab_obj.genus}   ${this.vocab_obj.translation}`;

        wrapper.appendChild(p);
		return wrapper;
    }, 
    notificationReceived: function(notification, payload) {
        switch (notification) {

            case "DOM_OBJECTS_CREATED":
                
                this.updateVocab();
                var timer = setInterval(() => {
                    this.updateVocab();
                }, this.config.update_interval);

                break;
        
        }

    },    
    socketNotificationReceived: function(notification, payload) {
        switch (notification) {

            case "DATA":

                Log.log("data received");
                Log.log(payload);

                this.vocab = payload.vocab;
                this.vocab_length = this.vocab.length;

                this.initialized = true;

                break;
        
        }
    },

    updateVocab: function() {
        if (this.initialized) {

            var index = Math.floor(Math.random() * Math.floor(this.vocab_length));

            this.vocab_obj = this.vocab[index]

            this.updateDom();
        }
    },

});