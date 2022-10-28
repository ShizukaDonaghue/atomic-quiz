const introductionArea = document.getElementById('introduction-area');
const nameInput = document.getElementById('name-input');
const nameInputForm = document.getElementById('name-input-form');
const questionHelp = document.getElementById('question-help');
const questionMark = document.getElementById('question-mark');
const inputHelp = document.getElementById('input-help');
const rule = document.getElementById('rule');
const ruleButton = document.getElementById('rule-button');
const gameSection = document.getElementById('game-section');
const questionText = document.getElementById('question-text');
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const finishButton = document.getElementById('finish-button');
const resultSection = document.getElementById('result-section');
const resultComment = document.getElementById('result-comment');
const results = document.getElementById('results');
const choice1 = document.getElementById('choice1');
const choice2 = document.getElementById('choice2');
const choice3 = document.getElementById('choice3');
const choice4 = document.getElementById('choice4');
const explanationText = document.getElementById('explanation-text');
const finalScore = document.getElementById('final-score');
let answerButtons = document.getElementsByClassName('answer-button');
let user = '';
let currentQuestionNumber = document.getElementById('current-question-number'); 
let currentQuestionSet = [];
let shuffledQuestions = '';
let currentQuestionIndex = 0;
let correctAnswers = 0;

/* 
focus method for the username field so that the cursor is placed in the field if the screen size >= 768px 
(disabled for mobile phones to prevent the keyboard from appearing and hiding the bottom half of the screen 
for a better user experience)
*/
const screenSize = window.matchMedia('(min-width: 768px)');
if (screenSize.matches) {
    document.getElementById('username').focus();
} 

questionMark.addEventListener('mouseover', displayInputHelp);
questionMark.addEventListener('mouseleave', closeInputHelp);

/**
 * displays input help for the username field and hides start and rule buttons with mouseover event for desktops
 */
function displayInputHelp(){
    inputHelp.classList.remove('hide');
    startButton.classList.add('hide');
    ruleButton.classList.add('hide');    
}

/**
 * closes input help for the username field and unhides start and rule buttons with mouseleave event for desktops
 */
function closeInputHelp(){
    inputHelp.classList.add('hide');
    startButton.classList.remove('hide');
    ruleButton.classList.remove('hide'); 
}

questionMark.addEventListener('click', displayInputHelpHandler);

/**
 * toggles input help for the username field, and start and rule buttons with click event for mobile phones and tablets
 * (also works with click event on desktop) 
 */
function displayInputHelpHandler() {
    inputHelp.classList.toggle('hide');
    startButton.classList.toggle('hide');
    ruleButton.classList.toggle('hide');
}

ruleButton.addEventListener('click', displayRule);

/**
 * displays rule for the game and hides other elements in the start section
 */
function displayRule() {
    rule.classList.remove('hide');
    introductionArea.classList.add('hide');
    nameInput.classList.add('hide');
    questionHelp.classList.add('hide');
    ruleButton.classList.add('hide');
}

document.getElementById('close-rule-button').addEventListener('click', closeRule);

/**
 * closes rule for the game and unhides other elements in the start section
 */
function closeRule() {
    rule.classList.add('hide');
    introductionArea.classList.remove('hide');
    nameInput.classList.remove('hide');
    questionHelp.classList.remove('hide');
    ruleButton.classList.remove('hide');
    if (screenSize.matches) {
        document.getElementById('username').focus();
    }
}

/*
wait for the DOM to finish loading before running the game so that all functions for the game will work,
add "submit" event listener to the form element to call handleSubmit function to check the username provided 
*/
document.addEventListener('DOMContentLoaded', function() {
    nameInputForm.addEventListener('submit', handleSubmit); 
});

/**
 * prevents default action to submit,
 * stores the username in "user" variable,
 * checks if the username provided is >= 3 and <= 10 characters and not an empty string,
 * if the username meets the criteria, call runGame function, 
 * if not, alert the user to let them know the requirements for the name input field
 */
function handleSubmit(event) {
    event.preventDefault();
    user = document.getElementById('username').value;
    if (user.length >= 3 && user.length <= 10 && user !== '') {
        runGame();
    } else {
        alert('Please enter your name. The name field accepts a minimum of 3 and a maximum of 10 characters including spaces.');
    }
}

/**
 * hides the start section and displays the game section, 
 * shuffles the array of questions and stores it in "currentQuestionSet" variables, 
 * calls "nextQuestion" function
 */
function runGame(){
    document.getElementById('start-section').classList.add('hide');
    gameSection.classList.remove('hide');
  
    // Shuffling an array code from https://javascript.info/task/shuffle
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);

    currentQuestionSet = shuffledQuestions;
        
    nextQuestion();    
}

/**
 * preparation for the next question, 
 * hides answer explanation text from the previous question, 
 * calculates and displays the question number, 
 * reactivates the answer buttons and cursor pointers, 
 * removes class indicating correct or incorrect answer from the answer buttons, 
 * removes the next button so that it requires the user to select an answer before they can move forward,
 * calls displayQuestion function
 */
function nextQuestion(){
    explanationText.classList.add('hide');
    currentQuestionNumber.innerText = currentQuestionIndex + 1;
        
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].removeAttribute('disabled', 'disabled');
        answerButtons[i].classList.add('cursor-pointer');
        answerButtons[i].classList.remove('correct');
        answerButtons[i].classList.remove('incorrect');
    }

    nextButton.classList.add('hide');

    displayQuestion();
}

