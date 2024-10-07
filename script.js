const startBtn = document.querySelector(".start-btn");
const popupInfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");
const optionList = document.querySelector(".option-list");
const resultBox = document.querySelector(".result-box");
const tryAgainBtn = document.querySelector(".tryAgain-btn");
const goHomeBtn = document.querySelector(".goHome-btn")

startBtn.addEventListener("click", () => {
    popupInfo.classList.add("active");
    main.classList.add("active");
});

exitBtn.addEventListener("click", () => {
    popupInfo.classList.remove("active");
    main.classList.remove("active");
});

continueBtn.addEventListener("click", () => {
    quizSection.classList.add("active");
    popupInfo.classList.remove("active");
    main.classList.remove("active");
    quizBox.classList.add("active");

    showQuestions(questionCount);
    updateQuestionCounter(questionCount + 1);
    headerScore();
});

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

tryAgainBtn.addEventListener("click", () => {
    quizBox.classList.add("active");
    resultBox.classList.remove("active");

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    updateQuestionCounter(questionNumb);

    headerScore();
});

goHomeBtn.addEventListener("click", () => {
    quizSection.classList.remove("active");
    nextBtn.classList.remove("active");
    resultBox.classList.remove("active");

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    updateQuestionCounter(questionNumb);

    headerScore();
});

const nextBtn =document.querySelector(".next-btn");
nextBtn.onclick = () => {
    if (questionCount < questions.length - 1){
        questionCount++;
    showQuestions(questionCount);

    questionNumb++;
    updateQuestionCounter(questionNumb);

    nextBtn.classList.remove("active");
    }
    else{
        showResultBox()
    }
}

function showQuestions(index) {
    const questionText = document.querySelector(".question-text");
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

   optionList.innerHTML = '';

   const options = questions[index].options;

    options.forEach(optionText => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        
        const optionSpan = document.createElement('span');
        optionSpan.textContent = optionText;

        optionDiv.appendChild(optionSpan);
        optionList.appendChild(optionDiv);
    });

    const option = document.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
    //option.forEach((opt, i) => {
      //  opt.addEventListener("click", () => optionSelected(opt));
    //});
}
function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;
    console.log(userAnswer)

    if (userAnswer == correctAnswer) {
        console.log("answer is correct");
        answer.classList.add("correct");
        userScore += 1;
        headerScore();
    } else {
        console.log("answer is wrong");
        answer.classList.add("incorrect");

        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute("class", "option correct")
            }
    }
    }
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
    }
    nextBtn.classList.add("active");
}
function updateQuestionCounter(index) {
    const questionTotal = document.querySelector(".question-total");
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector(".header-score");
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}
function showResultBox() {
    quizBox.classList.remove("active");
    resultBox.classList.add("active");

    const scoreText = document.querySelector(".score-text");
    scoreText.textContent = `Your score: ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector(".circular-progress");
    const progressValue = document.querySelector(".progress-value");
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 10;

    let progress = setInterval(() => {
        progressStartValue++;
        console.log(progressStartValue);
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(purple ${progressStartValue *3.6}deg, rgba(255, 255, 255, .1) 0deg`;


        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}