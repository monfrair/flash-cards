// require basic flashcard module
// require cloze flashcard module
// require inquirer for getting user input at command line
// require fs

var RegularFlashcard = require('./reg-flashcard.js');
var ClozeFlashcard = require('./cloze-flashcard.js');
var inquirer = require('inquirer');
var fs = require('fs');


// set up the inquirer prompt
inquirer.prompt([{
    name: 'choice',
    message: 'What do you want to do?',
    type: 'list',
    choices: [{
        name: 'add-flashcard'
    }, {
        name: 'see-all-cards'
    }]
    
    //function to direct game based on user entry
}]).then(function(answer) {
    if (answer.choice === 'add-flashcard') {
        addNewCard();
    } else if (answer.choice === 'see-all-cards') {
        seeCards();
    }
});

var addNewCard = function() {
    // get the input from the user
    inquirer.prompt([{
        name: 'typeCard',
        message: 'What type of flash card do you want to make?',
        type: 'list',
        choices: [{
            name: 'regular-flashcard'
        }, {
            name: 'cloze-flashcard'
        }]
        
        
        
    }])
}