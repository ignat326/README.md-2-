const questions = [
    {
        question: "Какая смесь цветов дает Фиолетовый?",
        bg: "#8e44ad", // Цвет для фона страницы
        answers: [
            { text: "Красный + Синий", correct: true },
            { text: "Синий + Зеленый", correct: false },
            { text: "Желтый + Красный", correct: false },
            { text: "Белый + Черный", correct: false }
        ]
    },
    {
        question: "Как в HEX-коде пишется чистый Красный цвет?",
        bg: "#e74c3c",
        answers: [
            { text: "#00FF00", correct: false },
            { text: "#0000FF", correct: false },
            { text: "#FF0000", correct: true },
            { text: "#FFFFFF", correct: false }
        ]
    },
    {
        question: "Какой цвет получится, если смешать все цвета радуги (в свете)?",
        bg: "#ecf0f1",
        answers: [
            { text: "Черный", correct: false },
            { text: "Белый", correct: true },
            { text: "Серый", correct: false },
            { text: "Коричневый", correct: false }
        ]
    }
];

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('answer-options');
const nextButton = document.getElementById('next-button');
const progressText = document.getElementById('progress');
const bgOverlay = document.getElementById('bg-overlay');

let currentIndex = 0;
let score = 0;

function start() {
    currentIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    resetState();
    const current = questions[currentIndex];
    
    // Меняем текст и прогресс
    questionText.innerText = current.question;
    progressText.innerText = `Вопрос ${currentIndex + 1} из ${questions.length}`;
    
    // МАГИЯ: Меняем фон всей страницы
    bgOverlay.style.backgroundColor = current.bg;

    // Генерируем кнопки
    current.answers.forEach(ans => {
        const btn = document.createElement('button');
        btn.innerText = ans.text;
        btn.classList.add('btn');
        if (ans.correct) btn.dataset.correct = "true";
        btn.addEventListener('click', selectAnswer);
        optionsContainer.appendChild(btn);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectAnswer(e) {
    const selected = e.target;
    const isCorrect = selected.dataset.correct === "true";
    
    if (isCorrect) {
        selected.classList.add('correct');
        score++;
    } else {
        selected.classList.add('wrong');
    }

    // Показываем правильный ответ, если промахнулись
    Array.from(optionsContainer.children).forEach(btn => {
        if (btn.dataset.correct === "true") btn.classList.add('correct');
        btn.disabled = true; // Блокируем выбор
    });

    nextButton.classList.remove('hide');
}

nextButton.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    document.getElementById('quiz').classList.add('hide');
    const resBox = document.getElementById('result-box');
    resBox.classList.remove('hide');
    document.getElementById('final-score').innerText = `Ваш результат: ${score} из ${questions.length}`;
    bgOverlay.style.backgroundColor = "#333"; // Возвращаем нейтральный фон
}

start();