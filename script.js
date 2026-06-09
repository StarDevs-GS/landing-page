const slideImage = document.getElementById("slide-image");
const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");
const blueButton = document.getElementById('blue-theme');
const darkButton = document.getElementById('dark-theme');
const purpleButton = document.getElementById('purple-theme');
const quizContent = document.getElementById("quiz-content");
const quizResult = document.getElementById("quiz-result");
const quizTitle = document.getElementById("quiz-title");
const quizOptions = document.getElementById("quiz-options");
const quizForm = document.getElementById("quiz-form");
const quizPage = document.getElementById("quiz-page");
const quizMessage = document.getElementById("quiz-message");
const quitQuizButton = document.getElementById("quit-quiz");
const scoreText = document.getElementById("score-text");

const images = [
    "./assets/slide1.png",
    "./assets/slide2.png",
    "./assets/slide3.png"
];


let currentSlide = 0;
let currentQuestion = 0;
let selectedOption = -1;
let score = 0;

const questions = [
    {
        title: "Qual é o principal problema da agricultura no espaço?",
        answers: [
            "a) Falta de sementes disponíveis",
            "b) Ausência de atmosfera, temperaturas extremas e radiação",
            "c) Solo muito pesado para transportar",
            "d) Excesso de água nos planetas",
        ],
        correct: 1
    },
    {
        title: "Qual sensor o projeto utiliza para monitorar a estufa?",
        answers: [
            "a) Sensor de pressão BMP280",
            "b) Sensor ultrassônico HC-SR04",
            "c) Sensor DHT22 de temperatura e umidade",
            "d) Sensor de luminosidade LDR"
        ],
        correct: 2
    },
    {
        title: "Com que frequência o DHT22 realiza leituras?",
        answers: [
            "a) A cada 5 minutos",
            "b) A cada 1 minuto",
            "c) A cada 10 segundos",
            "d) A cada 30 segundos"
        ],
        correct: 3
    },
    {
        title: "O que acontece quando o ambiente sai da faixa ideal?",
        answers: [
            "a) O sistema desliga automaticamente",
            "b) Aciona LED vermelho e emite sons no Buzzer",
            "c) Envia um e-mail para a NASA",
            "d) A estufa se fecha completamente"
        ],
        correct: 1
    },
    {
        title: "Qual é a função do Relé no projeto?",
        answers: [
            "a) Medir a temperatura do solo",
            "b) Liberar energia externa e ativar o ventilador",
            "c) Armazenar dados na nuvem",
            "d) Controlar a iluminação da estufa"
        ],
        correct: 1
    },
    {
        title: "Quem é o público-alvo principal do produto?",
        answers: [
            "a) Agricultores terrestres convencionais",
            "b) Restaurantes e redes de fast food",
            "c) Agências espaciais, colônias e estações orbitais",
            "d) Universidades de gastronomia"
        ],
        correct: 2
    },
    {
        title: "Qual benefício NÃO é oferecido pelo produto?",
        answers: [
            "a) Autonomia alimentar",
            "b) Redução de desperdício hídrico",
            "c) Substituição completa dos astronautas por robôs",
            "d) Monitoramento remoto por especialistas"
        ],
        correct: 2
    },
    {
        title: "Quantas etapas compõem o fluxo de aplicação?",
        answers: [
            "a) 2 etapas",
            "b) 3 etapas",
            "c) 4 etapas",
            "d) 6 etapas"
        ],

        correct: 2
    },
    {
        title: "O que o Arduino faz no sistema?",
        answers: [
            "a) Apenas exibe dados no display",
            "b) Recebe e processa os dados dos sensores",
            "c) Conecta a estufa à internet 5G",
            "d) Gera energia solar para a estufa"
        ],
        correct: 1
    },
     {
        title: "Por que o monitoramento manual é um problema?",
        answers: [
            "a) É muito barato e simples",
            "b) Os astronautas precisam focar na missão, não no alimento",
            "c) Não existe tecnologia para automatizar",
            "d) As plantas preferem cuidado humano"
        ],
        correct: 1
    }
];

function showSlide() {
    slideImage.src = images[currentSlide];
}

function previousSlide() {
    currentSlide--;


    if (currentSlide < 0) {
        currentSlide = images.length - 1;
    }

    showSlide();
}

function nextSlide() {
    currentSlide++;

    if (currentSlide >= images.length) {
        currentSlide = 0;
    }
    showSlide();
}

function selectOption(index) {
    selectedOption = index;
    quizMessage.innerText = "";

    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];

    quizTitle.innerText = (currentQuestion + 1) + ". " + question.title;

    quizPage.innerText = "Página " + (currentQuestion + 1) + "/" + questions.length;
    quizOptions.innerHTML = "";

    for (let i = 0; i < question.answers.length; i++) {
        let checkedAnswer = "";

        if (i === selectedOption) {
            checkedAnswer = " checked";
        }


        quizOptions.innerHTML +=
            "<label class='quiz-option' for='answer-" + i + "'>" +
                "<input id='answer-" + i + "' type='radio' name='quiz-answer' required onclick='selectOption(" + i + ")'" + checkedAnswer + ">" +
                "<span class='option-circle'></span>" +
                "<span>" + question.answers[i] + "</span>" +
            "</label>";
    }
}

function nextQuestion(event) {
    event.preventDefault();

    if (selectedOption === -1) {
        quizMessage.innerText = "Escolha uma alternativa.";
        return;
    }

    if (selectedOption === questions[currentQuestion].correct) {
        score++;
    }


    currentQuestion++;
    selectedOption = -1;

    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }

    showQuestion();
}

function showResult() {
    quizContent.classList.add("hidden");
    quizResult.classList.remove("hidden");
    scoreText.innerText = score + "/" + questions.length;
}

function quitQuiz() {
    currentQuestion = questions.length;
    selectedOption = -1;
    showResult();
}

function start() {
    leftArrow.addEventListener("click", previousSlide);
    rightArrow.addEventListener("click", nextSlide);
    quizForm.addEventListener("submit", nextQuestion);
    quitQuizButton.addEventListener("click", quitQuiz);
    
    showSlide();
    showQuestion();
}

blueButton.addEventListener('click', function() {
    document.body.className = 'blue-theme';
});

darkButton.addEventListener('click', function() {
    document.body.className = ''; 
});

purpleButton.addEventListener('click', function() {
    document.body.className = 'purple-theme';
});

start();
