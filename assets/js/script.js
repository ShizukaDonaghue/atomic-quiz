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
const nextButton = document.getElementById('next-button');
const finishButton = document.getElementById('finish-button');
const resultSection = document.getElementById('result-section');
const results = document.getElementById('results');
const choice1 = document.getElementById('choice1');
const choice2 = document.getElementById('choice2');
const choice3 = document.getElementById('choice3');
const choice4 = document.getElementById('choice4');
let answerButtons = document.getElementsByClassName('answer-button');
let user = '';
let currentQuestionNumber = document.getElementById('current-question-number'); 
let currentQuestionSet = [];
let shuffledQuestions = '';
let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

document.getElementById('username').focus();

questionMark.addEventListener('mouseover', displayInputHelp);
questionMark.addEventListener('mouseleave', closeInputHelp);

function displayInputHelp(){
    inputHelp.classList.remove('hide');
}

function closeInputHelp(){
    inputHelp.classList.add('hide');
}

ruleButton.addEventListener('click', displayRule);

function displayRule() {
    rule.classList.remove('hide');
    introductionArea.classList.add('hide');
    nameInput.classList.add('hide');
    questionHelp.classList.add('hide');
    ruleButton.classList.add('hide');
}

document.getElementById('close-rule-button').addEventListener('click', closeRule);

function closeRule() {
    rule.classList.add('hide');
    introductionArea.classList.remove('hide');
    nameInput.classList.remove('hide');
    questionHelp.classList.remove('hide');
    ruleButton.classList.remove('hide');
    document.getElementById('username').focus();
}

// Wait for the DOM to finish loading before running the game so that all fuctions will work
// Add event listerner to the start button
document.addEventListener('DOMContentLoaded', function() {
    nameInputForm.addEventListener('submit', runGame); 
});

function runGame(){
    user = document.getElementById('username').value;
    document.getElementById('start-section').classList.add('hide');
    gameSection.classList.remove('hide');
  
    // Shuffling an array code from https://javascript.info/task/shuffle
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);

    currentQuestionSet = shuffledQuestions;
        
    nextQuestion();    
}

function nextQuestion(){
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

    displayQuestion();
}


//  displayQuestion function loops through questions array and display each question and possible answers
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
    } else {
        incorrectAnswers++;
        incrementIncorrectScore(); 
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
        nextButton.addEventListener('click', nextQuestion);
    } else {
        nextButton.classList.add('hide');
        finishButton.classList.remove('hide');     
    }     
}

function incrementScore(){
    let previousScore = parseInt(document.getElementById('correct-answers').innerText);
    document.getElementById('correct-answers').innerText = ++previousScore;
    document.getElementById('total-score').innerText = correctAnswers *100; 
}

function incrementIncorrectScore(){
    let previousScore = parseInt(document.getElementById('incorrect-answers').innerText);
    document.getElementById('incorrect-answers').innerText = ++previousScore;
}

finishButton.addEventListener('click', result);

function result(){
    gameSection.classList.add('hide');
    resultSection.classList.remove('hide');

    results.innerText=`${user}, you answered ${correctAnswers} correctly and your total score is`;
    document.getElementById('final-score').innerText = correctAnswers * 100;

    document.getElementById('play-again').addEventListener('click', resetGame);
}

function resetGame() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    document.getElementById('correct-answers').innerText = 0;
    document.getElementById('incorrect-answers').innerText = 0;
    document.getElementById('total-score').innerText = 0;
    resultSection.classList.add('hide');
    finishButton.classList.add('hide');
    nextButton.classList.remove('hide');

    runGame();
}

const questions = [
    {
        question: "The three basic components of an atom are?",
        a: "Protons, neutrons, and ions",
        b: "Protons, neutrons, and electrons",
        c: "Protons, neutrinos, and ions",
        d: "Protium, deuterium, and tritium",
        answer: "B",
    },
    {
        question: "An element is determined by the number of?",
        a: "Atoms",
        b: "Electrons",
        c: "Neutrons",
        d: "Protons",
        answer: "D",
    },
    {
        question: "The nucleus of an atom consists of?",
        a: "Electrons",
        b: "Neutrons",
        c: "Protons and neutrons",
        d: "Protons, neutrons, and electrons",
        answer: "C",
    },
    {
        question: "A single proton has what electrical charge?",
        a: "No charge",
        b: "Positive charge",
        c: "Negative charge",
        d: "Either a positive or negative charge",
        answer: "B",
    },
    {
        question: "Which particles have approximately the same size and mass as each other?",
        a: "Neutrons and electrons",
        b: "Electrons and protons",
        c: "Protons and neutrons",
        d: "None - all are different in terms of size and mass",
        answer: "C",
    },
    {
        question: "Which two particles would be attracted to each other?",
        a: "Electrons and neutrons",
        b: "Electrons and protons",
        c: "Protons and neutrons",
        d: "All particles are attracted to each other",
        answer: "B",
    },
    {
        question: "The atomic number of an atom is",
        a: "The number of electrons",
        b: "The number of neutrons",
        c: "The number of protons",
        d: "The number of protons plus the number of neutrons",
        answer: "C",
    },
    {
        question: "Changing the number of neutrons of an atom changes its?",
        a: "Isotope",
        b: "Element",
        c: "Ion",
        d: "Charge",
        answer: "A",
    },
    {
        question: "When you change the number of electrons on an atom, you produce a different?",
        a: "Isotope",
        b: "Element",
        c: "Ion",
        d: "Atomic mass",
        answer: "C",
    },
    {
        question: "According to atomic theory, electrons are usually found?",
        a: "In the atomic nucleus",
        b: "Outside the nucleus, yet very near it because they are attracted to protons",
        c: "Outside the nucleus -- most of an atom's volume is the electron cloud",
        d: "Anywhere they want to be -- no particular location is more likely than any other",
        answer: "C",
    },
];