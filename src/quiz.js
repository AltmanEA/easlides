import { changeState, getSlideKey } from "./state";

export const initQuiz = (slide) => {
    let quizDiv = slide.getElementsByClassName("quiz")[0]
    if (quizDiv == undefined) return false

    let quiz = {};
    quiz.slide = slide
    quiz.data = JSON.parse(quizDiv.attributes['data-quiz'].value)
    quiz.size = quiz.data.answers.length
    quiz.order = new Array(quiz.size)
    quiz.questions = new Array(quiz.size)
    quiz.marked = new Array(quiz.size)
    for (let i = 0; i < quiz.size; i++)
        quiz.order[i] = i
    if (quiz.data.order != true)
        shuffle(quiz.order)
    for (let i = 0; i < quiz.size; i++) {
        quiz.questions[i] = quiz.data.answers[quiz.order[i]]
        quiz.marked[i] = false
    }

    quiz.class = (index) => {
        const quiz = window.EASlides.quiz
        if (quiz.isCommit) {
            return "quiz-" + quiz.answers[index]
        } else {
            if (quiz.marked[index])
                return "quiz-marked"
            else
                return "quiz-unmarked"
        }
    }    
    if (!window.EASlides.slideIsDone) {
        quiz.onAnswer = (index) => {
            const quiz = window.EASlides.quiz
            if (!quiz.isCommit)
                quiz.marked[index] = !quiz.marked[index]
            drawQuiz()
        }
        quiz.onCommit = () => {
            checkQuiz()
            const ans = answersInDataOrder(quiz)
            const code = arrayToCode(ans)
            if (quiz.isSuccess)
                changeState("pass", getSlideKey(), code)
            else
                changeState("fail", getSlideKey(), code)
            finishQuiz(quiz)
            drawQuiz()
        }
    } else {
        const resultCode = window.EASlides.slideIsDone.result
        quiz.marked = codeToArray(resultCode)
        checkQuiz(quiz)
        finishQuiz(quiz)
    }
    window.EASlides.quiz = quiz
    drawQuiz()
    return true
}

function finishQuiz(quiz) {
    quiz.isCommit = true
    quiz.onCommit = () => { }
    quiz.onAnswer = () => { }
}

function drawQuiz() {
    var el = document.getElementById('quizView')
    if (el != null) el.remove()

    const quiz = window.EASlides.quiz
    let html = "<div id='quizView'>"
    html += "<h4>" + quiz.data.question + "</h4>"
    html += "<ul>";
    for (let i = 0; i < quiz.questions.length; i++) {
        const clas = window.EASlides.quiz.class(i)
        html += "<li class='" + clas
        html += "' onClick=window.EASlides.quiz.onAnswer(" + i + ")>"
        html += quiz.questions[i].text + "</li>"
    }
    html += "</ul>"
    html += "<p><button onClick=window.EASlides.quiz.onCommit() "
    html += quiz.isCommit ? "disabled" : ""
    html += "class='quiz-button'>Ответить</button></p>"
    html += "</div>"

    quiz.slide.insertAdjacentHTML("afterbegin", html);
}

function checkQuiz(quiz = window.EASlides.quiz) {
    quiz.answers = Array(quiz.size)
    quiz.isSuccess = true
    for (let i = 0; i < quiz.size; i++) {
        const rightAns = quiz.data.answers[quiz.order[i]].isRight
        if (quiz.marked[i])
            if (rightAns)
                quiz.answers[i] = "right"
            else {
                quiz.answers[i] = "wrong"
                quiz.isSuccess = false
            }
        else
            if (rightAns) {
                quiz.answers[i] = "must"
                quiz.isSuccess = false
            }
            else
                quiz.answers[i] = "none"
    }
}

function answersInDataOrder(quiz) {
    const size = quiz.marked.length
    const result = Array(size)
    for (let i = 0; i < size; i++)
        result[quiz.order[i]] = quiz.marked[i]
    return result
}

function arrayToCode(arr) {
    var pow = 1
    var result = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i])
            result += pow
        pow *= 2
    }
    return result
}

function codeToArray(code) {
    const result = []
    while (code > 0) {
        const rem = code % 2
        result.push(rem)
        code = (code - rem) / 2
    }
    return result
}

// https://habr.com/ru/post/358094/
function shuffle(arr) {
    var j, temp;
    for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}
