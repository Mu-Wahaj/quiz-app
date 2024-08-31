const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for water?",
    answers: [
      { text: "O2", correct: false },
      { text: "CO2", correct: false },
      { text: "H2O", correct: true },
      { text: "HO2", correct: false },
    ],
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    answers: [
      { text: "Charles Dickens", correct: false },
      { text: "Jane Austen", correct: false },
      { text: "Mark Twain", correct: false },
      { text: "William Shakespeare", correct: true },
    ],
  },
  {
    question: "Which element is the most abundant in the Earth's atmosphere?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Carbon Dioxide", correct: false },
      { text: "Nitrogen", correct: true },
      { text: "Hydrogen", correct: false },
    ],
  },
  {
    question: "In which year did the Titanic sink?",
    answers: [
      { text: "1905", correct: false },
      { text: "1912", correct: true },
      { text: "1920", correct: false },
      { text: "1915", correct: false },
    ],
  },
  {
    question: "What is the capital city of Japan?",
    answers: [
      { text: "Tokyo", correct: true },
      { text: "Kyoto", correct: false },
      { text: "Osaka", correct: false },
      { text: "Hiroshima", correct: false },
    ],
  },
  {
    question: "Which is the smallest prime number?",
    answers: [
      { text: "1", correct: false },
      { text: "3", correct: false },
      { text: "2", correct: true },
      { text: "5", correct: false },
    ],
  },
  {
    question: "What is the main ingredient in guacamole?",
    answers: [
      { text: "Tomato", correct: false },
      { text: "Lime", correct: false },
      { text: "Avocado", correct: true },
      { text: "Onion", correct: false },
    ],
  },
  {
    question: "Which company is known for the iPhone?",
    answers: [
      { text: "Samsung", correct: false },
      { text: "Apple", correct: true },
      { text: "Google", correct: false },
      { text: "Microsoft", correct: false },
    ],
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Leonardo da Vinci", correct: true },
      { text: "Vincent van Gogh", correct: false },
      { text: "Pablo Picasso", correct: false },
      { text: "Claude Monet", correct: false },
    ],
  },
];

const questionElement = document.getElementById("qustion");
const answersBtn = document.getElementById("button");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";

  showQuestion();
}
function showQuestion() {
  resetState();
  //   console.log(currentQuestionIndex);
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + " ." + currentQuestion.question;
  currentQuestion.answers.forEach((answers) => {
    const button = document.createElement("button");
    button.innerHTML = answers.text;
    button.classList.add("btn");
    answersBtn.appendChild(button);
    if (answers.correct) {
      button.dataset.correct = answers.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextBtn.style.display = "none";
  while (answersBtn.firstChild) {
    answersBtn.removeChild(answersBtn.firstChild);
  }
}
function selectAnswer(e) {
  const selectBtn = e.target;
  const iscorrect = selectBtn.dataset.correct === "true";
  if (iscorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answersBtn.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

function showScore() {
  resetState();
  if (score <= 5) {
    questionElement.innerHTML = `your score is ${score} aut of ${questions.length} <br> <h1>You Need To Tmprove!!<h1/>`;
  } else if (score > 5 && score <= 7) {
    questionElement.innerHTML = `your score is ${score} aut of ${questions.length}<br> <h1>Good Job!!<h1/>`;
  } else {
    questionElement.innerHTML = `your score is ${score} aut of ${questions.length}<br> <h1>Congrats!!<h1/>`;
  }
  questionElement.style.textAlign = "center";
  nextBtn.innerHTML = "play again";
  nextBtn.style.display = "block";
}
function handleNextBtn() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});
