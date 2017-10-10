// start with require fs

var fs = require("fs");

module.exports = RegularFlashcard;

//make a constructor for the BasicCard

function RegularFlashcard(front, back) {
    this.front = front;
    this.back = back;
    this.create = function() {
        var data = {
            front: this.front,
            back: this.back,
            type: "basic",
        };
        
        //add the card to the log.txt file
        fs.appendFile("log.txt", JSON.stringify(data) + ';', "utf8",
                     function(error) {
            //log error if it happens
            if (error) {
                console.log(error);
            }
        });
    };
    }