/**
 * loops through the questions array and displays each question and possible answers, 
 * once an answer button is selected, call checkAnswer function
 */
function displayQuestion(){
    for (let i = 0; i < questions.length; i++) {
        questionText.innerHTML = currentQuestionSet[currentQuestionIndex].question;
        choice1.innerHTML = currentQuestionSet[currentQuestionIndex].a;
        choice2.innerHTML = currentQuestionSet[currentQuestionIndex].b; 
        choice3.innerHTML = currentQuestionSet[currentQuestionIndex].c; 
        choice4.innerHTML = currentQuestionSet[currentQuestionIndex].d; 
    }
        
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].addEventListener('click', checkAnswer);
    }
}

/**
 * disables the answer buttons once an answer has been selected so that the user can only select one answer, 
 * disables the cursor pointer effect once the answer buttons are disabled,
 * checks the user answer and if it is correct, increments the correct answer score,
 * shows the answer explanation regardless of whether the answer is correct or not, 
 * adds class "correct" to the answer button if the answer is correct or "incorrect" if the answer is incorrect, 
 * if there are more questions left in the array, displays the next button so that the user can move forward to 
 * the next question and calls nextQuestion function, 
 * if there are no more questions left in the array, displays the finish button
 */
function checkAnswer(){
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].setAttribute('disabled', 'disabled');
        answerButtons[i].classList.remove('cursor-pointer');
    }

    let userAnswer = this.value;
    let correctAnswer = currentQuestionSet[currentQuestionIndex].answer;
    if (userAnswer === correctAnswer) {
        correctAnswers++;
        incrementScore();  
        explanationText.classList.remove('hide');
        document.getElementById('explanation-text').innerHTML =  
            currentQuestionSet[currentQuestionIndex].explanation;
    } else {
        explanationText.classList.remove('hide');
        document.getElementById('explanation-text').innerHTML =  
            currentQuestionSet[currentQuestionIndex].explanation;
    } 

    for (let i = 0; i < answerButtons.length; i++) {
        if (answerButtons[i].value === correctAnswer) {
            answerButtons[i].classList.add('correct');
        } else if (userAnswer !== correctAnswer) {
            this.classList.add('incorrect');
        }        
    }
 
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;  
        nextButton.classList.remove('hide');
        nextButton.addEventListener('click', nextQuestion);
    } else {
        finishButton.classList.remove('hide');     
    }   
}

/**
 * obtains the previous score for correct answers and increments it if the answer selected is correct and 
 * stores the new score
 */
function incrementScore(){
    let previousScore = parseInt(document.getElementById('correct-answers').innerText);
    document.getElementById('correct-answers').innerText = ++previousScore;
}

finishButton.addEventListener('click', result);

/**
 * hides the game section and displays the result section, 
 * displays the username stored and the number of correct answers and the final score, 
 * displays different messages depending on the final score, 
 * event listener for the play again button to call resetGame function
 */
function result(){
    gameSection.classList.add('hide');
    resultSection.classList.remove('hide');

    if (correctAnswers <= 1) {
        resultComment.innerHTML = 
            `<p><b>${user}</b>, you answered <b>${correctAnswers}</b> question correctly and your <b>total score</b> is:</p>`;
        finalScore.innerHTML = document.getElementById('final-score').innerText = correctAnswers * 100;
        results.innerHTML = 
            `<p>Oh dear... Looks like you slept through your chemistry class...!?</p>
            <p>Let's try the game again to improve your knowledge and see if you can do better!!</p>`;
    } else if (correctAnswers <= 2) {
        resultComment.innerHTML = 
            `<p><b>${user}</b>, you answered <b>${correctAnswers}</b> questions correctly and your <b>total score</b> is:</p>`;
        finalScore.innerHTML = document.getElementById('final-score').innerText = correctAnswers * 100;
        results.innerHTML = 
            `<p>Oh dear... Looks like you slept through your chemistry class...!?</p>
            <p>Let's try the game again to improve your knowledge and see if you can do better!!</p>`;
    } else if (correctAnswers <= 5) {
        resultComment.innerHTML = 
            `<p><b>${user}</b>, you answered <b>${correctAnswers}</b> questions correctly and your <b>total score</b> is:</p>`; 
        finalScore.innerHTML = document.getElementById('final-score').innerText = correctAnswers * 100; 
        results.innerHTML = 
            `<p>Not bad. Looks like you were paying some attention through your chemistry class!</p>
            <p>Let's try the game again to improve your knowledge and unleash your inner geek!</p>`;
    } else {
        resultComment.innerHTML = 
            `<p><b>${user}</b>, you answered <b>${correctAnswers}</b> questions correctly and your <b>total score</b> is:</p>`;
        finalScore.innerHTML = document.getElementById('final-score').innerText = correctAnswers * 100;
        results.innerHTML = 
            `<p id="highscore"><b><i class="fas fa-trophy"></i> Great job!</b></p> <p>You must have been the teacher's favourite!</p> 
            <p>Be very proud and let your geek flag fly high!</p>`;
    }

    document.getElementById('play-again').addEventListener('click', resetGame);
}

/**
 * resets the question index, the number of correct answers and scores, 
 * hides the result section and the finish button, 
 * calls runGame function to start the game again
 */
function resetGame() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    document.getElementById('correct-answers').innerText = 0;
    resultSection.classList.add('hide');
    finishButton.classList.add('hide');

    runGame();
}
