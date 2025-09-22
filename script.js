const questions = [
    {
        question: "Which language runs in a web browser?",
        answers: [
            { text: "Java", correct: false },
            { text: "C", correct: false },
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Central Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Cascading Simple Sheets", correct: false },
            { text: "Cars SUVs Sailboats", correct: false }
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hypertext Markup Language", correct: true },
            { text: "Hyperloop Machine Language", correct: false },
            { text: "Helicopters Terminals Motorboats Lamborginis", correct: false },
            { text: "None of the above", correct: false }
        ]
    },
    {
        question: "What year was JavaScript launched?",
        answers: [
            { text: "1996", correct: false },
            { text: "1995", correct: true },
            { text: "1994", correct: false },
            { text: "None of the above", correct: false }
        ]
    }
];

const questionElement = document.getElementById("qustion");
const answerButtons = document.getElementById("button");
const nextButton = document.getElementById("next-btn");
const quitButton = document.getElementById("quit-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();

    // Reset buttons
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";  // hide until user selects an answer
    quitButton.style.display = "block"; // show quit button
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    quitButton.style.display = "none";  // hide quit button after finishing
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Play Again") {
        startQuiz();
    } else {
        handleNextButton();
    }
});

quitButton.addEventListener("click", () => {
    showScore();
});

startQuiz();
