import { initQuiz } from "./quiz";


export const setState = (state = "{}") => {
    window.EASlides.state = state
}

const saveState = () => {
    var saveEvent = new CustomEvent("saveState")
    saveEvent.state = window.EASlides.state
    document.dispatchEvent(saveEvent)
}

const getSlideKeyBy = (indexh, indexv) => indexh * 100 + indexv
const getSlideKey = () =>
    getSlideKeyBy(window.EASlides.indexh, window.EASlides.indexv)

const setSlideState = (state) => {
    window.EASlides.state[getSlideKey()] = state
    console.log(window.EASlides)
}

const getSlideState = () =>
    window.EASlides.state[getSlideKey()]

export const setListeners = () => {
    setRevealListeners()
    setAudioListeners()
    document.addEventListener("quizDone", (e) => {
        setSlideState(e.state)
        saveState()
    });
    document.addEventListener("resetSlide", (e) => {
        setState()
        saveState()
    });
};

// reveal event
const onSlide = (event) => {
    window.EASlides.indexh = event.indexh
    window.EASlides.indexv = event.indexv
    if (initQuiz(event.currentSlide))
        window.EASlides.type = "quiz"
    else
        window.EASlides.type = "audio"
    window.Reveal.layout()
}
const setRevealListeners = () => {
    window.Reveal.on('ready', onSlide)
    window.Reveal.on('slidechanged', onSlide)
}

// audio event
const setAudioListeners = () => {
    document.addEventListener("startplayback", (e) => {
        if (window.EASlides.type == "audio")
            setSlideState("start");
    });
    document.addEventListener("stopplayback", (e) => {
        if (e.ended) {
            if (getSlideState() == "start") {
                setSlideState("done");
                saveState();
            }
        }
    });
    document.addEventListener("seekplayback", (e) => {
        if (getSlideState() == "start")
            setSlideState("");
    });
}


