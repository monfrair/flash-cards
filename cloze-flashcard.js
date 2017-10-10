var fs = require('fs');

module.exports = ClozeFlashcard;

//create a constructor for the ClozeFlashcard

function ClozeFlashcard(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.clozeDelete = this.text.replace(this.cloze, '______');
    //create a function within a function
    this.create = function() {
        var data = {
            text: this.text,
            cloze: this.cloze,
            clozeDelete: this.clozeDelete,
            type: "cloze"
        };
        
        //adding the card to the log
        fs.appendFile("log.txt", JSON.stringify(data) + ';', "utf8",
                     function(error) {
            // if there is an error, log it
            if (error) {
                console.log(error);
            }        
        });
    };
}