// require basic flashcard module
// require cloze flashcard module
// require inquirer for getting user input at command line
// require fs

var RegularFlashcard = require('./BasicCard.js');
//BasicCard.js
var ClozeFlashcard = require('./cloze-flashcard.js');
var inquirer = require('inquirer');
var fs = require('fs');


// set up the inquirer prompt
inquirer.prompt([{
    name: 'choice',
    message: 'What would you like to do?',
    type: 'list',
    choices: [{
        name: 'add-a-new-flashcard'
    }, {
        name: 'see-all-of-the-flashcards'
    }, {
        name: ' '
    }]

    //function to direct game based on user entry
}]).then(function (answer) {
    if (answer.choice === 'add-a-new-flashcard') {
        addNewCard();
    } else if (answer.choice === 'see-all-of-the-flashcards') {
        seeCards();
    }
});

var addNewCard = function () {
    // get the input from the user
    inquirer.prompt([{
        name: 'typeCard',
        message: 'What type of flash card do you want to create?',
        type: 'list',
        choices: [{
            name: 'make-a-regular-flashcard'
        }, {
            name: 'make-a-cloze-flashcard'
        }]

        // use the received input to direct the app
    }]).then(function (answer) {
        if (answer.typeCard === 'make-a-regular-flashcard') {
            inquirer.prompt([{
                name: 'front',
                message: 'What is the question?',
                validate: function (input) {
                    if (input === ' ') {
                        console.log('Please ask a question');
                        return false;
                    } else {
                        return true;
                    }
                }

    }, {
                name: 'back',
                message: 'What is the correct answer?',
                validate: function (input) {
                    if (input === '') {
                        console.log('Please enter an answer');
                        return false;
                    } else {
                        return true;
                    }
                }
   }]).then(function (answer) {
                var newRegular = new RegularFlashcard(answer.front, answer.back);
                newRegular.create();
                nextStep();
            });
        } else if (answer.typeCard === 'make-a-cloze-flashcard') {
            inquirer.prompt([{
                name: 'text',
                message: 'Enter the full text',
                validate: function (input) {
                    if (input === '') {
                        console.log('Please enter the full text');
                    } else {
                        return true;
                    }
                }
        }, {
                name: 'cloze',
                message: 'What is the cloze portion?',
                validate: function (input) {
                    if (input === '') {
                        console.log('Please enter the cloze portion');
                        return false;
                    } else {
                        return true;
                    }
                }


        }]).then(function (answer) {
                var text = answer.text;
                var cloze = answer.cloze;
                if (text.includes(cloze)) {
                    var newCloze = new ClozeFlashcard(text, cloze);
                    newCloze.create();
                    nextStep();
                } else {
                    console.log('The cloze portion you entered is not found in the text.  Please re-enter the data');
                    addNewCard();
                }
            });
        }
    });
};


var nextStep = function () {
    //get input from the user
    inquirer.prompt([{
        name: 'nextAction',
        message: 'What would you like to do next?',
        type: 'list',
        choices: [{
            name: 'make-new-flashcard'
        }, {
            name: 'show-all-flashcards'
        }, {
            name: 'nothing'
        }]


        //what to do with received input


    }]).then(function (answer) {
        if (answer.nextAction === 'make-new-flashcard') {
            addNewCard();
        } else if (answer.nextAction === 'show-all-flashcards') {
            seeCards();
        } else if (answer.nextAction === 'nothing') {
            return;
        }
    });

};

var seeCards = function () {
    //read the text from the log.txt file
    fs.readFile('./log.txt', 'utf8', function (error, data) {
        //if an error is found log the error
        if (error) {
            console.log('Error occoured: ' + error);
        }

        var questions = data.split(';');
        var notEmpty = function (value) {
            return value;
        };
        questions = questions.filter(notEmpty);
        var total = 0;
        seeQuestions(questions, total);

    });
};


var seeQuestions = function (array, index) {
    question = array[index];
    var parseQuestion = JSON.parse(question);
    var questionText;
    var correctAnswer;
    if (parseQuestion.type === 'basic') {
        questionText = parseQuestion.front;
        correctAnswer = parseQuestion.back;
    } else if (parseQuestion.type === 'cloze') {
        questionText = parseQuestion.clozeDelete;
        correctAnswer = parseQuestion.cloze;
    }
    inquirer.prompt([{
        name: 'response',
        message: questionText
        }]).then(function (answer) {
        if (answer.response === correctAnswer) {
            console.log('Correct!');
        }
        if (index < array.length - 1) {
            seeQuestions(array, index + 1);

        } else if (answer.response !== correctAnswer) {
            console.log('Incorrect!');
            if (index < array.length - 1) {
                seeQuestions(array, index + 1);
            }
        }
    });
};
