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

// focus method for the username field so that the cursor is placed in the field
document.getElementById('username').focus();

/*
event listeners to call displayInputHelp or closeInputHelp function to display or hide input help 
for the username field when hovered over the question mark in the form element
*/
// questionMark.addEventListener('mouseover', displayInputHelp);
// questionMark.addEventListener('mouseleave', closeInputHelp);

if (document.getElementById('input-help').style.display === 'none') {
    questionMark.addEventListener('touchstart', displayInputHelp);
} else {
    questionMark.addEventListener('touchstart', closeInputHelp);
}


/**
 * displays input help for the username field and hides start and rule buttons
 */
function displayInputHelp(){
    inputHelp.classList.remove('hide');
    startButton.classList.add('hide');
    ruleButton.classList.add('hide');    
}

/**
 * closes input help for the username field and unhide start and rule buttons
 */
function closeInputHelp(){
    inputHelp.classList.add('hide');
    startButton.classList.remove('hide');
    ruleButton.classList.remove('hide'); 
}

// event listener to call displayRule function to display the rule section
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

// event listener to call closeRule function to close the rule section
document.getElementById('close-rule-button').addEventListener('click', closeRule);

/**
 * closes rule for the game and unhide other elements in the start section
 */
function closeRule() {
    rule.classList.add('hide');
    introductionArea.classList.remove('hide');
    nameInput.classList.remove('hide');
    questionHelp.classList.remove('hide');
    ruleButton.classList.remove('hide');
    document.getElementById('username').focus();
}

/*
wait for the DOM to finish loading before running the game so that all functions for the game will work,
add "submit" event listerner to the form element to call runGame function only when a username that 
meets the criteria set in index.html (a min 3 and a max of 20 characters) 
*/
document.addEventListener('DOMContentLoaded', function() {
    nameInputForm.addEventListener('submit', runGame); 
});

/**
 * stores the username in "user" variable, 
 * hides the start section and displayes the game section, 
 * shuffles the array of questions and stores it in "currentQuestionSet" variables, 
 * calls "nextQuestion" function
 */
function runGame(){
    user = document.getElementById('username').value;
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
 * removes class indicating correct or incorrect from the answer buttons, 
 * hides the next button so that it requires the user to select an answer before they can move forward, 
 * call displayQuestion function
 */
function nextQuestion(){
    explanationText.classList.add('hide');
    currentQuestionNumber.innerText = currentQuestionIndex + 1;
        
    choice1.removeAttribute('disabled', 'disabled');
    choice2.removeAttribute('disabled', 'disabled');
    choice3.removeAttribute('disabled', 'disabled');
    choice4.removeAttribute('disabled', 'disabled');
    choice1.classList.add('cursor-pointer');
    choice2.classList.add('cursor-pointer');
    choice3.classList.add('cursor-pointer');
    choice4.classList.add('cursor-pointer');

    for (let i = 0; i <  answerButtons.length; i++) {
        answerButtons[i].classList.remove('correct');
        answerButtons[i].classList.remove('incorrect');
    }

    nextButton.classList.add('hide');

    displayQuestion();
}

/**
 * loops through the questions array and display each question and possible answers, 
 * once the answer button is selected, call checkAnswer function
 */
function displayQuestion(){
    for (let i = 0; i < questions.length; i++) {
        questionText.innerHTML = currentQuestionSet[currentQuestionIndex].question;
        choice1.innerHTML = currentQuestionSet[currentQuestionIndex].a;
        choice2.innerHTML = currentQuestionSet[currentQuestionIndex].b; 
        choice3.innerHTML = currentQuestionSet[currentQuestionIndex].c; 
        choice4.innerHTML = currentQuestionSet[currentQuestionIndex].d; 
        
        choice1.onclick = checkAnswer;
        choice2.onclick = checkAnswer;
        choice3.onclick = checkAnswer;
        choice4.onclick = checkAnswer;
    }
}

/**
 * disables the answer buttons once an answer has been selected so that the user can only select an answer once, 
 * disables the cursor pointer effect once the answer buttons are disabled,
 * checks the user answer and if it is correct, increments the correct answer score,
 * shows the answer explanation regardless of whether the answer is correct or not, 
 * adds class "correct" to the answer button if the answer is correct or "incorrect" if the answer is incorrect, 
 * if there are more questions left in the array, displays the next button so that the user can move forward to the 
 * next question and calls nextQuestion function, 
 * if there are no more questions left in the array, displays the finish button
 */
function checkAnswer(){
    choice1.setAttribute('disabled', 'disabled');
    choice2.setAttribute('disabled', 'disabled');
    choice3.setAttribute('disabled', 'disabled');
    choice4.setAttribute('disabled', 'disabled');
    choice1.classList.remove('cursor-pointer');
    choice2.classList.remove('cursor-pointer');
    choice3.classList.remove('cursor-pointer');
    choice4.classList.remove('cursor-pointer');

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
 * obtain the previous score for correct answers and increments it if the answer selected is correct and 
 * stores the new score
 */
function incrementScore(){
    let previousScore = parseInt(document.getElementById('correct-answers').innerText);
    document.getElementById('correct-answers').innerText = ++previousScore;
}

// event listener for the finish button to call result function
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
        resultComment.innerHTML = `<p><b>${user}</b>, you answered <b>${correctAnswers}</b> question correctly and your <b>total score</b> is:</p>`;
        finalScore.innerHTML = document.getElementById('final-score').innerText = correctAnswers * 100;
        results.innerHTML = `<p>Oh dear... Looks like you slept through your chemistry class...!?</p>
        <p>Let's try the game again to improve your knowldege and see if you can do better!!</p>`;
    } else if (correctAnswers <= 2) {
        resultComment.innerHTML = `<p><b>${user}</b>, you answered <b>${correctAnswers}</b> questions correctly and your <b>total score</b> is:</p>`;
        finalScore.innerHTML = document.getElementById('final-score').innerText = correctAnswers * 100;
        results.innerHTML = `<p>Oh dear... Looks like you slept through your chemistry class...!?</p>
        <p>Let's try the game again to improve your knowldege and see if you can do better!!</p>`;
    } else if (correctAnswers <= 5) {
        resultComment.innerHTML = `<p><b>${user}</b>, you answered <b>${correctAnswers}</b> questions correctly and your <b>total score</b> is:</p>`; 
        finalScore.innerHTML = document.getElementById('final-score').innerText = correctAnswers * 100; 
        results.innerHTML = `<p>Not bad. Looks like you were paying some attention through your chemistry class!</p>
        <p>Let's try the game again to improve your knowldege and unleash your inner geek!</p>`;
    } else {
        resultComment.innerHTML = `<p><b>${user}</b>, you answered <b>${correctAnswers}</b> questions correctly and your <b>total score</b> is:</p>`;
        finalScore.innerHTML = document.getElementById('final-score').innerText = correctAnswers * 100;
        results.innerHTML = `<p id="trophy"><b><i class="fas fa-trophy"></i> Great job!</b></p> <p>You must have been the teacher's favourite!</p> 
        <p>Be proud and let your geek flag fly high!</p>`;
    }

    document.getElementById('play-again').addEventListener('click', resetGame);
}

/**
 * resets the question index, the number of correct answers and scores, 
 * hides the result section and the finish button and displays the next button, 
 * call runGame function to start the game again
 */
function resetGame() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    document.getElementById('correct-answers').innerText = 0;
    resultSection.classList.add('hide');
    finishButton.classList.add('hide');
    nextButton.classList.remove('hide');

    runGame();
}


